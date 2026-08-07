import React from 'react';

export default function ExpertCard({ expert }: any) {
  return (
    <div className="border p-3 rounded">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{expert.name}</div>
          <div className="text-sm text-gray-600">{expert.role} • {expert.location}</div>
        </div>
        <div className="text-sm">
          {expert.verified ? <span className="text-green-600">✓ Verified</span> : <span className="text-yellow-600">Verification Pending</span>}
        </div>
      </div>
      <div className="mt-2 text-sm">{expert.expertise}</div>
      <div className="mt-3"><button className="px-3 py-1 bg-blue-600 text-white rounded">Request</button></div>
    </div>
  );
}
