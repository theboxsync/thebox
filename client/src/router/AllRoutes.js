import React from "react";

import { Routes, Route } from "react-router-dom";


import Login from "../Login";
import Register from "../Register";
import Logout from "../components/Logout";
import ForgotPassword from "../ForgotPassword";
import OtpVerification from "../OtpVerification";
import ChangePassword from "../ChangePassword";
import RegistrationComplete from "../RegistrationComplete";

import RestaurantDashboard from "../pages/Restaurant_Dashboard/Restaurant_Dashboard";
import RestaurantFeedback from "../pages/Restaurant_Feedback/Restaurant_Feedback";

import RestaurantCustomer from "../pages/Restaurant_Customer/Restaurant_Customer";
import CustomerOffer from "../pages/Restaurant_Customer/Offer";

// Inventory
import RestaurantInventory from "../pages/Restaurant_Inventory/Restaurant_Inventory";
import InventoryDetails from "../pages/Restaurant_Inventory/Inventory_Details";
import UpdateInventory from "../pages/Restaurant_Inventory/Update_Inventory";

// RestaurantMenuList

import RestaurantMenuList from "../pages/Restaurant_Menu_List/Restaurant_Menu_List";

// RstaurantOrder
import RestaurantOrder from "../pages/Restaurant_Order/Restaurant_Order";
import OrderDetails from "../pages/Restaurant_Order/Order_Details";

// Restaurant Table Booking

import TableBooking from "../pages/Restaurant_Table_Booking/Restaurant_Table_Booking";
import BookingDetails from "../pages/Restaurant_Table_Booking/Booking_Details";
import UpdateBooking from "../pages/Restaurant_Table_Booking/Update_Booking";

// Restaurant Table Management
import TableManagement from "../pages/Restaurant_Table_Management/Restaurant_Table_Management";

// Restaurant Staff
import RestaurantStaff from "../pages/Restaurant_Staff/RestaurantStaff";
import ManageAttendance from "../pages/Restaurant_Staff/ManageAttendance";
import UpdateStaff from "../pages/Restaurant_Staff/UpdateStaff";

import RestaurantKOTManagement from "../pages/Restaurant_KOT_Management";

// Admin Imports
import AdminProfile from "../admin/pages/AdminProfile";
import AdminDashboard from "../admin/pages/AdminDashboard/AdminDashboard";
import AdminOrderHistory from "../admin/pages/AdminOrderHistory";
import AdminInventory from "../admin/pages/AdminInventory";
import AdminManageMenu from "../admin/pages/AdminManageMenu";
import AdminStaff from "../admin/pages/AdminStaff";
import AdminTable from "../admin/pages/AdminTable";

// Manager Imports
import ManagerDashboard from "../manager/pages/ManagerDashboard";
import ManagerOrderHistory from "../manager/pages/ManagerOrderHistory";
import OrderFullDetails from "../manager/components/orderHistory/OrderFullDetails";
import ManagerInventory from "../manager/pages/ManagerInventory";
import ManagerKOTManagement from "../manager/pages/ManagerKOTManagement";
import ManagerManageMenu from "../manager/pages/ManagerManageMenu";
import ManagerStaff from "../manager/pages/ManagerStaff";
import ManagerTableBooking from "../manager/pages/ManagerTableBooking";
import ManagerStatistics from "../manager/pages/ManagerStatistics";
import ManagerProfile from "../manager/pages/ManagerProfile";

// -------------Temp Testing-----------------

import TempTesting from "../TempTesting";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RestaurantDashboard />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/registration-complete" element={<RegistrationComplete />} />
      <Route path="/dashboard" element={<RestaurantDashboard />} />
      <Route path="/feedback" element={<RestaurantFeedback />} />
      <Route path="/CRM/Restaurant-Customer" element={<RestaurantCustomer />} />

      <Route
        path="/CRM/Restaurant-Customer/Offer"
        element={<CustomerOffer />}
      />

      <Route path="/inventory" element={<RestaurantInventory />} />
      <Route path="/inventory/details" element={<InventoryDetails />} />
      <Route path="/inventory/update" element={<UpdateInventory />} />

      <Route path="/menu-list" element={<RestaurantMenuList />} />

      <Route path="/orders" element={<RestaurantOrder />} />
      <Route path="/order/details" element={<OrderDetails />} />

      <Route path="/table-booking" element={<TableBooking />} />
      <Route path="/table-booking/details" element={<BookingDetails />} />
      <Route path="/table-booking/update" element={<UpdateBooking />} />
      <Route path="/table-management" element={<TableManagement />} />

      <Route path="/staff" element={<RestaurantStaff />} />
      <Route path="/staff/attendance" element={<ManageAttendance />} />
      <Route path="/staff/update" element={<UpdateStaff />} />

      <Route path="/kot-management" element={<RestaurantKOTManagement />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/order-history" element={<AdminOrderHistory />} />
      <Route path="/admin/table-management" element={<AdminTable />} />
      <Route path="/admin/manage-menu" element={<AdminManageMenu />} />
      <Route path="/admin/inventory" element={<AdminInventory />} />
      <Route path="/admin/table-booking" element={<AdminTable />} />

      {/* Manager Routes */}
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      <Route path="/manager/order-history" element={<ManagerOrderHistory />} />
      <Route path="/manager/order-details/:id" element={<OrderFullDetails />} />
      <Route path="/manager/manage-menu" element={<ManagerManageMenu />} />
      <Route path="/manager/inventory" element={<ManagerInventory />} />
      <Route path="/manager/staff" element={<ManagerStaff />} />
      <Route path="/manager/table-booking" element={<ManagerTableBooking />} />
      <Route path="/manager/statistics" element={<ManagerStatistics />} />
      <Route path="/manager/profile" element={<ManagerProfile />} />
      <Route
        path="/manager/kot-management"
        element={<ManagerKOTManagement />}
      />


      {/* --------------Temparory Testing Routes--------------- */}
      <Route path="/test" element={<TempTesting />} />
    </Routes>
  );
}

export default AllRoutes;
