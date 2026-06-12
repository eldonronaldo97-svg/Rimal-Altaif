"use client";

import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import BrandSlider from "../components/BrandSlider";
import ProductSlider from "../components/ProductSlider";
import Footer from "../components/Footer";
import MobileBottomBar from "../components/MobileBottomBar";

import {
  products,
  homeBestSellers,
} from "../lib/products";

function sortByStock(items: any[]) {
  return [...items].sort((a, b) => {
    if (a.stock === b.stock) return 0;
    return a.stock ? -1 : 1;
  });
}

export default function Home() {
  const bestSellers = homeBestSellers
    .map((id) =>
      products.find((p) => p.id === id)
    )
    .filter(Boolean);

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
        products={sortByStock(bestSellers)}
      />

      <ProductSlider
        title="Latest Release"
        products={sortByStock(latestProducts)}
      />

      <ProductSlider
        title="Men Perfumes"
        products={sortByStock(
          products.filter(
            (p) => p.category === "Men"
          )
        )}
      />

      <ProductSlider
        title="Women Perfumes"
        products={sortByStock(
          products.filter(
            (p) => p.category === "Women"
          )
        )}
      />

      <ProductSlider
        title="Unisex Perfumes"
        products={sortByStock(
          products.filter(
            (p) => p.category === "Unisex"
          )
        )}
      />

      <ProductSlider
        title="All Products"
        products={sortByStock(featuredProducts)}
      />

      <Footer />

      <MobileBottomBar />
    </>
  );
}