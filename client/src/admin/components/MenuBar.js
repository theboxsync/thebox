import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MdWorkspacePremium } from "react-icons/md";

import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const MenuBar = () => {
  const { user, activePlans, isLoading } = useContext(AuthContext);

  if (user === null || isLoading) {
    setInterval(() => {
      console.log(user);
      return <Loading />;
    }, 1000);
    
  }

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
                      process.env.REACT_APP_ADMIN_API + "/uploads/" + user?.logo
                    }`}
                    className="img-circle elevation-3"
                    alt="User Image"
                  />
                </div>

                <div className="info">
                  <span style={{ color: "white" }} className="d-block">
                    {user?.name}
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

                {activePlans.includes("Manager") && (
                  <li className="nav-item">
                    <NavLink to={"/inventory"} className="nav-link">
                      <i className="nav-icon fas fa-tag"></i>
                      <p style={{ fontSize: "15px" }}>Inventory</p>
                    </NavLink>
                  </li>
                )}
                {activePlans.includes("Staff Management") && (
                  <li className="nav-item">
                    <NavLink to={"/staff"} className="nav-link">
                      <i className="nav-icon fas fa-user-tie"></i>
                      <p style={{ fontSize: "15px" }}>Staff</p>
                    </NavLink>
                  </li>
                )}
                {activePlans.includes("Feedback") && (
                  <li className="nav-item">
                    <NavLink to={"/feedbacks"} className="nav-link">
                      <i className="nav-icon fa fa-comments"></i>
                      <p style={{ fontSize: "15px" }}>Feedbacks</p>
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink to={"/subscription"} className="nav-link">
                    <MdWorkspacePremium
                      style={{ fontSize: "20px", marginRight: "5px" }}
                    />
                    <p style={{ fontSize: "15px" }}>Subscription</p>
                  </NavLink>
                </li>

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
};

export default MenuBar;
