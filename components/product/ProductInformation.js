"use client";
import Image from "next/image";
import data from "../../public/data/products.json";
import { useState, useContext, useEffect } from "react";
import { CartItems } from "@/context/CartContext";
import plus from "../../public/images/icon/bx-plus.svg";
import minus from "../../public/images/icon/bx-minus.svg";

export default function ProductInformation({ productid }) {
  const [quantity, setQuantity] = useState(1);
  const product = data.find((item) => item.id == productid);
  const { items, addItem } = useContext(CartItems);
  const [size, setSize] = useState("S");

  useEffect(() => {}, [size]);

  return (
    <>
      <div className="px-5 ">
        <div>
          <Image
            src={`/images/product/${product.image}`}
            width={200}
            height={200}
            alt={product.name}
            className="w-full h-auto py-3"
          />
        </div>

        <h4 className="font-medium text-xl py-2">{product.name}</h4>

        <div>Size</div>
        <div className=""></div>

        {product.variations.map((item) => {
          return (
            <div
              onClick={() => setSize(item.size)}
              className={`flex justify-between w-1/2 border px-3 py-2 rounded my-2 ${
                size == item.size ? "bg-black text-white" : "bg-white"
              }`}
            >
              <div>{item.size}</div>
              <div>{"$ " + item.price}</div>
              {console.log(size)}
            </div>
          );
        })}

        <p className="py-3">Quantity</p>
        {/* button for quantity */}
        <div className="flex border items-center w-full justify-between py-1 rounded px-4">
          <div
            onClick={() => {
              setQuantity((prev) => {
                if (prev === 1) {
                  return 1;
                } else {
                  return prev - 1;
                }
              });
            }}
          >
            <Image src={minus} alt="minus" width={15} height={15} />
          </div>
          <div>{quantity}</div>

          <div
            className=" "
            onClick={() => {
              setQuantity((prev) => prev + 1);
            }}
          >
            <Image src={plus} alt="plus" width={15} height={15} />
          </div>
        </div>

        <button
          onClick={() => {
            addItem(product, quantity, size);
            setQuantity(1);
          }}
          className="bg-black text-white w-full py-2 rounded-sm my-5"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
