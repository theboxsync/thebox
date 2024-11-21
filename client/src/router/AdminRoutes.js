import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../admin/Login";
import Register from "../admin/Register";
import Logout from "../admin/components/Logout";
import ForgotPassword from "../ForgotPassword";
import ForgotAdminPassword from "../admin/ForgotAdminPassword";
import OtpVerification from "../OtpVerification";
import ChangePassword from "../ChangePassword";
import RegistrationComplete from "../RegistrationComplete";

// Admin Imports
import AdminProfile from "../admin/pages/AdminProfile";
import AdminDashboard from "../admin/pages/AdminDashboard/AdminDashboard";
import AdminOrderHistory from "../admin/pages/AdminOrderHistory";
import AdminInventory from "../admin/pages/AdminInventory";
import AdminManageMenu from "../admin/pages/AdminManageMenu";
import AdminStaff from "../admin/pages/AdminStaff";
import UpdateStaff from "../admin/pages/AdminStaff/UpdateStaff";
import AdminTable from "../admin/pages/AdminTable";
import ChangeManagerPassword from "../admin/pages/AdminDashboard/ChangeManagerPassword";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<ForgotAdminPassword />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/registration-complete" element={<RegistrationComplete />} />

      <Route path="/" element={<AdminDashboard />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/order-history" element={<AdminOrderHistory />} />
      <Route path="/table-management" element={<AdminTable />} />
      <Route path="/manage-menu" element={<AdminManageMenu />} />
      <Route path="/inventory" element={<AdminInventory />} />
      <Route path="/staff" element={<AdminStaff />} />
      <Route path="/staff/update" element={<UpdateStaff />} />
      <Route path="/table-booking" element={<AdminTable />} />
      <Route path="/change-manager-password" element={<ChangeManagerPassword />} />
    </Routes>
  );
}

export default AdminRoutes;
