import { Routes, Route } from "react-router-dom";

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
import ManageAttendance from "../admin/pages/AdminStaff/ManageAttendance";
import ViewAttandance from "../admin/pages/AdminStaff/ViewAttandance";
import AdminTable from "../admin/pages/AdminTable";

import ChangeManagerPassword from "../admin/pages/ChangeManagerPassword";
import ChangeQsrPassword from "../admin/pages/ChangeQsrPassword";
import ChangeCaptainPassword from "../admin/pages/ChangeCaptainPassword";
import ChangeAttendancePassword from "../admin/pages/ChangeAttendancePassword";

import AdminSubscription from "../admin/pages/AdminSubscription";
import AdminSettings from "../admin/pages/AdminSettings";
import AdminFeedback from "../admin/pages/AdminFeedback";

import ManageWebsite from "../admin/pages/ManageWebsite";

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
      <Route path="/staff/attendance" element={<ManageAttendance />} />
      <Route path="/staff/attendance/:id" element={<ViewAttandance />} />

      <Route path="/table-booking" element={<AdminTable />} />

      <Route path="/subscription" element={<AdminSubscription />} />
      <Route path="/settings" element={<AdminSettings />} />

      <Route
        path="/change-manager-password"
        element={<ChangeManagerPassword />}
      />
      <Route path="/change-qsr-password" element={<ChangeQsrPassword />} />
      <Route
        path="/change-captain-password"
        element={<ChangeCaptainPassword />}
      />
      <Route
        path="/change-attendance-password"
        element={<ChangeAttendancePassword />}
      />

      <Route path="/feedbacks" element={<AdminFeedback />} />


      <Route path="/manage-restaurant-website" element={<ManageWebsite />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AdminRoutes;
