import { processFarmerMessage } from './agricultureService';
import type { FarmerContext } from '../types';

export async function handleChannelMessage(channel: 'web' | 'whatsapp' | 'sms' | 'ivr', from: string, text: string, farmerContext?: FarmerContext) {
  const ctx = farmerContext || { id: from, phone: from, language: 'en' };
  const res = await processFarmerMessage(text, ctx);
  // TODO: persist messages to Supabase channel_messages in live mode
  return res;
}
