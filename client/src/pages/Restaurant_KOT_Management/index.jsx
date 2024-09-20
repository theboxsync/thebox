import React, { useState } from "react";
import "../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import ViewKOTs from "../../components/kotManagement/ViewKOTs";

function RestaurantKOTManagement() {
    const [mainSection, setMainSection] = useState("ViewKOTs");

    const displaySection = () => {
      switch (mainSection) {
        case "ViewKOTs":
          return <ViewKOTs />;
        default:
          return null;
      }
    };
  return (
    <div>
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
            {displaySection()}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default RestaurantKOTManagement;
