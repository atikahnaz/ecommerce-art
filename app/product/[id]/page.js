import ProductInformation from "@/components/product/ProductInformation";

export default function ProductPage({ params }) {
  return (
    <>
      <ProductInformation productid={params.id} />
    </>
  );
}
