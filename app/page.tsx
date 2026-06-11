"use client";

import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import BrandSlider from "../components/BrandSlider";
import ProductSlider from "../components/ProductSlider";
import Footer from "../components/Footer";
import MobileBottomBar from "../components/MobileBottomBar";

import { products } from "../lib/products";

export default function Home() {
  const bestSellers = products.filter(
    (p) => p.bestSeller
  );

  const latestProducts = [...products]
    .reverse()
    .slice(0, 15);

  const featuredProducts =
    products.slice(0, 15);

  return (
    <>
      <Navbar />

      <HeroSlider />

      <BrandSlider />

      <ProductSlider
        title="Best Selling"
        products={bestSellers}
      />

      <ProductSlider
        title="Latest Release"
        products={latestProducts}
      />

      <ProductSlider
  title="Men Perfumes"
  products={products.filter(
    (p) => p.category === "Men"
  )}
/>

<ProductSlider
  title="Women Perfumes"
  products={products.filter(
    (p) => p.category === "Women"
  )}
/>

<ProductSlider
  title="Unisex Perfumes"
  products={products.filter(
    (p) => p.category === "Unisex"
  )}
/>

      <ProductSlider
        title="All Products"
        products={featuredProducts}
      />

      <Footer />

      <MobileBottomBar />
    </>
  );
}