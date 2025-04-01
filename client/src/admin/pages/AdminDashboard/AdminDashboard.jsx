import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import DashboardSection from "../../components/dashboard/DashboardSection";
import AddManager from "../../components/dashboard/AddManager";
import AddQSR from "../../components/dashboard/AddQSR";
import AddCaptain from "../../components/dashboard/AddCaptain";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState("");
  const [specialDishes, setSpecialDishes] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/user/userdata`,
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

  const fetchSpecialDishes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/menu/getmenudata`,
        {
          withCredentials: true,
        }
      );

      // Flatten the special dishes into a single array
      const specialDishes = response.data
        .flatMap((category) => category.dishes)
        .filter((dish) => dish.is_special);

      setSpecialDishes(specialDishes);
    } catch (error) {
      console.log("Error fetching special dishes:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchSpecialDishes();
  }, []);

  const [mainSection, setMainSection] = useState("DashboardSection");

  const displayMainSection = () => {
    switch (mainSection) {
      case "DashboardSection":
        return <DashboardSection setMainSection={setMainSection} />;
      case "AddManager":
        return <AddManager setMainSection={setMainSection} />;
      case "AddQSR":
        return <AddQSR setMainSection={setMainSection} />;
      case "AddCaptain":
        return <AddCaptain  setMainSection={setMainSection} />;
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

        <section className="content mb-5" id="viewMenu">
          <div className="container-fluid">
            <div className="row" style={{ borderBottom: "0px" }}>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Special Dishes</h3>
                  </div>
                  <div className="row container-fluid" id="menuData">
                    {specialDishes.map((dish) => (
                      <div key={dish._id} className="col-md-4">
                        <div className="card m-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-9">
                                <b>{dish.dish_name}</b>
                              </div>
                              <div className="col-md-3">{dish.dish_price}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
