import ProductSlider from "@/components/ProductSlider";
import { products } from "@/lib/products";

export default function MenPage() {
  return (
    <ProductSlider
      title="Men Perfumes"
      products={products.filter(
        (p) => p.category?.toLowerCase() === "men"
      )}
    />
  );
}