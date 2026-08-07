import React, { useEffect, useState } from 'react';

const demoTrainings = [
  { id: 't1', title: 'Women Entrepreneurship Training (Demo)', date: '2026-09-15', location: 'Demo Center' },
  { id: 't2', title: 'Digital Literacy for SHG (Demo)', date: '2026-10-01', location: 'Demo Village' }
];

export default function TrainingPage() {
  const [items] = useState(demoTrainings);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Training & Camps</h1>
      <div className="mt-4 space-y-3">
        {items.map((t) => (
          <div key={t.id} className="border p-3 rounded">
            <div className="font-semibold">{t.title}</div>
            <div className="text-sm text-gray-600">{t.date} • {t.location}</div>
            <div className="mt-2">Register to attend this demo training session.</div>
            <div className="mt-3"><button className="px-3 py-1 bg-blue-600 text-white rounded">Register (Demo)</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
