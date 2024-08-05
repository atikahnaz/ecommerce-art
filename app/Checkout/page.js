"use client";
import { CartItems } from "@/context/CartContext";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";

export default function Checkout() {
  const { items } = useContext(CartItems);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    items.map((item) => {
      item.variations.map((variation) => {
        if (variation.quantity) {
          total += variation.price * variation.quantity;
        }
      });
    });
    console.log(total);
    setGrandTotal(total);
  }, [items]);

  return (
    <div className="px-5">
      <div>Checkout</div>
      <div className="flex justify-between pr-5">
        <div>Items</div>
        <div>Total</div>
      </div>

      {items.map((item, index) => {
        return item.variations.map((variation) => {
          if (variation.quantity) {
            return (
              <div className="flex py-4 border-b">
                <div className="">
                  <Image
                    src={`/images/product/${item.image}`}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="px-4 text-sm">
                  <div>{item.name}</div>
                  <div>{variation.size}</div>
                  <div>Quantity: {variation.quantity}</div>
                  <div>Price: $ {variation.price}</div>
                </div>
                <div
                  id="totalpriceitem"
                  className="flex flex-1 justify-end pr-5"
                >
                  $ {variation.price * variation.quantity}
                </div>
              </div>
            );
          }
        });
      })}
      <div className="py-5 space-y-3">
        <div>Shipping</div>
        <div className="flex justify-between pr-5">
          <div>Grand total</div>
          <div>$ {grandTotal}</div>
        </div>
      </div>
    </div>
  );
}
