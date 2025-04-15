import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../../style.css";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import ViewStaff from "../../components/staff/ViewStaff";
import AddStaff from "../../components/staff/AddStaff";

import { AuthContext } from "../../context/AuthContext";

export default function AdminStaff() {
  const navigate = useNavigate();
  const [section, setSection] = useState("ViewStaff");
  const { activePlans, userSubscriptions } = useContext(AuthContext);

  const displaySection = () => {
    switch (section) {
      case "ViewStaff":
        return <ViewStaff setSection={setSection} />;
      case "AddStaff":
        return <AddStaff setSection={setSection} />;
      default:
        break;
    }
  };

  useEffect(() => {
    if (userSubscriptions.length > 0) {
      const hasStaffPlan = userSubscriptions.some(
        (subscription) =>
          subscription.plan_name === "Staff Management" && activePlans.includes("Staff Management")
      );

      if (!hasStaffPlan) {
        alert("You need to buy or renew to Staff Management plan to access this page.");
        navigate("/subscription");
        return;
      }
    } 
  }, [activePlans, userSubscriptions]);
  return (
    <div className="wrapper">
      <Navbar />
      <MenuBar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2"></div>
          </div>
        </div>

        {displaySection()}

        <Footer />
      </div>
    </div>
  );
}
