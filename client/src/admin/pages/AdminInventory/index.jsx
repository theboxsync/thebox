import React, { useState } from "react";
import "../../../style.css";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import ViewInventory from "../../components/inventory/ViewInventory";
import AddInventory from "../../components/inventory/AddInventory";
import InventoryHistory from "../../components/inventory/InventoryHistory";

export default function AdminInventory() {
  const [section, setSection] = useState("ViewInventory");

  const sectionDisplay = () => {
    console.log(section);
    if (section === "ViewInventory") {
      return <ViewInventory setSection={setSection} />;
    } else if (section === "AddInventory") {
      return <AddInventory setSection={setSection} />;
    } else if (section === "InventoryHistory") {
      return <InventoryHistory setSection={setSection} />;
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
        <div>{sectionDisplay()}</div>

        <Footer />
      </div>
    </div>
  );
}
