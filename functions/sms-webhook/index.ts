import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { handleChannelMessage } from '../../src/services/channelService';

// Twilio SMS webhook receiver. Twilio posts form-encoded data with "From" and "Body".
// This endpoint parses the incoming SMS and routes it to the channel handler.

const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const body = req.body || {};
  const from = body.From || body.from || '';
  const text = body.Body || body.body || '';
  if (!from || !text) return res.status(400).send('missing fields');

  try {
    const result = await handleChannelMessage('sms', from, text, { phone: from });

    // If Twilio creds present, respond with TwiML or send SMS via API; otherwise respond plain text.
    if (TWILIO_AUTH_TOKEN && TWILIO_ACCOUNT_SID) {
      // For simplicity, return TwiML response which Twilio accepts
      res.setHeader('Content-Type', 'text/xml');
      const reply = result.reply || 'Thanks — your message has been received.';
      return res.status(200).send(`<Response><Message>${reply}</Message></Response>`);
    }

    // Demo mode: return a simple JSON
    return res.status(200).json({ reply: result.reply });
  } catch (err) {
    console.error('sms-webhook error', err);
    return res.status(500).send('server error');
  }
}
