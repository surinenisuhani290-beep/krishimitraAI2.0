import React from 'react';
import i18n from '../i18n';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'मराठी' }
];

export default function LanguageSelector() {
  const change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    i18n.changeLanguage(v);
  };

  return (
    <select aria-label="Language" onChange={change} defaultValue={i18n.language} className="p-1 border rounded text-sm">
      {languages.map((l) => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  );
}
