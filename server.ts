import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required for AI Beauty Assistant');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Lamsat Sabah | لمسات صباح', timestamp: new Date().toISOString() });
});

// AI Beauty Assistant Endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { prompt, language = 'ar', conversationHistory = [] } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const systemInstruction = `You are the official AI Beauty Assistant for Lamsat Sabah (لمسات صباح), an elite luxury beauty editorial platform (@thesabahedit).
You specialize STRICTLY and ONLY in: beauty, skincare, haircare, body care, hand care, foot care, cosmetic ingredients, serums, natural masks, beauty routines, and self-care.

REJECTION RULE: If the user asks about non-beauty topics (e.g. politics, religion, sports, programming, finance, medicine outside dermatological skin care), politely refuse in the user's language:
"I specialize in beauty and self-care topics including skincare, haircare, body care, ingredients, masks, and serums."

GUIDELINES:
- Respond in the requested language: ${language} (AR, EN, FR, TR, KO).
- Use an elegant, warm, respectful, luxury editorial tone.
- Recommend patch testing for all natural remedies and recipes.
- Advise consulting a certified dermatologist for persistent or severe skin/hair conditions.
- Keep answers practical, clear, structured, and easy to read.`;

    const ai = getGeminiClient();

    // Prepare contents array with conversation history
    const contents: any[] = [];
    if (Array.isArray(conversationHistory)) {
      for (const item of conversationHistory) {
        if (item.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'ai') {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'أعتذر، حدث خلل بسيط في معالجة طلبكِ. يرجى المحاولة مرة أخرى ✨';

    return res.json({ text: replyText });
  } catch (error: any) {
    console.error('Error in AI Chat route:', error);
    return res.status(500).json({ 
      error: 'Failed to process AI beauty consultation',
      details: error?.message || String(error)
    });
  }
});

// Setup Vite Development Middleware or Static Production Serve
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lamsat Sabah Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
