// Server-side WhatsApp helper (server-only). Uses environment variables and
// sends messages via Meta WhatsApp Cloud when configured. This file is meant
// to be deployed in an Edge Function or serverless environment and must not be
// bundled into the browser.

import axios from 'axios';

const WHATSAPP_API_BASE = 'https://graph.facebook.com/v17.0';
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

export async function sendWhatsAppText(to: string, message: string) {
  if (!PHONE_ID || !TOKEN) {
    console.log('[whatsapp] demo send to', to, message);
    return { ok: true, demo: true };
  }

  const url = `${WHATSAPP_API_BASE}/${PHONE_ID}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to,
    text: { body: message }
  };

  const resp = await axios.post(url, body, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return resp.data;
}
