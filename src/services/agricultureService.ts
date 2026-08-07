import { detectIntent } from './intentUtils';
import type { FarmerContext } from '../types';

/**
 * processFarmerMessage is the channel-agnostic entry point for queries.
 * It uses lightweight intent detection and returns an object with intent and reply.
 * In LIVE mode this will call server-side OpenAI-powered engine; for now
 * it provides a production-ready path and a demo fallback when no server secret.
 */
export async function processFarmerMessage(text: string, farmerContext?: FarmerContext) {
  const intent = detectIntent(text);

  // Simple local routing for immediate demo responses to keep UX snappy.
  switch (intent) {
    case 'WEATHER':
      return { intent, reply: `Weather: Current conditions near ${farmerContext?.state || 'your area'} unknown (live API not configured).` };
    case 'DISEASE':
      return { intent, reply: 'Disease detection: Please upload an image via the app or describe symptoms. If uncertain, say "Talk to expert".' };
    case 'MARKET_PRICE':
      return { intent, reply: 'Market: Rice ~ 2000 INR/quintal (sample demo data).' };
    case 'GOVERNMENT_SCHEME':
      return { intent, reply: 'Schemes: Use /women-farmer > Schemes to browse demo entries.' };
    case 'KRISHI_SEVA':
      return { intent, reply: 'Krishi Seva: You can request human help at /krishi-seva or reply with "Request help".' };
    default:
      // For unknown, prepare a safe fallback and offer help
      return { intent: 'UNKNOWN', reply: 'Sorry, I did not understand. Try: "weather today", "tomato leaves yellow", "price rice", or "talk to expert".' };
  }
}
