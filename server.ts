import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client lazily to handle missing API keys gracefully
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // --- API ROUTES ---

  // Max Chat bot assistant
  app.post("/api/chat-max", async (req, res) => {
    try {
      const { message, history } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          text: `[Modo Offline/Sem Chave de API] E aí campeão! Sou o Max, seu treinador. Atualmente estou rodando sem chave de API ativa nos Segredos, mas posso responder suas dúvidas básicas sobre treino! Lembre-se: o foco é manter a constância e a execução perfeita! Diga, qual sua dúvida principal hoje?`
        });
      }

      const contents = [];
      if (history && Array.isArray(history)) {
        for (const h of history) {
          contents.push({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          });
        }
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: "Você é o Max, um personal trainer virtual masculino experiente, muito direto, técnico e altamente motivador. Você fala português do Brasil. Use termos e gírias de academia adequados ('foco!', 'disciplina!', 'vamos nessa campeão!', 'bater meta!'). Explique os conceitos com embasamento anatômico e fisiológico, de forma prática e motivadora. Evite respostas prolixas. Seja direto ao ponto, mas sempre muito motivador."
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Erro no chat com Max:", error);
      res.status(500).json({ error: error.message || "Erro no servidor." });
    }
  });

  // Dynamic exercise explanations by Coach Max
  app.post("/api/explain-exercise", async (req, res) => {
    try {
      const { exerciseName, category, description, tips } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({ explanation: "" });
      }

      const prompt = `Explique detalhadamente o exercício "${exerciseName}" (Foco: ${category}).
Descrição atual: ${description}.
Dicas padrão: ${tips ? tips.join(", ") : ""}.

Sua resposta como Max (treinador virtual direto, motivador, com linguagem técnica e direta) DEVE conter:
- **Execução Passo a Passo**: Um passo a passo mecânico perfeito.
- **Músculos Ativados**: Divisão exata entre os principais e secundários.
- **Erros Mais Comuns**: E as orientações diretas de como corrigi-los para evitar lesões.
- **Progressão Segura de Carga**: Como o usuário pode subir os pesos com segurança física.
- **Variações de Exercício**: Uma variação recomendada para Iniciantes e uma variação para Avançados.

Fale diretamente em português do Brasil como o treinador Max.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "Você é o Max, um personal trainer experiente, direto, técnico e motivador. Use subtópicos marcantes em negrito e tom enérgico de voz."
        }
      });

      res.json({ explanation: response.text });
    } catch (error: any) {
      console.error("Erro ao explicar exercício:", error);
      res.status(500).json({ error: error.message || "Erro no servidor." });
    }
  });

  // Automated custom diet generator based on user specs
  app.post("/api/generate-diet", async (req, res) => {
    try {
      const { weight, height, objective, mealsPerDay, restrictions } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(400).json({ error: "Gemini API key is required." });
      }

      const prompt = `Gere uma dieta personalizada completa para um indivíduo com as especificações:
- Peso: ${weight} kg
- Altura: ${height} cm
- Objetivo principal: ${objective}
- Quantidade de refeições por dia: ${mealsPerDay}
- Restrições/Preferências alimentares: ${restrictions || "Nenhuma"}

Retorne a resposta rigorosamente em formato JSON seguindo o esquema abaixo. Não envie blocos de código markdown ou texto explicativo extra, apenas o JSON puro contendo a quantidade correta de refeições (${mealsPerDay} refeições):
{
  "totalKcal": 2400,
  "totalProtein": 160,
  "totalCarb": 280,
  "totalFat": 70,
  "meals": [
    {
      "name": "Nome da Refeição (ex: Café da Manhã)",
      "time": "Horário sugerido (ex: 07:30)",
      "foods": [
        { "name": "Alimento (ex: Aveia em Flocos)", "quantity": "Ex: 50g", "protein": 7, "carb": 33, "fat": 4 }
      ],
      "protein": 7,
      "carb": 33,
      "fat": 4
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              totalKcal: { type: Type.INTEGER },
              totalProtein: { type: Type.INTEGER },
              totalCarb: { type: Type.INTEGER },
              totalFat: { type: Type.INTEGER },
              meals: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    time: { type: Type.STRING },
                    foods: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING },
                          quantity: { type: Type.STRING },
                          protein: { type: Type.INTEGER },
                          carb: { type: Type.INTEGER },
                          fat: { type: Type.INTEGER }
                        },
                        required: ["name", "quantity", "protein", "carb", "fat"]
                      }
                    },
                    protein: { type: Type.INTEGER },
                    carb: { type: Type.INTEGER },
                    fat: { type: Type.INTEGER }
                  },
                  required: ["name", "time", "foods", "protein", "carb", "fat"]
                }
              }
            },
            required: ["totalKcal", "totalProtein", "totalCarb", "totalFat", "meals"]
          }
        }
      });

      const text = response.text;
      const cleanText = text.replace(/```json\n?|```/g, "").trim();
      const parsedDiet = JSON.parse(cleanText);
      res.json(parsedDiet);
    } catch (error: any) {
      console.error("Erro na geração de dieta:", error);
      res.status(500).json({ error: error.message || "Erro interno do servidor." });
    }
  });

  // --- VITE MIDDLEWARE INTERACTION & PRODUCTION STATIC SERVING ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FitPlan Pro Server running on http://localhost:${PORT}`);
  });
}

startServer();
