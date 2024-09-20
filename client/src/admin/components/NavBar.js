import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const toggleFullSceen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="Navbar">
      <div className="navbarwrapper">
        <nav className="main-header navbar navbar-expand navbar-white navbar-light justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className="fas fa-bars"></i>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to={"/manager"}
                className="btn btn-secondary nav-link mx-2"
              >
                Manager Panel
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                role="button"
                onClick={() => toggleFullSceen()}
              >
                <i className="fas fa-expand-arrows-alt"></i>
              </a>
            </li>

            <li className="nav-item">
              <Link to={"/logout"} className="nav-link">
                <i className="fas fa-power-off"></i>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link to={"/admin/profile"} className="nav-link">
                <i className="fas fa-user"></i>
              </Link>
              
            </li>
          </ul>{" "}
        </nav>
      </div>
    </div>
  );
}
