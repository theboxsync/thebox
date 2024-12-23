import React, { useState } from "react";
import "../../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import ViewMenu from "../../components/manageMenu/ViewMenu";
import AddMenu from "../../components/manageMenu/AddMenu";

export default function AdminManageMenu() {
  const [section, setSection] = useState("ViewMenu");

  const sectionDisplay = () => {
    console.log(section);
    if (section === "ViewMenu") {
      return <ViewMenu setSection={setSection} />;
    } else if (section === "AddMenu") {
      return <AddMenu setSection={setSection} />;
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
          {sectionDisplay()}
        </div>
        <Footer />
      </div>
    </div>
  );
}
