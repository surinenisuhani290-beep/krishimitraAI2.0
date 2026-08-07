import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Loading from '../components/Loading';
import ErrorBox from '../components/ErrorBox';

type Camp = {
  id: string;
  title: string;
  date: string;
  village?: string;
  district?: string;
  state?: string;
  description?: string;
};

const demoCamps: Camp[] = [
  { id: 'demo-1', title: 'Soil Health Camp - Demo', date: '2026-09-10', village: 'Demo Village', district: 'Demo District', state: 'Telangana', description: 'Demo soil testing and advisory.' },
  { id: 'demo-2', title: 'Pest Awareness Camp - Demo', date: '2026-10-05', village: 'Demo Village B', district: 'Demo District', state: 'Andhra Pradesh', description: 'Demo pest management and training.' }
];

export default function CampsPage() {
  const [camps, setCamps] = useState<Camp[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      // If Supabase configured, try to fetch camps; otherwise use demo data
      if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        try {
          const { data, error } = await supabase.from('camp_events').select('*').order('date', { ascending: true }).limit(50);
          if (error) throw error;
          setCamps((data as any) || []);
          return;
        } catch (err: any) {
          console.error('camps fetch error', err);
          setError('Unable to load camps from live database. Showing demo data.');
        }
      }
      setCamps(demoCamps);
    }
    load();
  }, []);

  if (error) return <ErrorBox message={error} />;
  if (!camps) return <Loading message="Loading camps..." />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Upcoming Camps</h1>
      <div className="mt-4 space-y-3">
        {camps.map((c) => (
          <div key={c.id} className="border p-3 rounded">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-gray-600">{c.date} • {c.village} • {c.district}</div>
            <div className="mt-2">{c.description}</div>
            <div className="mt-3"><button className="px-3 py-1 bg-green-600 text-white rounded">Register (Demo)</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
