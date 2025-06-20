import React from "react";
import { numberFormat } from "./numberFormat";

export const CartTotals = ({
  cart,
  cartCountTotal,
  handleCheckout,
  isCheckingOut,
  checkoutError,
}) => {
  const cartPriceTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-100  p-3">
      <p className="text-end">Total : Rs.{numberFormat(cartPriceTotal)}</p>
      <div className="checkout-container">
        {isCheckingOut ? (
          <div className="loading-spinner">Processing your order...</div>
        ) : (
          <button
            class="btn-buy"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            Checkout
          </button>
        )}
        {checkoutError && <p className="error-message">{checkoutError}</p>}
      </div>
    </div>
  );
};
