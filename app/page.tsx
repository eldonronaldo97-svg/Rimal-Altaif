"use client";

import Navbar from "../components/Navbar";
import WelcomePopup from "@/components/WelcomePopup";
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

function sortLatestProducts(items: any[]) {
  return [...items].sort((a, b) => {
    const aNew = !!a.addedAt;
    const bNew = !!b.addedAt;

    // 1️⃣ المتاح قبل غير المتاح
    if (a.stock !== b.stock) {
      return a.stock ? -1 : 1;
    }

    // 2️⃣ الجديد قبل القديم
    if (aNew !== bNew) {
      return aNew ? -1 : 1;
    }

    // 3️⃣ لو الاتنين جديد:
    // الأحدث بالتاريخ أولاً
    if (aNew && bNew) {
      const dateA = new Date(a.addedAt).getTime();
      const dateB = new Date(b.addedAt).getTime();

      return dateB - dateA;
    }

    // 4️⃣ المنتجات القديمة تحافظ على ترتيبها الأصلي
    return 0;
  });
}

export default function Home() {
  const bestSellers = homeBestSellers
    .map((id) =>
      products.find((p) => p.id === id)
    )
    .filter(Boolean);

  // أحدث الإصدارات:
  // جديد متاح → قديم متاح → جديد غير متاح → قديم غير متاح
  const latestProducts = sortLatestProducts(products).slice(0, 15);

  const featuredProducts =
    products.slice(0, 15);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "رمال الطائف",
    alternateName: "Rimal Altaif",
    url: "https://rimalaltaif.com",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <WelcomePopup />

      <Navbar />

      <HeroSlider />

      <BrandSlider />

      <ProductSlider
        title="الأكثر مبيعًا"
        products={sortByStock(bestSellers)}
      />

      <ProductSlider
        title="أحدث الإصدارات"
        products={latestProducts}
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
        title="عطور نسائي"
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
        title="جميع المنتجات"
        products={sortByStock(featuredProducts)}
      />

      <Footer />

      <MobileBottomBar />
    </>
  );
}