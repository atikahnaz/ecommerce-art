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
    <>
      <div className="px-5 pb-4 text-xl">Checkout</div>
      <div className="px-5 pb-4">
        <div>Shipping Information</div>

        {/* shipping form */}
        <div className="space-y-3 py-4">
          <input placeholder="Name" className=" border w-full px-3 py-2" />
          <input placeholder="Address" className=" border w-full px-3 py-2" />
          <input
            placeholder="Postal Code"
            className=" border w-full px-3 py-2"
          />
          <input placeholder="State" className=" border w-full px-3 py-2" />
          <input
            placeholder="Phone Number"
            className=" border w-full px-3 py-2"
          />
        </div>
      </div>

      {/* payment */}
      <div className="px-5 pb-5">
        <div className="py-4">Payment</div>
        <select
          name="payment"
          id="payment"
          className="w-full py-2 border rounded-md"
        >
          <option value="">Please choose payment method</option>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="paypal">Paypal</option>
        </select>
      </div>

      {/* order items */}
      <div className="px-5">
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
          <div className="flex justify-between pr-5">
            <div>Shipping</div>
            <div>Free</div>
          </div>

          <div className="flex justify-between pr-5">
            <div>Grand total</div>
            <div>$ {grandTotal}</div>
          </div>
        </div>
      </div>

      {/* paynow */}
      <div className="bg-black text-white mx-5 px-3 text-center py-2 rounded">
        Pay now
      </div>
    </>
  );
}
