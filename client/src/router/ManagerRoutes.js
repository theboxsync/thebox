import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ManagerDashboard from '../manager/pages/ManagerDashboard'
import ManagerInventory from '../manager/pages/ManagerInventory'
import ManagerKOTManagement from '../manager/pages/ManagerKOTManagement'
import ManagerManageMenu from '../manager/pages/ManagerManageMenu'
import ManagerStaff from '../manager/pages/ManagerStaff'
import ManagerTableBooking from '../manager/pages/ManagerTableBooking'

function ManagerRoutes() {
  return (
    <Routes>
      {/* Manager Routes */}
      <Route path="/" element={<ManagerDashboard />} />
      <Route path="/dashboard" element={<ManagerDashboard />} />
      <Route path="/manage-menu" element={<ManagerManageMenu />} />
      <Route path="/inventory" element={<ManagerInventory />} />
      <Route path="/staff" element={<ManagerStaff />} />
      <Route path="/table-booking" element={<ManagerTableBooking />} />
      <Route
        path="/kot-management"
        element={<ManagerKOTManagement />}
      />
    </Routes>
  )
}

export default ManagerRoutes
