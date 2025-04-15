import React from "react";

import { Routes, Route } from "react-router-dom";

import UserHome from "../pages/UserHome";
import AddFeedback from "../pages/Feedback/AddFeedback";
import Pricing from "../pages/Pricing";
import GoToLogins from "../pages/GoToLogins";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      
      <Route path="/feedback/:token" element={<AddFeedback />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/logins" element={<GoToLogins />} />
    </Routes>
  );
}

export default AllRoutes;
