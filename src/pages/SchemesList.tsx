import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Loading from '../components/Loading';
import ErrorBox from '../components/ErrorBox';

type Scheme = {
  id: string;
  name: string;
  description: string;
  state?: string;
};

const demoSchemes: Scheme[] = [
  { id: 's1', name: 'Women Agri Demo Scheme', description: 'Demo scheme for women farmers.', state: 'All' },
  { id: 's2', name: 'SHG Support Demo', description: 'Demo support services for SHGs.', state: 'All' }
];

export default function SchemesList() {
  const [schemes, setSchemes] = useState<Scheme[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        try {
          const { data, error } = await supabase.from('scheme_directory').select('*').limit(50);
          if (error) throw error;
          setSchemes((data as any) || []);
          return;
        } catch (err: any) {
          console.error('schemes fetch error', err);
          setError('Unable to load schemes from live database. Showing demo data.');
        }
      }
      setSchemes(demoSchemes);
    }
    load();
  }, []);

  if (error) return <ErrorBox message={error} />;
  if (!schemes) return <Loading message="Loading schemes..." />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Schemes</h1>
      <div className="mt-4 space-y-3">
        {schemes.map((s) => (
          <div key={s.id} className="border p-3 rounded">
            <div className="font-semibold">{s.name}</div>
            <div className="text-sm text-gray-600">{s.state}</div>
            <div className="mt-2">{s.description}</div>
            <div className="mt-3"><a className="text-blue-600">Learn more (Demo)</a></div>
          </div>
        ))}
      </div>
    </div>
  );
}
