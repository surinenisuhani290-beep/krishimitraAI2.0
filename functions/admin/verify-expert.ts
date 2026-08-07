import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

// Admin endpoint to verify an expert. Must be protected with ADMIN_API_KEY set as
// env var on the serverless runtime. This endpoint uses SUPABASE_SERVICE_ROLE_KEY
// to update the expert profile's verification_status to VERIFIED.

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_KEY = process.env.ADMIN_API_KEY; // keep this secret and set in provider

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const adminSecret = req.headers['x-admin-secret'];
  if (!ADMIN_KEY || adminSecret !== ADMIN_KEY) return res.status(403).send('forbidden');

  const { id } = req.body || {};
  if (!id) return res.status(400).send('id required');

  if (!SUPABASE_SERVICE_ROLE || !SUPABASE_URL) return res.status(500).send('supabase not configured on server');

  try {
    const url = `${SUPABASE_URL}/rest/v1/expert_profiles?id=eq.${id}`;
    const resp = await axios.patch(url, { verification_status: 'VERIFIED' }, { headers: { Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`, 'Content-Type': 'application/json' } });
    return res.status(200).json({ ok: true, resp: resp.data });
  } catch (err) {
    console.error('verify-expert error', err);
    return res.status(500).json({ error: 'server error' });
  }
}
