import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import TableSection from "../../components/dashboard/TableSection";
import AddManager from "../../components/dashboard/AddManager";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");

  const [userData, setUserData] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/userdata`,
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
    console.log(userData);
  }, []);

  
  const [mainSection, setMainSection] = useState("TableSection");

  const displayMainSection = () => {
    switch (mainSection) {
      case "TableSection":
        return (
          <TableSection setMainSection={setMainSection}/>
        );
      case "AddManager":
        return (
          <AddManager setMainSection={setMainSection}/>
        );
      default:
        return null;
    }
  };

  return (
    <div className="wrapper">
      <Navbar />

      <MenuBar />
      <div className="content-wrapper p-2">
        {displayMainSection()}

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Today's Special Menu</h3>
                  </div>
                  <div className="card-body p-0">
                    <ul className="row users-list clearfix">
                      <li className="col-lg-3 col-md-4 col-sm-6 col-12">
                        <img
                          src="../../Logo/GJ0001.webp"
                          style={{
                            borderRadius: "16px 16px 0px 0px",
                            width: "auto",
                            height: "156px",
                          }}
                          alt="Today's Special"
                        />
                        <div className="m-3 text-left">
                          <p className="users-list-name name">Panner Masala</p>
                          <p className="users-list-name number">Price :220₹</p>
                        </div>
                      </li>
                    </ul>
                    {/* <div>{userData._id}</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
