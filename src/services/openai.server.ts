import axios from 'axios';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.OPENAI_API_KEY;

export async function callOpenAISystemPrompt(systemPrompt: string, userMessage: string) {
  if (!API_KEY) throw new Error('OPENAI_API_KEY not configured');

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    temperature: 0.2,
    max_tokens: 700
  };

  const resp = await axios.post(OPENAI_URL, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  });

  const text = resp.data?.choices?.[0]?.message?.content;
  return text || null;
}
