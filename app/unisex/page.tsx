import ProductSlider from "@/components/ProductSlider";
import { products } from "@/lib/products";

export default function UnisexPage() {
  return (
    <ProductSlider
      title="Unisex Perfumes"
      products={products.filter(
        (p) => p.category?.toLowerCase() === "unisex"
      )}
    />
  );
}