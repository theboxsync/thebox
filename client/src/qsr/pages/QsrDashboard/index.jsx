import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import DashboardSection from "../../components/dashboard/DashboardSection";
import OrderSection from "../../components/dashboard/OrderSection";

export default function QsrDashboard() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [userData, setUserData] = useState("");

  const [orderType, setOrderType] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QSR_API}/userdata`,
        {
          withCredentials: true,
        }
      );
      if (response.data === "Null") {
        navigate("/login");
      } else {
        setUserData(response.data);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const [mainSection, setMainSection] = useState("DashboardSection");
  const [tableId, setTableId] = useState("");

  const displayMainSection = () => {
    switch (mainSection) {
      case "DashboardSection":
        return (
          <DashboardSection
            setMainSection={setMainSection}
            setTableId={setTableId}
            setOrderId={setOrderId}
            setOrderType={setOrderType}
          />
        );
      case "OrderSection":
        return (
          <OrderSection
            setMainSection={setMainSection}
            tableId={tableId}
            orderId={orderId}
            setOrderId={setOrderId}
            setTableId={setTableId}
            orderType={orderType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="wrapper" style={{ overflow: "hidden" }}>
      <Navbar />

      <MenuBar />
      <div className="content-wrapper p-2">
        {displayMainSection()}
        <Footer />
      </div>
    </div>
  );
}
