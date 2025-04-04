import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdWorkspacePremium, MdFastfood } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";

export default function MenuBar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [userSubscription, setUserSubscription] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState([]);

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

  const fetchData = async () => {
    try {
      const [plansResponse, userSubscriptionResponse] = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_ADMIN_API}/subscription/getsubscriptionplans`,
          { withCredentials: true }
        ),
        axios.get(
          `${process.env.REACT_APP_ADMIN_API}/subscription/getusersubscriptioninfo`,
          { withCredentials: true }
        ),
      ]);

      const plans = plansResponse.data;
      setSubscriptionPlans(plans);

      let activePlans = []; // To store all active subscriptions

      const enrichedSubscriptions = userSubscriptionResponse.data.map(
        (subscription) => {
          const plan = plans.find((plan) => plan._id === subscription.plan_id);
          if (plan) {
            activePlans.push(plan.plan_name); // Store active subscriptions
          }
          return {
            ...subscription,
            is_addon: plan?.is_addon || false,
            plan_name: plan ? plan.plan_name : "Unknown Plan",
          };
        }
      );

      setActiveSubscription(activePlans); // Update state with all active subscriptions
      console.log("Active Subscriptions", activePlans);

      setUserSubscription(enrichedSubscriptions);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
                    src={`${
                      process.env.REACT_APP_ADMIN_API +
                      "/uploads/" +
                      userData.logo
                    }`}
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
                <li className="nav-item">
                  <NavLink to={"/order-history"} className="nav-link">
                    <i className="nav-icon fas fa-shopping-cart"></i>
                    <p style={{ fontSize: "15px" }}>Order History</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/table-management"} className="nav-link">
                    <i className="nav-icon fas fa-table"></i>
                    <p style={{ fontSize: "15px" }}>Table Management</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/manage-menu"} className="nav-link">
                    <i className="nav-icon fas fa-solid fa-bars"></i>
                    <p style={{ fontSize: "15px" }}>Manage Menu</p>
                  </NavLink>
                </li>

                {activeSubscription.includes("Manager") && (
                  <li className="nav-item">
                    <NavLink to={"/inventory"} className="nav-link">
                      <i className="nav-icon fas fa-tag"></i>
                      <p style={{ fontSize: "15px" }}>Inventory</p>
                    </NavLink>
                  </li>
                )}
                {activeSubscription.includes("Manager") && (
                  <li className="nav-item">
                    <NavLink to={"/staff"} className="nav-link">
                      <i className="nav-icon fas fa-user-tie"></i>
                      <p style={{ fontSize: "15px" }}>Staff</p>
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink to={"/feedbacks"} className="nav-link">
                    <i className="nav-icon fa fa-comments"></i>
                    <p style={{ fontSize: "15px" }}>Feedbacks</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/subscription"} className="nav-link">
                    <MdWorkspacePremium
                      style={{ fontSize: "20px", marginRight: "5px" }}
                    />
                    <p style={{ fontSize: "15px" }}>Subscription</p>
                  </NavLink>
                </li>
                {activeSubscription.includes("Manager") && (
                  <li className="nav-item">
                    <NavLink to={"/manage-manager"} className="nav-link">
                      <GrUserManager
                        style={{ fontSize: "20px", marginRight: "5px" }}
                      />
                      <p style={{ fontSize: "15px" }}>Manage Manager</p>
                    </NavLink>
                  </li>
                )}
                {activeSubscription.includes("QSR") && (
                  <li className="nav-item">
                    <NavLink to={"/manage-qsr"} className="nav-link">
                      <MdFastfood
                        style={{ fontSize: "20px", marginRight: "5px" }}
                      />
                      <p style={{ fontSize: "15px" }}>Manage QSR</p>
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink to={"/settings"} className="nav-link">
                    <i className="nav-icon fa fa-cog"></i>
                    <p style={{ fontSize: "15px" }}>Settings</p>
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
