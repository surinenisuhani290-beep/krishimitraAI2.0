import axios from 'axios';

const TWILIO_BASE = 'https://api.twilio.com/2010-04-01';
const ACCOUNT = process.env.TWILIO_ACCOUNT_SID;
const TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM = process.env.TWILIO_PHONE_NUMBER;

export async function sendSms(to: string, body: string) {
  if (!ACCOUNT || !TOKEN || !FROM) {
    console.log('[sms] demo send to', to, body);
    return { ok: true, demo: true };
  }

  const url = `${TWILIO_BASE}/Accounts/${ACCOUNT}/Messages.json`;
  const data = new URLSearchParams();
  data.append('To', to);
  data.append('From', FROM);
  data.append('Body', body);

  const auth = { username: ACCOUNT, password: TOKEN };
  const resp = await axios.post(url, data.toString(), { auth, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  return resp.data;
}
