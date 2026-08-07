import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

// Assign an expert to a krishi_seva_request (admin-only). Protected by ADMIN_API_KEY.

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_KEY = process.env.ADMIN_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const adminSecret = req.headers['x-admin-secret'];
  if (!ADMIN_KEY || adminSecret !== ADMIN_KEY) return res.status(403).send('forbidden');

  const { requestId, expertId } = req.body || {};
  if (!requestId || !expertId) return res.status(400).send('requestId and expertId required');

  if (!SUPABASE_SERVICE_ROLE || !SUPABASE_URL) return res.status(500).send('supabase not configured on server');

  try {
    const url = `${SUPABASE_URL}/rest/v1/krishi_seva_requests?id=eq.${requestId}`;
    const resp = await axios.patch(url, { assigned_expert: expertId, status: 'ASSIGNED' }, { headers: { Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`, 'Content-Type': 'application/json' } });
    return res.status(200).json({ ok: true, resp: resp.data });
  } catch (err) {
    console.error('assign-request error', err);
    return res.status(500).json({ error: 'server error' });
  }
}
