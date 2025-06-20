import React, { useEffect } from "react";
import { useState } from "react";
import Login from "./login";
import Toggle from "./Toggle";

export default function Header({ cartCount }) {
  const increaseCartCount = () => {
    setCartCount(cartCount + 1);
  };
  const [setCartCount] = useState(0);
  const [activeLink, setActiveLink] = useState("");

  const handleClick = (sectionId) => {
    setActiveLink(sectionId); // Set the clicked section as active
  };
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container position-relative d-flex align-items-center justify-content-between">
        <a className="navbar-brand" href="#">
          <img
            src="dist/images/restu-logo.png"
            alt="logo"
            width={100}
            height={90}
          />
        </a>
        <nav id="navmenu" className="navmenu">
          <ul className>
            <li className="current-menu-item">
              <a
                href="#hero"
                className={activeLink === "hero" ? "active" : ""}
                onClick={() => handleClick("hero")}
              >
                HOME
                <br />
              </a>
            </li>
            <li>
              <a
                href="#menu"
                className={activeLink === "menu" ? "active" : ""}
                onClick={() => handleClick("menu")}
              >
                MENU
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={activeLink === "about" ? "active" : ""}
                onClick={() => handleClick("about")}
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="#booktable"
                className={activeLink === "booktable" ? "active" : ""}
                onClick={() => handleClick("booktable")}
              >
                BOOK TABLE
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeLink === "contact" ? "active" : ""}
                onClick={() => handleClick("contact")}
              >
                CONTACT
              </a>
            </li>
            <div className="user_option">
              <Login />
              <div className="box ms-3">{/* <Example /> */}</div>
            </div>
          </ul>
          <Toggle />
        </nav>
        <a className="btn-getstarted" href="#contact">
          Order Online
        </a>
      </div>
    </header>
  );
}
