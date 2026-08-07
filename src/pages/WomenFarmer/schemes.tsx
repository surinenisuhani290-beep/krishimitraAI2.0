import React from 'react';
import { t } from '../../i18n';

export default function Schemes() {
  return (
    <div className="border p-3 rounded">
      <h3 className="font-semibold">{t('schemes')}</h3>
      <div className="mt-2 text-sm text-gray-600">Demo Data: Women farmer schemes are listed here.</div>
    </div>
  );
}
