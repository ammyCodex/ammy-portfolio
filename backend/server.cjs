require('dotenv').config();
const express = require('express');
// Fix for fetch in CommonJS:
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(express.json());

app.post('/api/ai', async (req, res) => {
  console.log('Received POST /api/ai', req.body); // Log incoming requests
  const { prompt } = req.body;
  try {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'command',
        prompt,
        max_tokens: 80,
        temperature: 0.8,
      }),
    });
    const data = await response.json();
    console.log('Cohere API raw response:', data); // Log Cohere response
    if (!response.ok) {
      return res.status(500).json({ error: data.message || 'Failed to fetch from Cohere API.' });
    }
    if (data.generations && data.generations.length > 0) {
      res.json({ generated_text: data.generations[0].text.trim() });
    } else {
      res.status(500).json({ error: 'No response from Cohere API.' });
    }
  } catch (error) {
    console.error('Backend error:', error);
    res.status(500).json({ error: 'Failed to fetch from Cohere API.' });
  }
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`)); 