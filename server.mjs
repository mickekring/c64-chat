/* ---------- fel-loggning ----------------------------------------- */
process.on('uncaughtException',  err => console.error('UNCAUGHT  ➜', err));
process.on('unhandledRejection', err => console.error('UNHANDLED ➜', err));

/* ---------- dependencies ----------------------------------------- */
import 'dotenv/config';
import express  from 'express';
import cors     from 'cors';
import { OpenAI } from 'openai';

/* ---------- init ------------------------------------------------- */
const app    = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' })); // Sätt en limit för säkerhet

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/* ---------- API -------------------------------------------------- */

// Password verification endpoint
app.post('/api/verify-password', async (req, res) => {
  try {
    const { password } = req.body;
    
    // Validera input
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid password format' });
    }
    
    // Hämta lösenord från miljövariabel (default: pass123)
    const correctPassword = process.env.C64_PASSWORD || 'pass123';
    
    // Jämför lösenord (case-insensitive för C64-känsla)
    const isValid = password.toUpperCase() === correctPassword.toUpperCase();
    
    // Logga försök (utan att visa lösenordet)
    console.log(`Password attempt: ${isValid ? 'SUCCESS' : 'FAILED'}`);
    
    res.json({ valid: isValid });
  } catch (err) {
    console.error('Password verification error:', err);
    res.status(500).json({ error: 'Password verification failed' });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    // Validera input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }
    
    // Begränsa antal meddelanden för att undvika för stora requests
    const limitedMessages = messages.slice(-20);
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',  // Updated to a valid model name
      temperature: 0.8,  // Lite lägre för mer konsistenta svar
      max_tokens: 150,   // Begränsa för C64-stil korta svar
      messages: limitedMessages
    });
    
    res.json(completion.choices[0].message);
  } catch (err) {
    console.error('OpenAI Error:', err);
    
    // Mer detaljerad felhantering
    if (err.response?.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    } else if (err.response?.status === 401) {
      res.status(500).json({ error: 'API key configuration error' });
    } else {
      res.status(500).json({ error: 'OpenAI request failed' });
    }
  }
});

/* ---------- Health check endpoint -------------------------------- */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    hasApiKey: !!process.env.OPENAI_API_KEY,
    hasPassword: !!process.env.C64_PASSWORD
  });
});

/* ---------- Statiska React-filer --------------------------------- */
// Servera React-appen i produktion
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'build' });
  });
}

/* ---------- Start server ----------------------------------------- */
const PORT = process.env.PORT || 5555;
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║     C64 CHAT SERVER V1.0              ║
║     Running on port ${PORT}           ║
║     ${new Date().toLocaleString()}    ║
║     Password: ${process.env.C64_PASSWORD ? 'SET' : 'DEFAULT (pass123)'}   ║
╚═══════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

server.on('error', err => {
  console.error('SERVER ERROR ➜', err);
  process.exit(1);
});