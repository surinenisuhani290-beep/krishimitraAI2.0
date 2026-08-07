import React, { useEffect, useState } from 'react';
import { getRequestsForFarmer } from '../../services/krishiSevaService';

export default function AdminRequests() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    // For admin demo we fetch all requests — service currently returns empty without server role
    (async () => {
      try {
        const resp = await fetch('/api/admin/requests');
        if (resp.ok) {
          const json = await resp.json();
          setRequests(json);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  async function assign(requestId: string) {
    const expertId = prompt('Enter expert id to assign');
    if (!expertId) return;
    try {
      const adminSecret = process.env.VITE_ADMIN_API_KEY || '';
      const resp = await fetch('/api/admin/assign-request', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminSecret }, body: JSON.stringify({ requestId, expertId }) });
      if (resp.ok) alert('Assigned');
    } catch (err) {
      console.error(err);
      alert('Error assigning');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin — Requests</h1>
      <div className="mt-4 space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="border p-3 rounded">
            <div className="font-semibold">{r.title}</div>
            <div className="text-sm text-gray-600">Status: {r.status}</div>
            <div className="mt-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => assign(r.id)}>Assign</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
