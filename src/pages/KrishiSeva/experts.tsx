import React from 'react';
import { t } from '../../i18n';
import ExpertCard from '../../components/ExpertCard';

const demoExperts = [
  { id: '1', name: 'Dr. Meera Rao', role: 'Agricultural Expert', expertise: 'Pest Management', location: 'Telangana', verified: true },
  { id: '2', name: 'Mr. Ramesh Kumar', role: 'Soil Testing Volunteer', expertise: 'Soil Health', location: 'Andhra Pradesh', verified: false }
];

export default function Experts() {
  return (
    <div>
      <h2 className="text-lg font-semibold">{t('expert_list')}</h2>
      <div className="mt-3 space-y-3">
        {demoExperts.map((e) => (
          <ExpertCard key={e.id} expert={e} />
        ))}
      </div>
    </div>
  );
}
