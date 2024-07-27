import Image from "next/image";
import Link from "next/link";
import testimg from "../../public/images/product/pexels-didsss-2911521.jpg";

export default function ProductCard({ product }) {
  return (
    <>
      <div className=" bg-slate-400">
        <Link href={`/product/${product.id}`}>
          <Image
            src={`/images/product/${product.image}`}
            width={200}
            height={200}
            alt="test"
          />
        </Link>
      </div>

      <p>
        {product.name}, {product.id}
      </p>
      <p>${product.variations[0].price}</p>
    </>
  );
}
