import React from "react";
import styled from "styled-components";
import { CartInfo } from "./cartInfo";
import { CartTotals } from "./carttotal";
import { CartTitle } from "./carttitle";
export const CartDetails = ({
  cart,
  cartCountTotal,
  open,
  onClose,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  handleCheckout,
}) => {
  return (
    <OpenWrapper className="OpenWrapper" open={open}>
      <button id="cart-close" onClick={onClose}>
        {" "}
        X{" "}
      </button>
      <Wrapper className="Wrapper">
        {!cart.length && <p>Please add your order</p>}
        {!!cart.length && (
          <>
            <CartTitle />

            <CartInfo
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
            <CartTotals
              cart={cart}
              cartCountTotal={cartCountTotal}
              handleCheckout={handleCheckout}
            />
          </>
        )}
      </Wrapper>
    </OpenWrapper>
  );
};
const OpenWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1090;
  background-color: #fff;
  width: 400px;
  transform: translateX(${({ open }) => (open ? "0px" : "400px")});
  transition: transform 0.5s;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  max-width: 100%;
`;
const Wrapper = styled.div`
  padding: 50px 25px;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;
