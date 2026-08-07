// Edge function / webhook for WhatsApp Cloud API (server-side). Deploy this
// file to your serverless provider (Vercel/Netlify) as an api endpoint. It
// verifies webhook challenges and processes incoming messages by calling
// the shared channel service / agriculture engine.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { handleChannelMessage } from '../../src/services/channelService';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'demo_verify_token';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge as string);
    }
    return res.status(403).send('verification failed');
  }

  if (req.method === 'POST') {
    const body = req.body;
    try {
      const changes = body.entry?.[0]?.changes?.[0];
      const messages = changes?.value?.messages;
      if (!messages || !messages.length) return res.status(200).send('no messages');
      const msg = messages[0];
      const from = msg.from; // phone number
      const text = msg.text?.body || '';

      // Call channel-agnostic handler
      const reply = await handleChannelMessage('whatsapp', from, text, { phone: from });

      // Send back reply via WhatsApp Cloud API
      if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
        const url = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
        await axios.post(url, { messaging_product: 'whatsapp', to: from, text: { body: reply.reply } }, { headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}` } });
      } else {
        console.log('[webhook] demo reply to', from, reply.reply);
      }

      // Optionally persist conversation in Supabase (server-only) - left as TODO until service role key present
      return res.status(200).send('processed');
    } catch (err) {
      console.error('webhook error', err);
      return res.status(500).send('server error');
    }
  }

  res.status(405).send('method not allowed');
}
