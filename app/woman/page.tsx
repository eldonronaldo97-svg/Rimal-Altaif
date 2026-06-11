import ProductSlider from "@/components/ProductSlider";
import { products } from "@/lib/products";

export default function WomenPage() {
  return (
    <ProductSlider
      title="Women Perfumes"
      products={products.filter(
        (p) => p.category?.toLowerCase() === "women"
      )}
    />
  );
}