"use client";
import Image from "next/image";
import data from "../../public/data/products.json";
import { useState } from "react";

export default function ProductInformation({ productid }) {
  const [quantity, setQuantity] = useState(0);
  const product = data.find((item) => item.id == productid);
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
                if (prev === 0) {
                  return 0;
                } else {
                  return prev - 1;
                }
              });
            }}
          >
            -
          </div>
        </div>

        <button className="bg-black text-white w-full py-2 rounded-sm">
          Add to cart
        </button>
      </div>
    </>
  );
}
