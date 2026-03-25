const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const FIREBERRY_TOKEN = process.env.FIREBERRY_TOKEN;
const FIREBERRY_BASE_URL = 'https://api.fireberry.com/api';

app.get('/status', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/tools/getOpportunity', async (req, res) => {
  try {
    const { id } = req.body?.arguments || {};
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const response = await axios.get(`${FIREBERRY_BASE_URL}/record/Opportunity/${id}`, {
      headers: { Token: FIREBERRY_TOKEN }
    });
    res.json({ content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] });
  } catch (err) {
    res.status(500).json({ error: 'Fireberry request failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Fireberry MCP running on port ${PORT}`));