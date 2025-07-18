const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ API Roblox Script IA rodando!");
});

app.post("/api/script", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt não fornecido." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é um gerador de scripts para Roblox em Lua. Sempre responda apenas com o código do script.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const resposta = completion.choices[0]?.message?.content;
    res.json({ script: resposta });
  } catch (err) {
    console.error("Erro na API OpenAI:", err);
    res.status(500).json({ error: "Erro ao gerar script." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
