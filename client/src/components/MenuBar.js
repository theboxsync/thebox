import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/userdata",
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

  return (
    <div className="menu">
      <div className="menuwapper">
        <aside className="main-sidebar sidebar-dark-secondary elevation-3">
          <NavLink to={"/"} className="brand-link">
            <span
              className="brand-text"
              style={{
                marginLeft: "55px",
                color: "white",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              THE BOX
            </span>
          </NavLink>
          <div className="sidebar">
            <div className="user-panel mt-2 mb-3 d-flex">
              <NavLink
                href="../Profile/"
                className="d-flex align-items-center justify-content-center"
              >
                <div className="image mt-2 mb-2">
                  <img
                    src={`http://localhost:3001${userData.logo}`}
                    className="img-circle elevation-3"
                    alt="User Image"
                  />
                </div>

                <div className="info">
                  <span style={{ color: "white" }} className="d-block">
                    {userData.name}
                  </span>
                </div>
              </NavLink>
            </div>
            <nav className="mt-3">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="true"
              >
                <li className="nav-item">
                  <NavLink to={"/dashboard"} className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p style={{ fontSize: "15px" }}>Dashboard</p>
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink  to={"/statistics"} className="nav-link">
                    <i className="nav-icon fas fa-chart-pie"></i>
                    <p style={{ fontSize: "15px" }}>Statistics</p>
                  </NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink to={"/inventory"} className="nav-link">
                    <i className="nav-icon fas fa-tag"></i>
                    <p style={{ fontSize: "15px" }}>Inventory</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/menu-list"} className="nav-link">
                    <i className="nav-icon fa-solid fa-bars"></i>
                    <p style={{ fontSize: "15px" }}>Menu List</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/orders"} className="nav-link">
                    <i className="nav-icon fas fa-shopping-cart"></i>
                    <p style={{ fontSize: "15px" }}>Orders</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/table-booking"} className="nav-link">
                    <i className="nav-icon fas fa-calendar"></i>
                    <p style={{ fontSize: "15px" }}>Table Booking</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/table-management"} className="nav-link">
                    <i className="nav-icon fas fa-table"></i>
                    <p style={{ fontSize: "15px" }}>Table Management</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/staff"} className="nav-link">
                    <i className="nav-icon fas fa-user-tie"></i>
                    <p style={{ fontSize: "15px" }}>Staff Management</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/kot-management"} className="nav-link">
                    <i className="nav-icon fas fa-chart-pie"></i>
                    <p style={{ fontSize: "15px" }}>KOT Management</p>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
