import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../manager/Login";

import Logout from "../manager/components/Logout";

import ManagerDashboard from "../manager/pages/ManagerDashboard";
import ManagerOrderHistory from "../manager/pages/ManagerOrderHistory";
import OrderDetails from "../manager/components/orderHistory/OrderDetails";
import ManagerInventory from "../manager/pages/ManagerInventory";
import Inventory_Details from "../manager/pages/ManagerInventory/Inventory_Details";
import UpdateInventory from "../manager/pages/ManagerInventory/UpdateInventory";
import ManagerKOTManagement from "../manager/pages/ManagerKOTManagement";
import ManagerManageMenu from "../manager/pages/ManagerManageMenu";
import ManagerStaff from "../manager/pages/ManagerStaff";
import ManagerTableBooking from "../manager/pages/ManagerTableBooking";
import ManagerProfile from "../manager/pages/ManagerProfile";

import PageNotFound from "../manager/PageNotFound";
import ExpiredPlan from "../manager/ExpiredPlan";
import { AuthContextProvider } from "../manager/context/AuthContext";

function ManagerRoutes() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Manager Routes */}
        <Route path="/" element={<ManagerDashboard />} />
        <Route path="/dashboard" element={<ManagerDashboard />} />
        <Route path="/order-history" element={<ManagerOrderHistory />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/manage-menu" element={<ManagerManageMenu />} />
        <Route path="/inventory" element={<ManagerInventory />} />
        <Route path="/inventory/details/:id" element={<Inventory_Details />} />
        <Route path="/inventory/update/:id" element={<UpdateInventory />} />
        <Route path="/staff" element={<ManagerStaff />} />
        <Route path="/table-booking" element={<ManagerTableBooking />} />
        <Route path="/kot-management" element={<ManagerKOTManagement />} />
        <Route path="/profile" element={<ManagerProfile />} />
        <Route path="/expired-plan" element={<ExpiredPlan />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default ManagerRoutes;
