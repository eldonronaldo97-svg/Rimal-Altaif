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
        title="الأكثر مبيعًا"
        products={sortByStock(bestSellers)}
      />

      <ProductSlider
        title="أحدث الإصدارات"
        products={sortByStock(latestProducts)}
      />

      <ProductSlider
        title="عطور رجالي"
        products={sortByStock(
          products.filter(
            (p) => p.category === "Men"
          )
        )}
      />

      <ProductSlider
        title="عطور حريمي"
        products={sortByStock(
          products.filter(
            (p) => p.category === "Women"
          )
        )}
      />

      <ProductSlider
        title="عطور للجنسين"
        products={sortByStock(
          products.filter(
            (p) => p.category === "Unisex"
          )
        )}
      />

      <ProductSlider
        title="جميع العطور"
        products={sortByStock(featuredProducts)}
      />

      <Footer />

      <MobileBottomBar />
    </>
  );
}