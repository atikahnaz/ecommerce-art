"use client";
import Image from "next/image";
import data from "../../public/data/products.json";
import { useState, useContext } from "react";
import { CartItems } from "@/context/CartContext";

export default function ProductInformation({ productid }) {
  const [quantity, setQuantity] = useState(1);
  const product = data.find((item) => item.id == productid);
  const { items, addItem } = useContext(CartItems);

  console.log(items[0]);
  //   console.log(product);
  //   console.log(data);

  return (
    <>
      <div className="px-5">
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
        <p>Size</p>
        <p>Quantity</p>
        {/* button for quantity */}
        <div className="flex">
          <div
            onClick={() => {
              setQuantity((prev) => prev + 1);
            }}
          >
            +
          </div>
          <div>{quantity}</div>
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
            -
          </div>
        </div>

        <button
          onClick={() => addItem(product)}
          className="bg-black text-white w-full py-2 rounded-sm"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
