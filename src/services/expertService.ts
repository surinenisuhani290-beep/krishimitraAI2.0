import { supabase } from '../lib/supabaseClient';
import type { ExpertProfile } from '../types';

export async function registerExpert(profile: Partial<ExpertProfile>) {
  const { data, error } = await supabase.from('expert_profiles').insert([profile]).select('*');
  if (error) throw error;
  return data?.[0];
}

export async function getExperts(limit = 50) {
  const { data, error } = await supabase.from('expert_profiles').select('*').limit(limit);
  if (error) throw error;
  return data || [];
}

export async function getExpertById(id: string) {
  const { data, error } = await supabase.from('expert_profiles').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}
