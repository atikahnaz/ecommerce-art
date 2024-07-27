import Image from "next/image";
import menu from "../../public/images/icon/bx-menu.svg";
import user from "../../public/images/icon/bx-user-circle.svg";
import cart from "../../public/images/icon/bx-cart.svg";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="flex justify-between px-10 py-6">
        <div className="flex items-center">
          <Image src={menu} alt="menu" className="" />
          <div className="pl-4">
            <Link href="/">ART STORE</Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="pr-4">
            <Image src={user} alt="user" />
          </div>
          <div>
            <Image src={cart} alt="cart" />
          </div>
        </div>
      </div>
    </>
  );
}
