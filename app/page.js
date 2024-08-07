import Image from "next/image";
import heroImage from "../public/images/hero-image.jpg";
import pic1 from "../public/images/pexels-cottonbro-4064835.jpg";
import pic2 from "../public/images/pexels-pnw-prod-8490187.jpg";
import ProductList from "@/components/product/ProductList";
import ProductCard from "@/components/product/ProductCard";
import products from "../public/data/products.json";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        {/* <Image src="/images/hero-image.jpg" alt="hero" width={500} height={500} /> */}
        <Image src={heroImage} alt="hero" />
      </div>

      <section id="home-center" className="px-5">
        <section id="new-release" className=" my-5">
          <h1 className=" text-lg font-medium py-2">New Release</h1>
          <div>
            <Image
              src="/images/product/pexels-eberhardgross-2086361.jpg"
              width={100}
              height={100}
            />
          </div>
        </section>

        <section>
          <h1 className=" text-lg font-medium py-2">Ideas For You</h1>
          <div className="">
            <Image src={pic1} alt="idea1" />
            <Image src={pic2} alt="idea2" />
          </div>
        </section>

        <section id="Collection-home">
          <h1 className=" text-lg font-medium py-2 mt-4">
            <Link href="/collection">Collection</Link>
          </h1>

          <div className="flex justify-between flex-wrap h-full">
            {products.slice(0, 4).map((product, index) => {
              return (
                <div key={index} className="w-1/2 md:w-1/4 pb-5">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
          <Link href="/collection">
            <div className="text-end pr-9">More</div>
          </Link>
        </section>
      </section>
    </main>
  );
}
