const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Permite todas as origens
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Servidor da IA do Roblox rodando com CORS!');
});

app.post('/api/script', async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: 'Prompt ausente.' });

  const scriptExemplo = `-- Script gerado para: ${prompt}\nprint("Olá do Roblox AI!")`;
  res.json({ script: scriptExemplo });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});