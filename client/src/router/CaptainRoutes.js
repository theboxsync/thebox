import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../captain/Login';
import Logout from '../captain/components/Logout';

import CaptainDashboard from '../captain/pages/CaptainDashboard';
import CaptainKOTManagement from '../captain/pages/CaptainKOTManagement';

import PageNotFound from '../captain/PageNotFound';

function CaptainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CaptainDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/dashboard" element={<CaptainDashboard />} />
        <Route path="/kot-management" element={<CaptainKOTManagement />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default CaptainRoutes
