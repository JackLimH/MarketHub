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
  '/cars': 'cars.html',
  '/profile': 'profile.html',
  '/login': 'login.html',
  '/register': 'register.html',
  '/dashboard': 'dashboard.html',
  '/create-listing': 'create-listing.html',
  '/premium': 'premium.html',
  '/messages': 'messages.html',
  '/favourites': 'favourites.html',
  '/alerts': 'alerts.html',
  '/sell': 'sell.html',
  '/get-app': 'get-app.html'
};

const categoryData = {
  'houses-for-sale': { title: 'Houses for Sale', eyebrow: 'Property marketplace', heading: 'Find a house that feels like home.', description: 'Compare landed homes, neighbourhoods, and seller listings across Malaysia.', search: 'terrace house, Shah Alam', type: 'Property Types', listing: 'Houses for Sale', popular: ['Terrace House', 'Semi-D', 'Bungalow', 'Townhouse', 'New Development', 'Gated Community'], types: ['Terrace', 'Semi-D', 'Bungalow', 'Townhouse', 'Cluster Home', 'Land'], more: ['New Projects', 'Subsale Homes', 'Auction Property', 'Investment Homes', 'Rooms for Sale', 'Commercial Lots'], icon: 'fa-house', items: [['Modern Terrace House', 'RM 680,000', 'Shah Alam', '4 beds'], ['Garden Semi-D', 'RM 1,280,000', 'Johor Bahru', '5 beds'], ['KL Family Bungalow', 'RM 2,400,000', 'Kuala Lumpur', '6 beds'], ['Corner Townhouse', 'RM 540,000', 'Penang', '3 beds']] },
  'apt-for-rent': { title: 'Apartments for Rent', eyebrow: 'Rental marketplace', heading: 'A better place to rent starts here.', description: 'Discover apartments with practical details, locations, and rental-ready listings.', search: 'condominium, KLCC', type: 'Rental Types', listing: 'Apartments for Rent', popular: ['KLCC Condo', 'Pet-Friendly', 'Studio Apartment', 'Fully Furnished', 'Near MRT', 'Short Term'], types: ['Condominium', 'Apartment', 'Studio', 'Serviced Residence', 'Room Rental', 'Penthouse'], more: ['Near Transit', 'Pet Friendly', 'Fully Furnished', 'Unfurnished', 'Student Housing', 'Short Stay'], icon: 'fa-building', items: [['KLCC City Residence', 'RM 3,800 / month', 'Kuala Lumpur', '2 beds'], ['MRT-Connected Studio', 'RM 1,700 / month', 'Petaling Jaya', '1 bed'], ['Family Condo Suite', 'RM 2,600 / month', 'Johor Bahru', '3 beds'], ['Penang Seaview Apartment', 'RM 2,100 / month', 'Bayan Lepas', '2 beds']] },
  motorcycles: { title: 'Motorcycles', eyebrow: 'Motorcycle marketplace', heading: 'Your next ride is waiting.', description: 'Browse scooters, superbikes, touring motorcycles, and everyday commuter rides.', search: 'Yamaha, scooter, Selangor', type: 'Motorcycle Types', listing: 'Motorcycles for Sale', popular: ['Yamaha', 'Honda', 'Kawasaki', 'Harley-Davidson', 'Vespa', 'Modenas'], types: ['Scooter', 'Underbone', 'Naked Bike', 'Superbike', 'Cruiser', 'Touring'], more: ['Motorcycle Parts', 'Helmets', 'Riding Gear', 'Workshop Services', 'Tyres', 'Insurance'], icon: 'fa-motorcycle', items: [['Yamaha NVX 155', 'RM 9,800', 'Kuala Lumpur', '2023 · 8,000 km'], ['Honda CB650R', 'RM 32,800', 'Selangor', '2022 · 12,000 km'], ['Kawasaki Ninja 400', 'RM 23,500', 'Penang', '2021 · 15,000 km'], ['Vespa Primavera', 'RM 17,900', 'Johor Bahru', '2023 · 4,000 km']] },
  'mobile-phones': { title: 'Mobile Phones', eyebrow: 'Mobile marketplace', heading: 'Find the phone that fits your life.', description: 'Compare new and pre-owned phones from trusted-style marketplace listings.', search: 'iPhone 15, Samsung, used phone', type: 'Phone Types', listing: 'Mobile Phones for Sale', popular: ['iPhone', 'Samsung Galaxy', 'Google Pixel', 'Xiaomi', 'OnePlus', 'Huawei'], types: ['iPhone', 'Android', 'Refurbished', 'Gaming Phone', 'Foldable', 'Budget Phone'], more: ['Phone Cases', 'Chargers', 'Smartwatches', 'Tablets', 'Screen Repair', 'Trade-In'], icon: 'fa-mobile-screen-button', items: [['iPhone 15 Pro Max', 'RM 4,299', 'Kuala Lumpur', '256GB · Like New'], ['Samsung Galaxy S24 Ultra', 'RM 3,499', 'Petaling Jaya', '512GB · New'], ['Google Pixel 9', 'RM 2,699', 'Penang', '256GB · New'], ['Xiaomi 14T Pro', 'RM 1,899', 'Johor Bahru', '512GB · Good']] },
  pets: { title: 'Pets', eyebrow: 'Pet marketplace', heading: 'Find a companion, responsibly.', description: 'Explore pets, supplies, and services with a marketplace experience built around care.', search: 'cat, dog, pet supplies', type: 'Pet Types', listing: 'Pets and Supplies', popular: ['Cats', 'Dogs', 'Birds', 'Fish', 'Rabbits', 'Pet Adoption'], types: ['Cats', 'Dogs', 'Birds', 'Fish', 'Small Pets', 'Reptiles'], more: ['Pet Food', 'Accessories', 'Grooming', 'Veterinary', 'Pet Boarding', 'Adoption Services'], icon: 'fa-paw', items: [['British Shorthair Kitten', 'RM 2,800', 'Kuala Lumpur', 'Ready for home'], ['Golden Retriever', 'RM 3,500', 'Selangor', 'Vaccinated'], ['Aquarium Starter Set', 'RM 380', 'Penang', 'Complete set'], ['Rabbit Habitat Kit', 'RM 240', 'Johor Bahru', 'New']] },
  jobs: { title: 'Jobs', eyebrow: 'Jobs marketplace', heading: 'Find your next opportunity.', description: 'Search practical job listings by role, location, and working arrangement.', search: 'software engineer, Kuala Lumpur', type: 'Job Types', listing: 'Latest Job Opportunities', popular: ['Part Time', 'Remote Jobs', 'Admin', 'Sales', 'Internships', 'Work from Home'], types: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship', 'Remote'], more: ['Technology', 'Healthcare', 'Education', 'Retail', 'Hospitality', 'Logistics'], icon: 'fa-briefcase', items: [['Frontend Developer', 'RM 7,000 / month', 'Kuala Lumpur', 'Full time'], ['Retail Supervisor', 'RM 3,200 / month', 'Selangor', 'Full time'], ['Content Writer', 'RM 2,800 / month', 'Remote', 'Contract'], ['Weekend Barista', 'RM 1,500 / month', 'Penang', 'Part time']] },
  fashion: { title: 'Fashion', eyebrow: 'Fashion marketplace', heading: 'Refresh your everyday style.', description: 'Discover clothing, footwear, accessories, and pre-loved fashion from local sellers.', search: 'sneakers, dress, vintage', type: 'Fashion Types', listing: 'Fashion for Sale', popular: ['Sneakers', 'Dresses', 'Streetwear', 'Luxury Bags', 'Modest Wear', 'Vintage'], types: ['Women', 'Men', 'Kids', 'Shoes', 'Bags', 'Accessories'], more: ['Jewellery', 'Watches', 'Sportswear', 'Traditional Wear', 'Wedding Wear', 'Fashion Services'], icon: 'fa-shirt', items: [['Classic Leather Tote', 'RM 480', 'Kuala Lumpur', 'Like New'], ['Limited Edition Sneakers', 'RM 720', 'Petaling Jaya', 'US 9 · New'], ['Linen Summer Dress', 'RM 120', 'Johor Bahru', 'Size M'], ['Vintage Denim Jacket', 'RM 180', 'Penang', 'Size L']] },
  electronics: { title: 'Electronics', eyebrow: 'Electronics marketplace', heading: 'Power your next idea.', description: 'Shop computers, cameras, audio gear, and smart devices from marketplace sellers.', search: 'laptop, camera, gaming', type: 'Electronics Types', listing: 'Electronics for Sale', popular: ['Laptops', 'Gaming PC', 'Cameras', 'Headphones', 'TV', 'Smart Home'], types: ['Computers', 'Cameras', 'Audio', 'Gaming', 'TV & Video', 'Smart Home'], more: ['Computer Parts', 'Printers', 'Drones', 'Networking', 'Wearables', 'Repairs'], icon: 'fa-laptop', items: [['MacBook Pro M3', 'RM 6,999', 'Kuala Lumpur', '16GB · Like New'], ['Sony Mirrorless Camera', 'RM 3,200', 'Selangor', '24MP · New'], ['Gaming PC RTX 4070', 'RM 5,800', 'Penang', 'Ready to play'], ['Noise Cancelling Headphones', 'RM 899', 'Johor Bahru', 'New']] },
  furniture: { title: 'Furniture', eyebrow: 'Home marketplace', heading: 'Make your space feel yours.', description: 'Find practical furniture for living rooms, bedrooms, offices, and every room in between.', search: 'sofa, dining table, office chair', type: 'Furniture Types', listing: 'Furniture for Sale', popular: ['Sofa', 'Dining Table', 'Bed Frame', 'Office Chair', 'Wardrobe', 'Home Decor'], types: ['Living Room', 'Bedroom', 'Dining', 'Office', 'Outdoor', 'Decor'], more: ['Lighting', 'Mattresses', 'Storage', 'Kitchen', 'Renovation', 'Moving Services'], icon: 'fa-couch', items: [['Three-Seater Sofa', 'RM 1,280', 'Kuala Lumpur', 'Like New'], ['Solid Wood Dining Set', 'RM 1,950', 'Selangor', 'Seats 6'], ['Ergonomic Office Chair', 'RM 680', 'Petaling Jaya', 'New'], ['Minimalist Wardrobe', 'RM 890', 'Johor Bahru', 'Delivery available']] }
};

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function renderCategoryCards(items, icon, premium = false) {
  return items.map(([title, price, location, meta], index) => `<a class="listing-card" href="/listing/${encodeURIComponent(title)}"><div class="listing-image"><i class="fas ${icon}"></i></div><div class="listing-info">${premium || index === 0 ? '<span class="premium-label">Premium ad</span>' : ''}<h3>${escapeHtml(title)}</h3><div class="listing-price">${escapeHtml(price)}</div><div class="listing-meta"><span>${escapeHtml(meta)}</span><span>${escapeHtml(location)}</span></div></div></a>`).join('');
}

function renderCategoryLinks(items) {
  return items.map((item) => `<a href="#category-listings">${escapeHtml(item)}</a>`).join('');
}

function renderCategoryPage(category) {
  const template = require('fs').readFileSync(path.join(__dirname, 'pages', 'category.html'), 'utf8');
  return template.replaceAll('{{TITLE}}', escapeHtml(category.title))
    .replaceAll('{{EYEBROW}}', escapeHtml(category.eyebrow))
    .replaceAll('{{HEADING}}', escapeHtml(category.heading))
    .replaceAll('{{DESCRIPTION}}', escapeHtml(category.description))
    .replaceAll('{{SEARCH_PLACEHOLDER}}', escapeHtml(category.search))
    .replace('{{TYPE_LABEL}}', escapeHtml(category.type))
    .replace('{{LISTING_TITLE}}', escapeHtml(category.listing))
    .replace('{{TRENDING}}', renderCategoryCards(category.items, category.icon, true))
    .replace('{{POPULAR}}', renderCategoryLinks(category.popular))
    .replace('{{TYPES}}', renderCategoryLinks(category.types))
    .replace('{{LISTINGS}}', renderCategoryCards(category.items, category.icon))
    .replace('{{MORE}}', renderCategoryLinks(category.more));
}

Object.entries(categoryData).forEach(([slug, category]) => {
  app.get(`/category/${slug}`, (req, res) => res.send(renderCategoryPage(category)));
});

Object.entries(pageRoutes).forEach(([route, file]) => {
  app.get(route, (req, res) => res.sendFile(path.join(__dirname, 'pages', file)));
});

app.get('/listing/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'listing.html'));
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
