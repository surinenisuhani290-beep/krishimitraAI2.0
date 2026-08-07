import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { callOpenAISystemPrompt } from '../../src/services/openai.server';

// This Edge function provides a secure server-side agriculture engine entrypoint.
// It expects POST { phone, text } and will call OpenAI with a safety system prompt
// and persist conversation using Supabase service role when configured.

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function saveConversation(phone: string, inbound: string, outbound: string) {
  if (!SUPABASE_SERVICE_ROLE || !SUPABASE_URL) return;
  try {
    await axios.post(`${SUPABASE_URL}/rest/v1/channel_conversations`, {
      channel: 'whatsapp',
      contact: phone,
      last_message: outbound
    }, {
      headers: { Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`, 'Content-Type': 'application/json', Prefer: 'return=representation' }
    });
  } catch (err) {
    console.error('saveConversation error', err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const { phone, text } = req.body || {};
  if (!phone || !text) return res.status(400).send('phone and text required');

  try {
    const systemPrompt = `You are Krishi Mitra AI, an experienced agricultural officer for smallholder farmers in India. Provide practical, safe, actionable advice in short farmer-friendly language. If uncertain, recommend human expert handoff. Give concise pesticide/fertilizer dosages only when necessary and with safety precautions.`;

    const reply = await callOpenAISystemPrompt(systemPrompt, text);

    // Persist conversation in Supabase (best-effort)
    await saveConversation(phone, text, reply || 'no-reply');

    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error('agri-engine error', err?.message || err);
    return res.status(500).json({ error: 'server error' });
  }
}
