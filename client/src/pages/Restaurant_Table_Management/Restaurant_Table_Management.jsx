import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import ViewTables from "../../components/tableManagement/ViewTables";
import AddTable from "../../components/tableManagement/AddTable";

export default function TableManagement() {
  const navigate = useNavigate();
  const [section, setSection] = useState("ViewTables");

  const sectionDisplay = () => {
    switch (section) {
      case "ViewTables":
        return <ViewTables setSection={setSection} />;
      case "AddTable":
        return <AddTable setSection={setSection} />;
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
        <Header />

        <div>{sectionDisplay()}</div>
        

        <Footer />
      </div>
    </div>
  );
}
