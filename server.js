const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // ou coloque sua chave diretamente aqui
});

const openai = new OpenAIApi(configuration);

app.post("/api/script", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt não fornecido." });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Você é um gerador de scripts para Roblox em Lua.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const script = completion.data.choices[0].message.content;
    res.json({ script });
  } catch (error) {
    console.error("Erro ao chamar OpenAI:", error.message);
    res.status(500).json({ error: "Erro ao gerar script." });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
