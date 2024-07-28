import { useContext, useState } from "react";
import { CartItems } from "@/context/CartContext";

export default function CartList({ close, className }) {
  const viewCart = () => {
    close(false);
  };

  //const cartItems = useContext();

  return (
    <>
      <div className={` px-2 py-4 bg-white ${className}`}>
        <div>Cart</div>
        <div onClick={viewCart}>Close</div>
        <div>{useContext(CartItems)}</div>
      </div>
    </>
  );
}
