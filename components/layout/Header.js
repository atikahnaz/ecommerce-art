"use client";
import Image from "next/image";
import menu from "../../public/images/icon/bx-menu.svg";
import user from "../../public/images/icon/bx-user-circle.svg";
import cart from "../../public/images/icon/bx-cart.svg";
import Link from "next/link";
import CartList from "../cart/CartList";
import MenuDrop from "./MenuDrop";
import { useContext, useState, useEffect } from "react";
import { CartItems } from "@/context/CartContext";

export default function Header({ className }) {
  const [viewCart, setViewCart] = useState(false);
  const [viewMenu, setViewMenu] = useState(false);
  const { total } = useContext(CartItems);

  const toggleCart = () => {
    setViewCart(viewCart == false ? true : false);
  };

  const closeCart = () => {
    setViewCart(false);
  };

  const closeMenu = () => {
    setViewMenu(false);
  };

  return (
    <>
      <div
        className={`flex justify-between w-screen px-10 py-6 md:py-10 md:pr-16 lg:pr-36 bg-white ${className} `}
      >
        {viewCart && (
          <CartList
            close={closeCart}
            className="w-5/6 absolute top-14 right-1 max-h-[calc(100vh-4rem)]  overflow-y-scroll"
          />
        )}
        <div className="flex items-center space-x-5">
          {viewMenu && <MenuDrop close={closeMenu} className="" />}

          <Image
            onClick={() => setViewMenu(true)}
            src={menu}
            alt="menu"
            className="cursor-pointer md:hidden"
          />
          <div className="hidden md:flex space-x-5 font-medium text-lg">
            <Link href="/collection">
              <div>Collection</div>
            </Link>

            <div>Gallery</div>
          </div>

          <div className="pl-4 md:text-xl">
            <Link href="/">ART STORE</Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="pr-4">
            <Image src={user} alt="user" />
          </div>
          <div className=" relative">
            <Image
              src={cart}
              alt="cart"
              onClick={toggleCart}
              className="cursor-pointer relative"
            />
            {total > 0 && (
              <div className="absolute -top-2 -right-1 text-xs px-1 rounded-full bg-red-300">
                {total}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
