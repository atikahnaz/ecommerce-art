import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  //console.log(products[0]);
  return (
    <>
      <div>
        {/* <p>{products[0].name}</p> */}
        {/* {products.map((product, key) => {
          return <p key={key}>{product.name}</p>;
        })} */}
      </div>

      <div className="flex flex-wrap ">
        {products.map((product, index) => (
          <div key={index} className="w-1/2">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
