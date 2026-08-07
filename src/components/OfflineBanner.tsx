import React from 'react';
import useNetwork from '../hooks/useNetwork';

export default function OfflineBanner() {
  const { online } = useNetwork();
  if (online) return null;
  return (
    <div role="status" aria-live="polite" className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2">
      <div className="max-w-5xl mx-auto text-sm">You are offline. Some features are limited — any requests you submit will be queued and sent when connection is restored.</div>
    </div>
  );
}
