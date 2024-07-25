import Image from "next/image";
import heroImage from "../public/images/hero-image.jpg";

export default function Home() {
  return (
    <main className=" bg-lime-300 border border-red-700  ">
      <div>
        {/* <Image src="/images/hero-image.jpg" alt="hero" width={500} height={500} /> */}
        <Image src={heroImage} alt="hero" />
      </div>

      <div>
        <h1>New Release</h1>
      </div>
    </main>
  );
}
