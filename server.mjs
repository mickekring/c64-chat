process.on('uncaughtException',  err => {
  console.error('UNCAUGHT  ➜', err);
});
process.on('unhandledRejection', err => {
  console.error('UNHANDLED ➜', err);
});

import 'dotenv/config';             // <─ loads .env automatically
import express from 'express';
import cors    from 'cors';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();

app.use(cors());            // allow localhost:3000 during dev
app.use(express.json());    // parse JSON bodies

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;               // [{role,content}, …]
    const completion   = await openai.chat.completions.create({
      model: 'gpt-4.1',
      temperature: 1,
      messages
    });
    res.json(completion.choices[0].message);     // {role,content}
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

const PORT   = process.env.PORT || 5555;
const server = app.listen(PORT, () =>
  console.log(`API ready on http://localhost:${PORT}`)
);

// <---- NEW: catch binding errors (EADDRINUSE, EACCES, etc.)
server.on('error', err => {
  console.error('LISTEN ERROR ➜', err);
  process.exit(1);
});


