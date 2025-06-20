import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from "react-bootstrap/Offcanvas";

const FixedCart = ({ cartCountTotal, cartItems, onOpen }) => (
  <div onClick={onOpen}>
    <div className="box">
      <div className="cart-count">{cartCountTotal}</div>
      <FontAwesomeIcon icon={faShoppingCart} />
      <i
        className="fa-solid fa-cart-shopping add-cart"
        name="cart"
        id="cart-icon"
      />
    </div>
  </div>
);

export default FixedCart;
