import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ViewOrder from "../../components/orders/ViewOrder";
import AddOrder from "../../components/orders/AddOrder";
import OrderHistory from "../../components/orders/OrderHistory";

export default function RestaurantOrder() {
  const navigate = useNavigate();
  const [section, setSection] = useState("ViewOrder");

  const sectionDisplay = () => {
    switch (section) {
      case "ViewOrder":
        return <ViewOrder setSection={setSection} />;
      case "AddOrder":
        return <AddOrder setSection={setSection} />;
      case "OrderHistory":
        return <OrderHistory setSection={setSection} />;
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
        <div>
          {sectionDisplay()}
        </div>
        <Footer />
        
      </div>
    </div>
  );
}
