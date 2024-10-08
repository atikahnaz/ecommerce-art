"use client";
import { useContext, useState } from "react";
import { CartItems } from "@/context/CartContext";
import { UserContext } from "@/context/AuthContext";
import Image from "next/image";
import x from "../../public/images/icon/bx-x.svg";
import Link from "next/link";

export default function CartList({ close, className }) {
  const { items, removeitem, clearcart, addItem, removefromcart, total } =
    useContext(CartItems);

  const viewCart = () => {
    close(false);
  };

  const { user } = useContext(UserContext);

  //const cartItems = useContext();

  return (
    <>
      {user ? console.log("user login") : console.log("not login")}
      <div
        className={` shadow-lg pt-4 bg-slate-50 md:w-1/2 lg:w-1/3 z-20  ${className}`}
      >
        <div className="flex justify-between items-center ">
          <div className="py-4 px-4 font-semibold text-lg">Cart</div>
          <div className="cursor-pointer" onClick={viewCart}>
            <Image src={x} alt="close" width={20} height={20} />
          </div>
        </div>

        <div className="px-4 space-y-4 mb-4 ">
          {items.length > 0
            ? items.map((item, index) =>
                item.variations.map((variation, index) => {
                  if (variation.quantity) {
                    return (
                      <div key={index} className="flex ">
                        <Image
                          src={`/images/product/${item.image}`}
                          width={150}
                          height={150}
                          alt={item.name}
                          className="pb-4"
                        />

                        <div className="px-4 w-2/3 flex flex-col">
                          <div className="w-full  py-2">
                            <div className=" text-lg font-medium" key={index}>
                              {item.name}
                            </div>
                            <div className="pt-2">{variation.size}</div>
                            <div>$ {variation.price}</div>
                          </div>

                          {/* button to edit quantity */}
                          <div className="flex justify-between w-full border cursor-pointer">
                            <div
                              onClick={() =>
                                removeitem(item, 1, variation.size)
                              }
                            >
                              {" "}
                              -{" "}
                            </div>
                            <div>{variation.quantity}</div>
                            <div
                              onClick={() => addItem(item, 1, variation.size)}
                            >
                              {" "}
                              +{" "}
                            </div>
                          </div>

                          {/* remove from cart */}
                          <div
                            className=" flex-1 content-end text-end pt-2 text-sm cursor-pointer"
                            onClick={() => removefromcart(item, variation.size)}
                          >
                            Remove
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              )
            : "Your cart is empty"}

          {/* {items.length > 0
            ? items.map((item, index) => (
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
                    <div>Size</div> */}

          {/* button to edit quantity */}
          {/* <div className="flex space-x-2">
                      <div onClick={() => removeitem(item)}> - </div>
                      <div>{item.quantity}</div>
                      <div onClick={() => addItem(item, 1)}> + </div>
                    </div> */}

          {/* remove from cart */}
          {/* <div onClick={() => removefromcart(item)}>Remove</div>
                  </div>
                </div>
              ))
            : "Your cart is empty"} */}
        </div>
        <div className=" px-4 py-4  bg-white w-full sticky bottom-0">
          {total > 0 && (
            <>
              <div className="cursor-pointer" onClick={() => clearcart()}>
                Clear Cart
              </div>

              <Link href="/checkout-profile">
                <div
                  className="bg-black mt-5 text-white text-center py-2 rounded-md"
                  onClick={viewCart}
                >
                  Checkout
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
