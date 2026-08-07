import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    setStatus('Admin UI ready');
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4 space-y-4">
        <div className="p-3 border rounded">
          <h2 className="font-semibold">Experts</h2>
          <p className="text-sm text-gray-600">Review and verify expert applications</p>
          <a className="text-blue-600" href="/admin/experts">Manage experts</a>
        </div>
        <div className="p-3 border rounded">
          <h2 className="font-semibold">Krishi Seva Requests</h2>
          <p className="text-sm text-gray-600">Assign experts and update statuses</p>
          <a className="text-blue-600" href="/admin/requests">Manage requests</a>
        </div>
        <div className="p-3 border rounded">
          <h2 className="font-semibold">Camps & Schemes</h2>
          <p className="text-sm text-gray-600">Manage camps, schemes, SHGs and FPOs</p>
          <a className="text-blue-600" href="/admin/camps">Manage camps</a>
        </div>
      </div>
      <div className="mt-6 text-sm text-gray-500">{status}</div>
    </div>
  );
}
