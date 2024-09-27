import React from "react";

import { Routes, Route } from "react-router-dom";

import UserHome from "../UserHome";
import Login from "../Login";
import Register from "../Register";
import Logout from "../components/Logout";
import ForgotPassword from "../ForgotPassword";
import OtpVerification from "../OtpVerification";
import ChangePassword from "../ChangePassword";
import RegistrationComplete from "../RegistrationComplete";



function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/registration-complete" element={<RegistrationComplete />} />

    </Routes>
  );
}

export default AllRoutes;
