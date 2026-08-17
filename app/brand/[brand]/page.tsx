import type { Metadata } from "next";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MobileBottomBar from "../../../components/MobileBottomBar";
import ProductCard from "../../../components/ProductCard";

import { products } from "../../../lib/products";

type Props = {
  params: Promise<{ brand: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { brand } = await params;

  const brandName = brand
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const brandProducts = products.filter(
    (p: any) =>
      p.brand &&
      p.brand.toLowerCase().replace(/\s+/g, "-") === brand
  );

  const title = `${brandName} | عطور أصلية | رمال الطائف`;

  const description =
    `اكتشف عطور ${brandName} الأصلية لدى رمال الطائف. ` +
    `تشكيلة من العطور الرجالية والنسائية وعطور للجنسين في مصر.`;

  const url = `https://rimalaltaif.com/brand/${brand}`;

  return {
    title,
    description,

    keywords: [
      brandName,
      `عطور ${brandName}`,
      `${brandName} مصر`,
      `شراء عطور ${brandName}`,
      "رمال الطائف",
      "Rimal Altaif",
      "عطور أصلية",
      "عطور فاخرة",
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "رمال الطائف | Rimal Altaif",
      locale: "ar_EG",
      type: "website",
    },

    robots: {
      index: brandProducts.length > 0,
      follow: true,

      googleBot: {
        index: brandProducts.length > 0,
        follow: true,
      },
    },
  };
}

export default async function BrandPage({
  params,
}: Props) {
  const { brand } = await params;

  const filteredProducts = products
    .filter(
      (p: any) =>
        p.brand &&
        p.brand.toLowerCase().replace(/\s+/g, "-") === brand
    )
    .sort((a: any, b: any) => {
      if (a.stock === b.stock) return 0;
      return a.stock ? -1 : 1;
    });

  return (
    <>
      <Navbar />

      <section className="container">
        <div
          style={{
            padding: "30px 0",
          }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {brand.replace(/-/g, " ")}
          </h1>

          <p
            style={{
              marginTop: 10,
              color: "#666",
            }}
          >
            {filteredProducts.length} Products
          </p>
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
          {filteredProducts.map((p: any) => (
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