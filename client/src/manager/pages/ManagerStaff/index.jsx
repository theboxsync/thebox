import React, { useState } from "react";
import "../../../style.css";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import ViewStaff from "../../components/staff/ViewStaff";
import AddStaff from "../../components/staff/AddStaff";

export default function ManagerStaff() {
    const [section, setSection] = useState("ViewStaff");

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
