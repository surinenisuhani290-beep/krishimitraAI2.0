import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ChannelsDemo from './pages/ChannelsDemo';
import KrishiSevaPage from './pages/KrishiSeva/index';
import WomenFarmerPage from './pages/WomenFarmer/index';
import MyFarm from './pages/MyFarm';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminExperts from './pages/Admin/Experts';
import AdminRequests from './pages/Admin/Requests';

export default function RootRoutes() {
  return (
    <div className="min-h-screen bg-krishi-green-pale">
      <nav className="p-4 bg-white shadow">
        <div className="max-w-5xl mx-auto flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/channels">Channels</Link>
          <Link to="/krishi-seva">Krishi Seva</Link>
          <Link to="/women-farmer">Women Farmer</Link>
          <Link to="/my-farm">My Farm</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<div>Welcome to Krishi Mitra AI</div>} />
          <Route path="/channels" element={<ChannelsDemo />} />
          <Route path="/krishi-seva" element={<KrishiSevaPage />} />
          <Route path="/women-farmer" element={<WomenFarmerPage />} />
          <Route path="/my-farm" element={<MyFarm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/experts" element={<AdminExperts />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
        </Routes>
      </main>
    </div>
  );
}
