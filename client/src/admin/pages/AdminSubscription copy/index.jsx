import React from "react";

import "../../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import DashboardSection from "../../components/subscription/DashboardSection";
import AddManager from "../../components/subscription/AddManager";
import AddQSR from "../../components/subscription/AddQSR";
import AddCaptain from "../../components/subscription/AddCaptain";

function AdminSubscription() {
  const [mainSection, setMainSection] = React.useState("DashboardSection");
  const displayMainSection = () => {
    switch (mainSection) {
      case "DashboardSection":
        return <DashboardSection setMainSection={setMainSection} />;
      case "AddManager":
        return <AddManager setMainSection={setMainSection} />;
      case "AddQSR":
        return <AddQSR setMainSection={setMainSection} />;
      case "AddCaptain":
        return <AddCaptain  setMainSection={setMainSection} />;

      default:
        return null;
    }
  };

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

        <div>{displayMainSection()}</div>

        <Footer />
      </div>
    </div>
  );
}

export default AdminSubscription;
