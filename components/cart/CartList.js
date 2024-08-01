import { useContext, useState } from "react";
import { CartItems } from "@/context/CartContext";
import Image from "next/image";
import x from "../../public/images/icon/bx-x.svg";

export default function CartList({ close, className }) {
  const { items, removeitem, clearcart, addItem, removefromcart } =
    useContext(CartItems);
  const viewCart = () => {
    close(false);
  };

  //const cartItems = useContext();

  return (
    <>
      <div className={` px-4 py-4 bg-white ${className}`}>
        <div className="flex justify-between items-center">
          <div className="py-4">Cart</div>
          <div className="" onClick={viewCart}>
            <Image src={x} alt="close" width={20} height={20} />
          </div>
        </div>

        <div className=" space-y-4 mb-4">
          {items.map((item, index) => (
            <div className="flex border-b-2 ">
              <Image
                src={`/images/product/${item.image}`}
                width={100}
                height={100}
                alt={item.name}
                className="pb-4"
              />
              <div className="w-full pl-4 py-2">
                <div className=" text-lg font-medium" key={index}>
                  {item.name}
                </div>
                <div>Size</div>

                {/* button to edit quantity */}
                <div className="flex space-x-2">
                  <div onClick={() => removeitem(item)}> - </div>
                  <div>{item.quantity}</div>
                  <div onClick={() => addItem(item, 1)}> + </div>
                </div>

                {/* remove from cart */}
                <div onClick={() => removefromcart(item)}>Remove</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-red-300 ">
          <div onClick={() => clearcart()}>Clear Cart</div>
          <div>Checkout</div>
        </div>
      </div>
    </>
  );
}
