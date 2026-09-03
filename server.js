const express = require('express');
const path = require('path');
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');
const app = express();

const newsCache = {
  expiresAt: 0,
  items: []
};
const newsParser = new XMLParser({ ignoreAttributes: false, trimValues: true });
const defaultNewsFeed = 'https://www.bing.com/news/search?q=Malaysia&format=rss';

function asArray(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function cleanExcerpt(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

async function getNews() {
  if (newsCache.expiresAt > Date.now()) return newsCache.items;

  const feedUrl = process.env.NEWS_FEED_URL || defaultNewsFeed;
  const response = await axios.get(feedUrl, { timeout: 8000, responseType: 'text' });
  const parsed = newsParser.parse(response.data);
  const channel = parsed?.rss?.channel || parsed?.feed;
  const entries = asArray(channel?.item || channel?.entry).slice(0, 6);

  newsCache.items = entries.map((item) => ({
    title: String(item.title || 'Market news'),
    url: String(item.link?.['#text'] || item.link || '#'),
    excerpt: cleanExcerpt(item.description || item.summary || item['content:encoded']),
    publishedAt: String(item.pubDate || item.published || item.updated || '')
  })).filter((item) => item.url.startsWith('http'));
  newsCache.expiresAt = Date.now() + 60 * 60 * 1000;
  return newsCache.items;
}

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const pageRoutes = {
  '/profile': 'profile.html',
  '/messages': 'messages.html',
  '/favourites': 'favourites.html',
  '/alerts': 'alerts.html',
  '/sell': 'sell.html',
  '/get-app': 'get-app.html'
};

Object.entries(pageRoutes).forEach(([route, file]) => {
  app.get(route, (req, res) => res.sendFile(path.join(__dirname, 'pages', file)));
});

app.get('/news', async (req, res) => {
  try {
    return res.json({ items: await getNews(), cachedFor: '1 hour' });
  } catch (error) {
    console.error('News feed error:', error.message);
    return res.json({ error: 'News is temporarily unavailable.', items: [] });
  }
});

app.post('/chat', async (req, res) => {
  try {
    const message = req.body?.message || '';

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return res.json({
        reply: 'Chatbot is ready, but the DeepSeek API key is not configured yet. Add your key to enable live AI replies.'
      });
    }

    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful ecommerce assistant for a marketplace website. Help users find products, answer common questions, suggest alternatives, and give friendly support responses.'
          },
          { role: 'user', content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    return res.json({ reply: reply.trim() });
  } catch (error) {
    console.error('DeepSeek API error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Failed to get a response from DeepSeek.',
      reply: 'The chatbot is temporarily unavailable. Please try again later.'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
