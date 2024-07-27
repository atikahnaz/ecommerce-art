import Image from "next/image";
import testimg from "../../public/images/product/pexels-didsss-2911521.jpg";

export default function ProductCard({ product }) {
  return (
    <>
      <div className=" bg-slate-400">
        <Image
          src={`/images/product/${product.image}`}
          width={200}
          height={200}
          alt="test"
        />
      </div>

      <p>{product.name}</p>
      <p>${product.variations[0].price}</p>
    </>
  );
}
