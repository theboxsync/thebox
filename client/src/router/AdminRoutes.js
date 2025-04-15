import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../admin/context/AuthContext";

import Login from "../admin/Login";
import Register from "../admin/Register";
import Logout from "../admin/components/Logout";
import ForgotAdminPassword from "../admin/ForgotAdminPassword";
import SelectPlan from "../admin/pages/SelectPlan";

import AdminProfile from "../admin/pages/AdminProfile";
import AdminDashboard from "../admin/pages/AdminDashboard/AdminDashboard";
import AdminOrderHistory from "../admin/pages/AdminOrderHistory";
import OrderDetails from "../admin/components/orderHistory/OrderDetails";
import AdminInventory from "../admin/pages/AdminInventory";
import CompleteInventory from "../admin/pages/AdminInventory/CompleteInventory";
import InventoryDetails from "../admin/pages/AdminInventory/Inventory_Details";
import InventoryFullDetails from "../admin/pages/AdminInventory/InventoryFullDetails";
import UpdateRequestedInventory from "../admin/pages/AdminInventory/UpdateRequestedInventory";
import UpdateCompletedInventory from "../admin/pages/AdminInventory/UpdateCompletedInventory";
import AdminManageMenu from "../admin/pages/AdminManageMenu";
import AdminStaff from "../admin/pages/AdminStaff";
import EditStaff from "../admin/pages/AdminStaff/EditStaff";
import AdminTable from "../admin/pages/AdminTable";
import ChangeManagerPassword from "../admin/pages/AdminDashboard/ChangeManagerPassword";
import ChangeQsrPassword from "../admin/pages/AdminDashboard/ChangeQsrPassword";
import AdminSubscription from "../admin/pages/AdminSubscription";
import AdminSettings from "../admin/pages/AdminSettings";
import AdminFeedback from "../admin/pages/AdminFeedback";

import AdminManageManager from "../admin/pages/AdminManageManager";
import AdminManageQSR from "../admin/pages/AdminManageQSR";
import AdminManageCaptain from "../admin/pages/AdminManageCaptain";

import PageNotFound from "../admin/PageNotFound";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<ForgotAdminPassword />} />

      <Route path="/" element={<AdminDashboard />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/order-history" element={<AdminOrderHistory />} />
      <Route path="/order-details/:id" element={<OrderDetails />} />
      <Route path="/table-management" element={<AdminTable />} />
      <Route path="/manage-menu" element={<AdminManageMenu />} />
      <Route path="/select-plan" element={<SelectPlan />} />
      <Route path="/inventory" element={<AdminInventory />} />
      <Route path="/inventory/complete" element={<CompleteInventory />} />
      <Route path="/inventory/details/:id" element={<InventoryDetails />} />
      <Route
        path="/inventory/complete-details/:id"
        element={<InventoryFullDetails />}
      />
      <Route
        path="/inventory/update/:id"
        element={<UpdateRequestedInventory />}
      />
      <Route
        path="/inventory/completed-update/:id"
        element={<UpdateCompletedInventory />}
      />
      <Route path="/staff" element={<AdminStaff />} />
      <Route path="/staff/update/:id" element={<EditStaff />} />
      <Route path="/table-booking" element={<AdminTable />} />

      <Route path="/subscription" element={<AdminSubscription />} />
      <Route path="/settings" element={<AdminSettings />} />

      <Route
        path="/change-manager-password"
        element={<ChangeManagerPassword />}
      />
      <Route path="/change-qsr-password" element={<ChangeQsrPassword />} />

      <Route path="/feedbacks" element={<AdminFeedback />} />

      <Route path="/manage-manager" element={<AdminManageManager />} />
      <Route path="/manage-qsr" element={<AdminManageQSR />} />
      <Route path="/manage-captain" element={<AdminManageCaptain />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AdminRoutes;
