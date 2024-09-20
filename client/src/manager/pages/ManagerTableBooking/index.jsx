import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../../style.css";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import ViewBooking from "../../components/tableBooking/ViewBooking";
import AddBooking from "../../components/tableBooking/AddBooking";
import BookingRequests from "../../components/tableBooking/BookingRequests";

export default function ManagerTableBooking() {
  const navigate = useNavigate();
  const [section, setSection] = useState("ViewBooking");

  const sectionDisplay = () => {
    switch (section) {
      case "ViewBooking":
        return <ViewBooking setSection={setSection} />;
      case "AddBooking":
        return <AddBooking setSection={setSection} />;
      case "BookingRequests":
        return <BookingRequests setSection={setSection} />;
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
