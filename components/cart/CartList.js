import { useState } from "react";

export default function CartList({ close }) {
  const [closeCart, setCloseCart] = useState(false);

  const viewCart = () => {
    //setCloseCart(closeCart === false ? true : false);
    close(false);
  };

  return (
    <>
      <div className="w-full absolute border bg-red-300 border-red-700 top-0">
        <div>Cart</div>
        <div onClick={viewCart}>Close</div>
      </div>
    </>
  );
}
