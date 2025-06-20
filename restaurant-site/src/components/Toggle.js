import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Login from "./login.js";

function Toggle() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FontAwesomeIcon
        icon={faAlignJustify}
        onClick={handleShow}
        className="mobile-nav-toggle d-xl-none bi bi-list"
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{ borderBottom: "none" }}
          closeButton
        ></Modal.Header>
        <Modal.Body style={{ padding: "0" }}>
          {" "}
          <nav className="navmenu mobile-nav-active">
            <ul className>
              <li className="current-menu-item">
                <a href="#hero" className="active">
                  HOME
                  <br />
                </a>
              </li>
              <li>
                <a href="#menu">MENU</a>
              </li>
              <li>
                <a href="#about">ABOUT</a>
              </li>
              <li>
                <a href="#booktable">BOOK TABLE</a>
              </li>
              <li>
                <a href="#contact">CONTACT</a>
              </li>
              <div className="user_option">
                <Login />
                <div className="box">
                  <div className="cart-count">0</div>
                  <ion-icon />
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <i
                    className="fa-solid fa-cart-shopping add-cart"
                    name="cart"
                    id="cart-icon"
                  />
                </div>
                <div className="cart d-none">
                  <div className="cart-title">Cart Items</div>
                  <div className="cart-content"></div>
                  <div className="total">
                    <div className="total-title">Total</div>
                    <div className="total-price">Rs.0</div>
                  </div>
                  <a href="#" id="login_details">
                    <button className="btn-buy">CHECKOUT</button>
                  </a>
                  <i
                    className="fa-solid fa-xmark"
                    name="close"
                    id="cart-close"
                  />
                  <ion-icon />
                </div>
              </div>
            </ul>
          </nav>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Toggle;
