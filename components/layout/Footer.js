import Image from "next/image";
import whatsapp from "../../public/images/icon/bxl-whatsapp.svg";
import twitter from "../../public/images/icon/bxl-twitter.svg";
import instagram from "../../public/images/icon/bxl-instagram.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="py-5 ">
      <div className="flex px-5 py-8 justify-between">
        <h1>ART STORE</h1>
        <div className="flex space-x-2">
          <Image src={whatsapp} alt="whatsapp" />
          <Image src={twitter} alt="twitter" />
          <Image src={instagram} alt="instagram" />
        </div>
      </div>

      <Link href="/AboutUs">
        <div className="px-5 text-sm">
          <h6>About Us</h6>
          <h6>Terms and Conditions</h6>
          <h6>Shipment</h6>
          <h6>Order</h6>
          <h6>Contact Us</h6>
        </div>
      </Link>
    </div>
  );
}
