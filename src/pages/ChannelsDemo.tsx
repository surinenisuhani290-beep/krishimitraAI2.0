import React, { useState } from 'react';
import { handleChannelMessage } from '../services/channelService';
import { t } from '../i18n';

export default function ChannelsDemo() {
  const [messages, setMessages] = useState<{ from: string; text: string; time: string }[]>([]);
  const [input, setInput] = useState('');
  const phone = '91XXXXXXXXXX';

  async function send() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: 'You', text: input, time: new Date().toLocaleTimeString() }]);
    const res = await handleChannelMessage('web', phone, input, { phone });
    setMessages((m) => [...m, { from: 'KrishiMitra', text: res.reply, time: new Date().toLocaleTimeString() }]);
    setInput('');
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="mb-2 text-sm font-semibold">{t('demo_mode')}</div>
      <h1 className="text-2xl font-bold">{t('channels_demo_title')}</h1>
      <div className="mt-4 border rounded h-96 overflow-auto p-2 bg-white">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.from === 'You' ? 'text-right' : 'text-left'}`}>
            <div className="inline-block p-2 rounded bg-gray-100">{m.text}</div>
            <div className="text-xs text-gray-400">{m.time}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input className="flex-1 border p-2 rounded" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t('send_message')} />
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={send}>Send</button>
      </div>
    </div>
  );
}
