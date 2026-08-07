import React, { useEffect, useState } from 'react';
import { getExperts } from '../../services/expertService';

export default function AdminExperts() {
  const [experts, setExperts] = useState<any[]>([]);

  useEffect(() => {
    getExperts().then(setExperts).catch(console.error);
  }, []);

  async function verify(id: string) {
    const adminSecret = process.env.VITE_ADMIN_API_KEY || '';
    try {
      const resp = await fetch('/api/admin/verify-expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminSecret },
        body: JSON.stringify({ id })
      });
      if (resp.ok) {
        alert('Expert verified');
        setExperts((e) => e.map((x) => (x.id === id ? { ...x, verification_status: 'VERIFIED' } : x)));
      } else {
        alert('Verify failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin — Experts</h1>
      <div className="mt-4 space-y-3">
        {experts.map((e) => (
          <div key={e.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{e.full_name}</div>
              <div className="text-sm text-gray-600">{e.role} • {e.state}</div>
            </div>
            <div>
              <div className="text-sm">Status: {e.verification_status}</div>
              {e.verification_status !== 'VERIFIED' && (
                <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded" onClick={() => verify(e.id)}>Verify</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
