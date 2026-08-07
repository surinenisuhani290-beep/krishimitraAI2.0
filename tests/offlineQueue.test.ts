import { describe, it, expect, beforeEach, vi } from 'vitest';
import { enqueueRequest, processQueue, getQueuedCount } from '../src/services/offlineQueue';

beforeEach(() => {
  localStorage.clear();
});

describe('offline queue', () => {
  it('enqueue and count', () => {
    enqueueRequest({ title: 'Test', description: 'desc' });
    expect(getQueuedCount()).toBe(1);
  });

  it('processQueue keeps items when createRequest fails', async () => {
    // The createRequest will throw because Supabase not configured; ensure processQueue handles it
    const r = { title: 'Test2' };
    enqueueRequest(r as any);
    const res = await processQueue();
    expect(res.success).toBe(0);
    expect(res.failed).toBe(1);
    expect(getQueuedCount()).toBe(1);
  });
});
