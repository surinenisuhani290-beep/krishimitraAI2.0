import React from 'react';
import Schemes from './schemes';
import Shg from './shg';
import Fpo from './fpo';
import { t } from '../../i18n';

export default function WomenFarmerPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{t('women_farmer_support')}</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Schemes />
        <Shg />
        <Fpo />
      </div>
    </div>
  );
}
