import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Login from '../attendance/Login'
import Logout from '../attendance/components/Logout'

import AttendanceDashboard from '../attendance/pages/AttendanceDashboard'

import PageNotFound from '../attendance/PageNotFound'


const AttendanceRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AttendanceDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/dashboard" element={<AttendanceDashboard />} />
        

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default AttendanceRoutes
