import Image from "next/image";
import menu from "../../public/images/icon/bx-menu.svg";
import user from "../../public/images/icon/bx-user-circle.svg";
import cart from "../../public/images/icon/bx-cart.svg";

export default function Header() {
  return (
    <>
      <div className="flex justify-between px-10 py-6">
        <div className="flex items-center">
          <Image src={menu} alt="menu" />
          <div>ART STORE</div>
        </div>
        <div className="flex items-center">
          <Image src={user} alt="user" />
          <Image src={cart} alt="cart" />
        </div>
      </div>
    </>
  );
}
