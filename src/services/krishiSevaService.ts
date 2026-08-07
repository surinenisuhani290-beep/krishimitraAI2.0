import { supabase } from '../lib/supabaseClient';
import type { KrishiSevaRequest } from '../types';

export async function createRequest(request: Partial<KrishiSevaRequest>) {
  const { data, error } = await supabase.from('krishi_seva_requests').insert([request]).select('*');
  if (error) throw error;
  return data?.[0];
}

export async function getRequestsForFarmer(farmerId: string) {
  const { data, error } = await supabase.from('krishi_seva_requests').select('*').eq('farmer_id', farmerId);
  if (error) throw error;
  return data || [];
}
