import React from 'react';
import Experts from './experts';
import RequestForm from './requestForm';
import { t } from '../../i18n';

export default function KrishiSevaPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{t('krishi_seva')}</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Experts />
        <RequestForm />
      </div>
    </div>
  );
}
