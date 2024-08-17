//import data from public/data
// use data into component ProductList

import ProductList from "../../components/product/ProductList";
import products from "../../public/data/products.json";

export default function Collection() {
  return (
    <>
      <div className="px-5">
        <h1 className=" lg:px-5">Collection</h1>
        <ProductList products={products} />
      </div>
    </>
  );
}
