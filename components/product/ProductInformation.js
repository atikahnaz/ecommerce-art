import Image from "next/image";
import data from "../../public/data/products.json";

export default function ProductInformation({ productid }) {
  const product = data.find((item) => item.id == productid);
  //   console.log(product);
  //   console.log(data);
  return (
    <>
      <h4>product information {productid}</h4>
      <Image
        src={`/images/product/${product.image}`}
        width={200}
        height={200}
        alt={product.name}
      />
      <p>Size</p>
      <p>Quantity</p>
    </>
  );
}
