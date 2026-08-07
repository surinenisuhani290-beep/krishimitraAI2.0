import React from 'react';
import { useForm } from 'react-hook-form';
import { registerExpert } from '../../services/expertService';
import { useNavigate } from 'react-router-dom';

export default function ExpertRegister() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data: any) {
    try {
      await registerExpert(data);
      alert('Registration submitted. You will receive verification after admin review.');
      navigate('/krishi-seva');
    } catch (err) {
      console.error(err);
      alert('Error submitting registration');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-2">
      <h2 className="text-lg font-semibold">Expert / Volunteer Registration</h2>
      <input {...register('full_name')} placeholder="Full name" className="w-full p-2 border rounded" />
      <input {...register('mobile')} placeholder="Mobile" className="w-full p-2 border rounded" />
      <input {...register('email')} placeholder="Email" className="w-full p-2 border rounded" />
      <select {...register('role')} className="w-full p-2 border rounded">
        <option value="Agricultural Expert">Agricultural Expert</option>
        <option value="Agri-University Student">Agri-University Student</option>
        <option value="Retired Scientist">Retired Scientist</option>
        <option value="NGO Volunteer">NGO Volunteer</option>
        <option value="CSR Partner">CSR Partner</option>
        <option value="FPO Representative">FPO Representative</option>
        <option value="Soil Testing Volunteer">Soil Testing Volunteer</option>
        <option value="Other">Other</option>
      </select>
      <input {...register('organization')} placeholder="Organization" className="w-full p-2 border rounded" />
      <textarea {...register('bio')} placeholder="Short bio" className="w-full p-2 border rounded" />
      <button type="submit" className="px-4 py-2 bg-krishi-green text-white rounded">Submit</button>
    </form>
  );
}
