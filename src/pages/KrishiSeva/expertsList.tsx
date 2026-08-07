import React, { useEffect, useState } from 'react';
import { getExperts } from '../../services/expertService';
import ExpertCard from '../../components/ExpertCard';

export default function ExpertsListPage() {
  const [experts, setExperts] = useState<any[]>([]);
  useEffect(() => {
    getExperts().then(setExperts).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Experts</h2>
      <div className="mt-3 space-y-3">
        {experts.map((e) => (
          <ExpertCard key={e.id} expert={{ name: e.full_name, role: e.role, expertise: e.expertise, location: e.state, verified: e.verification_status === 'VERIFIED' }} />
        ))}
      </div>
    </div>
  );
}
