import React from "react";
import { numberFormat } from "./numberFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const CartInfo = ({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <>
      {cart.map((item, i) => {
        return (
          <div className="cart-box" key={item.name}>
            {/* Image with fallback */}
            <img
              className="cart-img"
              src={item.src || "/menu photo-2.png"} // Path to image in public folder
              alt={item.name}
            />
            <div className="detail-box">
              <div className="cart-food-title">{item.name}</div>
              <div className="price-box">
                <div className="cart-price">Rs.{numberFormat(item.price)}</div>
                <div className="cart-amt">
                  {/* Display total price for the quantity */}
                  Rs.{numberFormat(item.price * item.quantity)}
                </div>
              </div>
              <div className="quantity-container plus-minus">
                <button
                  id="cart-minus"
                  className="quantity-btn"
                  onClick={() => decreaseQuantity(item)}
                >
                  -
                </button>
                <span className="quantity cart-quantity">{item.quantity}</span>
                <button
                  id="cart-plus"
                  className="quantity-btn"
                  onClick={() => increaseQuantity(item)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Trash icon to remove item */}
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => removeFromCart(item)}
            />
          </div>
        );
      })}
    </>
  );
};
