import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import 'dotenv/config';

const app = express();
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({ origin: (origin, cb) => {
  if (!origin || !ALLOWED_ORIGINS.length || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
  return cb(new Error('Origin not allowed'));
}}));
app.use(express.json());

// Basic token bucket rate limiter per IP
const RATE_LIMIT = { capacity: 60, refillRatePerSec: 1 }; // 60 tokens, 1 token/sec refill
const buckets = new Map();
app.use((req,res,next)=>{
  const ip = req.ip;
  const now = Date.now();
  let bucket = buckets.get(ip);
  if(!bucket) bucket = { tokens: RATE_LIMIT.capacity, last: now };
  const deltaSec = (now - bucket.last)/1000;
  bucket.tokens = Math.min(RATE_LIMIT.capacity, bucket.tokens + deltaSec * RATE_LIMIT.refillRatePerSec);
  bucket.last = now;
  if (bucket.tokens < 1) return res.status(429).json({ error: 'Rate limit exceeded' });
  bucket.tokens -= 1;
  buckets.set(ip, bucket);
  next();
});

app.get('/api/health', (_req,res)=> res.json({ ok:true, time: Date.now() }));

// Simulated ephemeral token: create a sha256 HMAC over the real key + short expiry, so frontend cannot reuse it long-term.
// NOTE: This is a *placeholder*, real implementation should use Google-supported ephemeral mechanism once available.
app.get('/api/gemini/live-token', (req, res) => {
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  const payload = `${expiresAt}`;
  const signature = crypto.createHmac('sha256', process.env.GEMINI_API_KEY).update(payload).digest('hex');
  // Return signature acts as a pseudo-token (frontend cannot recover raw key, but server must verify inbound usage if proxied).
  res.json({ token: signature, expires_at: expiresAt });
});

// Fallback (legacy) raw token endpoint - REMOVE before production
app.get('/api/gemini/token', (req, res) => {
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
  res.json({ token: process.env.GEMINI_API_KEY, warning: 'Do NOT use this endpoint in production.' });
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Gemini proxy server hardened on :${port}`));
