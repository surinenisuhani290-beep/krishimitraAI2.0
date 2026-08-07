import { createRequest } from './krishiSevaService';
import type { KrishiSevaRequest } from '../types';

const KEY = 'krishi_outbox_requests';

function readQueue(): Partial<KrishiSevaRequest>[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Partial<KrishiSevaRequest>[];
  } catch (err) {
    console.warn('outbox corrupt, clearing');
    localStorage.removeItem(KEY);
    return [];
  }
}

function writeQueue(q: Partial<KrishiSevaRequest>[]) {
  localStorage.setItem(KEY, JSON.stringify(q));
}

export function enqueueRequest(req: Partial<KrishiSevaRequest>) {
  const q = readQueue();
  q.push({ ...req, created_at: new Date().toISOString() });
  writeQueue(q);
}

export async function processQueue(): Promise<{ success: number; failed: number }> {
  const q = readQueue();
  if (!q.length) return { success: 0, failed: 0 };
  const remaining: Partial<KrishiSevaRequest>[] = [];
  let success = 0;
  for (const item of q) {
    try {
      // try server submit (createRequest uses Supabase anon if configured)
      await createRequest(item);
      success++;
    } catch (err) {
      console.error('processQueue item failed', err);
      remaining.push(item);
    }
  }
  writeQueue(remaining);
  return { success, failed: remaining.length };
}

export function getQueuedCount() {
  return readQueue().length;
}
