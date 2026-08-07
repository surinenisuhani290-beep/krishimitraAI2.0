import React, { useEffect, useState } from 'react';

type Farm = {
  name?: string;
  mobile?: string;
  state?: string;
  district?: string;
  village?: string;
  total_land?: string;
  crops?: string;
};

export default function MyFarm() {
  const [farm, setFarm] = useState<Farm>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem('myFarm');
      if (raw) setFarm(JSON.parse(raw));
    } catch (e) {
      console.warn('corrupt localStorage myFarm - resetting');
      localStorage.removeItem('myFarm');
    }
  }, []);

  function save() {
    localStorage.setItem('myFarm', JSON.stringify(farm));
    alert('Saved');
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Farm</h1>
      <div className="mt-3 space-y-2">
        <input value={farm.name || ''} onChange={(e) => setFarm({ ...farm, name: e.target.value })} placeholder="Farmer name" className="w-full p-2 border rounded" />
        <input value={farm.mobile || ''} onChange={(e) => setFarm({ ...farm, mobile: e.target.value })} placeholder="Mobile" className="w-full p-2 border rounded" />
        <input value={farm.total_land || ''} onChange={(e) => setFarm({ ...farm, total_land: e.target.value })} placeholder="Total land" className="w-full p-2 border rounded" />
        <button onClick={save} className="px-4 py-2 bg-krishi-green text-white rounded">Save</button>
      </div>
    </div>
  );
}
