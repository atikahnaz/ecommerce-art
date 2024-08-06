"use client";
import Image from "next/image";
import Link from "next/link";
import cartAdd from "../../public/images/icon/bx-cart-add.svg";
import { CartItems } from "@/context/CartContext";
import { useContext } from "react";

export default function ProductCard({ product }) {
  const { addItem } = useContext(CartItems);
  return (
    <>
      <div
        id="card-container"
        className=" px-4 py-6 h-full shadow-lg flex flex-col justify-between"
      >
        <div className="">
          <Link href={`/product/${product.id}`}>
            <Image
              src={`/images/product/${product.image}`}
              width={400}
              height={400}
              alt="test"
              className="object-cover"
            />
          </Link>
        </div>

        <div className="text-sm space-y-2">
          <p className="font-medium">{product.name}</p>
          <div className="flex justify-between">
            <div>
              <p>{product.variations[0].size}</p>
              <p>${product.variations[0].price}</p>
            </div>

            <Image
              src={cartAdd}
              width={20}
              height={20}
              onClick={() => addItem(product, 1, product.variations[0].size)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
