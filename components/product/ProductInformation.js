import Image from "next/image";
import data from "../../public/data/products.json";

export default function ProductInformation({ productid }) {
  const product = data.find((item) => item.id == productid);
  //   console.log(product);
  //   console.log(data);
  return (
    <>
      <div className="px-5">
        <div>
          <Image
            src={`/images/product/${product.image}`}
            width={200}
            height={200}
            alt={product.name}
            className="w-full h-auto py-3"
          />
        </div>

        <h4 className="font-medium text-xl py-2">{product.name}</h4>
        <p>Size</p>
        <p>Quantity</p>
        <button className="bg-black text-white w-full py-2 rounded-sm">
          Add to cart
        </button>
      </div>
    </>
  );
}
