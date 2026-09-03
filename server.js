const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
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
