import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import ChannelsDemo from './pages/ChannelsDemo';
import KrishiSevaPage from './pages/KrishiSeva/index';
import WomenFarmerPage from './pages/WomenFarmer/index';
import MyFarm from './pages/MyFarm';
import ExpertsListPage from './pages/KrishiSeva/expertsList';
import ExpertRegister from './pages/KrishiSeva/register';

export default function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/channels" element={<ChannelsDemo />} />
      <Route path="/krishi-seva" element={<KrishiSevaPage />} />
      <Route path="/krishi-seva/experts" element={<ExpertsListPage />} />
      <Route path="/krishi-seva/register" element={<ExpertRegister />} />
      <Route path="/women-farmer" element={<WomenFarmerPage />} />
      <Route path="/my-farm" element={<MyFarm />} />
    </Routes>
  );
}
