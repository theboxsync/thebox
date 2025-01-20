import React from "react";

import "../../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import SettingsDashboard from "../../components/settings/SettingsDashboard";

function AdminSettings() {
  const [mainSection, setMainSection] = React.useState("SettingsDashboard");
  const displayMainSection = () => {
    switch (mainSection) {
      case "SettingsDashboard":
        return <SettingsDashboard setMainSection={setMainSection} />;
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

        <div>
        {displayMainSection()}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default AdminSettings;
