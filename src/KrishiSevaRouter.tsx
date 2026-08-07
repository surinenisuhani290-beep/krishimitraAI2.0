import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import KrishiSevaPage from './pages/KrishiSeva/index';
import ExpertsListPage from './pages/KrishiSeva/expertsList';
import ExpertRegister from './pages/KrishiSeva/register';

export default function KrishiSevaRouter() {
  return (
    <Routes>
      <Route path="/krishi-seva" element={<KrishiSevaPage />} />
      <Route path="/krishi-seva/experts" element={<ExpertsListPage />} />
      <Route path="/krishi-seva/register" element={<ExpertRegister />} />
    </Routes>
  );
}
