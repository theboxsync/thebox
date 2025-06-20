import React from "react";

// CheckoutDetails Component
const CheckoutDetails = ({ cart, onCheckout, cartTotalPrice }) => {
  return (
    <div className="checkout-details">
      <h2>Review Your Order</h2>
      <div className="checkout-items">
        {cart.length === 0 ? (
          <p>Your cart is empty. Please add some items.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="checkout-item">
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <p>Total: ${item.price * item.quantity}</p>
            </div>
          ))
        )}
      </div>

      <div className="checkout-total">
        <p>
          <strong>Total Price: </strong>${cartTotalPrice}
        </p>
      </div>

      <button onClick={onCheckout}>Proceed to Payment</button>
    </div>
  );
};
