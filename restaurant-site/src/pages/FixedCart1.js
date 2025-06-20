import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
export const FixedCart = ({ cartItems, onOpen }) => (
  <div className="sticky-top container" onClick={onOpen}>
    <div className="fixedcart d-xl-block ">
      <div className="box">
        <div className="cart-count">{cartItems || 0}</div>
        <FontAwesomeIcon icon={faShoppingCart} />
        <i
          className="fa-solid fa-cart-shopping add-cart"
          name="cart"
          id="cart-icon"
        />
      </div>
    </div>
  </div>
);
