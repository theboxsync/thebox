import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from "../qsr/Login";

import Logout from "../qsr/components/Logout";

import QsrDashboard from '../qsr/pages/QsrDashboard'
import QsrOrderHistory from '../qsr/pages/QsrOrderHistory'
import OrderDetails from '../qsr/components/orderHistory/OrderDetails'
import QsrKOTManagement from '../qsr/pages/QsrKOTManagement'
import QsrManageMenu from '../qsr/pages/QsrManageMenu'
import QsrProfile from '../qsr/pages/QsrProfile'

import PageNotFound from '../qsr/PageNotFound'

function QsrRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      {/* Manager Routes */}
      <Route path="/" element={<QsrDashboard />} />
      <Route path="/dashboard" element={<QsrDashboard />} />
      <Route path="/order-history" element={<QsrOrderHistory />} />
      <Route path="/order-details/:id" element={<OrderDetails />} />
      <Route path="/manage-menu" element={<QsrManageMenu />} />
      <Route path="/inventory" element={<QsrManageMenu />} />
      <Route
        path="/kot-management"
        element={<QsrKOTManagement />}
      />
      <Route path='/profile' element={<QsrProfile />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default QsrRoutes
