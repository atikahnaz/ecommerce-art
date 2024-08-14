import Image from "next/image";
import heroImage from "../public/images/hero-imageheader.jpg";
import pic1 from "../public/images/idea2.jpg";
import pic2 from "../public/images/idea1.jpg";
import ProductList from "@/components/product/ProductList";
import ProductCard from "@/components/product/ProductCard";
import products from "../public/data/products.json";
import Link from "next/link";
import rightArrow from "../public/images/icon/bx-right-arrow-alt.svg";

export default function Home() {
  return (
    <main>
      <div className="relative ">
        {/* <Image src="/images/hero-image.jpg" alt="hero" width={500} height={500} /> */}
        <Image src={heroImage} alt="hero" className="" />
        <div className="absolute  top-1/3 font-medium text-base lg:text-2xl w-1/2 ml-4 lg:ml-8 ">
          <div>Design your room with our collection</div>
          <Link href="/collection">
            <div className="bg-white w-fit my-4 px-4 py-2 rounded-3xl">
              Shop now
            </div>
          </Link>
        </div>
      </div>

      <section id="home-center" className=" ">
        {/* <section id="new-release" className=" my-5">
          <h1 className=" text-lg font-medium py-2 md:text-xl">New Release</h1>
          <div className=" flex flex-wrap justify-between">
            <Image
              src="/images/product/pexels-eberhardgross-2086361.jpg"
              width={250}
              height={250}
              className="pt-5"
            />
            <Image
              src="/images/product/pexels-steve-1045299.jpg"
              width={250}
              height={250}
              className="pt-5"
            />
            <Image
              src="/images/product/pexels-steve-1572386.jpg"
              width={250}
              height={250}
              className="pt-5"
            />
          </div>
        </section> */}

        <section className="my-10">
          <h1 className=" text-lg font-semibold py-2 md:text-xl">
            Ideas For You
          </h1>
          <h4>Frame your space with personalized art.</h4>
          <div className="md:flex mt-5">
            <Image src={pic1} alt="idea1" className="md:w-1/2" />
            <Image src={pic2} alt="idea2" className="md:w-1/2" />
          </div>
        </section>

        <section id="Collection-home">
          <h1 className=" text-lg font-medium py-2 mt-4 md:text-xl">
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
            <div className="flex justify-end pt-4">
              <div className="text-end pr-9">More</div>
              <Image src={rightArrow} alt="more" />
            </div>
          </Link>
        </section>
      </section>
    </main>
  );
}
