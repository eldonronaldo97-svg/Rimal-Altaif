import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";

import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "أحدث الإصدارات | عطور جديدة | رمال الطائف",

  description:
    "اكتشف أحدث إصدارات العطور لدى رمال الطائف. عطور جديدة رجالية ونسائية وعطور للجنسين في مصر.",

  keywords: [
    "أحدث العطور",
    "عطور جديدة",
    "أحدث إصدارات العطور",
    "عطور رجالي جديدة",
    "عطور نسائي جديدة",
    "رمال الطائف",
    "Rimal Altaif",
    "عطور أصلية",
  ],

  alternates: {
    canonical: "https://rimalaltaif.com/latest-release",
  },

  openGraph: {
    title: "أحدث الإصدارات | رمال الطائف",
    description:
      "اكتشف أحدث إصدارات العطور لدى رمال الطائف.",
    url: "https://rimalaltaif.com/latest-release",
    siteName: "رمال الطائف | Rimal Altaif",
    locale: "ar_EG",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function LatestReleasePage() {
  // ترتيب المنتجات:
  // 1️⃣ جديد + متاح
  // 2️⃣ قديم + متاح
  // 3️⃣ جديد + غير متاح
  // 4️⃣ قديم + غير متاح

  const sortedProducts = [...products].sort((a: any, b: any) => {
    const aNew = !!a.addedAt;
    const bNew = !!b.addedAt;

    // المتاح أولاً
    if (a.stock !== b.stock) {
      return a.stock ? -1 : 1;
    }

    // الجديد قبل القديم
    if (aNew !== bNew) {
      return aNew ? -1 : 1;
    }

    // لو الاتنين جديد:
    // الأحدث بالتاريخ أولاً
    if (aNew && bNew) {
      const dateA = new Date(a.addedAt).getTime();
      const dateB = new Date(b.addedAt).getTime();

      return dateB - dateA;
    }

    // المنتجات القديمة:
    // الحفاظ على ترتيبها الأصلي
    return 0;
  });

  // نضمن إن المنتجات الجديدة لها الأولوية
  // قبل تطبيق حد الـ 50 منتج
  const newAvailable = sortedProducts.filter(
    (p: any) => p.addedAt && p.stock
  );

  const oldAvailable = sortedProducts.filter(
    (p: any) => !p.addedAt && p.stock
  );

  const newUnavailable = sortedProducts.filter(
    (p: any) => p.addedAt && !p.stock
  );

  const oldUnavailable = sortedProducts.filter(
    (p: any) => !p.addedAt && !p.stock
  );

  const finalProducts = [
    ...newAvailable,
    ...oldAvailable,
    ...newUnavailable,
    ...oldUnavailable,
  ].slice(0, 50);

  return (
    <>
      <Navbar />

      <section className="container">
        <div style={{ padding: "30px 0" }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            أحدث الأصدارات
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(160px,1fr))",
            gap: 12,
            paddingBottom: 30,
          }}
        >
          {finalProducts.map((p: any) => (
            <ProductCard
              key={p.id}
              p={p}
            />
          ))}
        </div>
      </section>

      <Footer />
      <MobileBottomBar />
    </>
  );
}