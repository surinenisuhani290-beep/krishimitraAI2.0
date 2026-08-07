import React from 'react';
import { useForm } from 'react-hook-form';
import { t } from '../../i18n';

export default function RequestForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log('request', data);
    alert('Request submitted. Request ID: LIVE-DEMO-' + Math.floor(Math.random() * 10000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3 border rounded">
      <h2 className="text-lg font-semibold">{t('request_help')}</h2>
      <div className="mt-2 space-y-2">
        <input {...register('title')} placeholder="Title" className="w-full p-2 border rounded" />
        <input {...register('crop')} placeholder="Crop" className="w-full p-2 border rounded" />
        <textarea {...register('description')} placeholder="Describe the problem" className="w-full p-2 border rounded" />
        <div className="flex gap-2">
          <input {...register('state')} placeholder="State" className="flex-1 p-2 border rounded" />
          <input {...register('district')} placeholder="District" className="flex-1 p-2 border rounded" />
        </div>
        <button type="submit" className="px-4 py-2 bg-krishi-green text-white rounded">{t('submit_request')}</button>
      </div>
    </form>
  );
}
