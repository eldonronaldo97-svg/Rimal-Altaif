import type { Metadata } from "next";
import { products } from "@/lib/products";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "المنتج غير متاح | رمال الطائف",
      description: "المنتج غير متاح حاليًا على رمال الطائف.",
    };
  }

  return {
    title: `${product.name} | ${product.brand} | رمال الطائف`,

    description:
      `${product.name} من ${product.brand} - ${product.size}. ` +
      `متوفر الآن لدى رمال الطائف بسعر ${product.price} جنيه.`,

    keywords: [
      product.name,
      product.brand,
      `${product.name} ${product.brand}`,
      `${product.name} مصر`,
      `شراء ${product.name}`,
      "رمال الطائف",
      "Rimal Altaif",
      "عطور أصلية",
    ],

    alternates: {
      canonical: `https://rimalaltaif.com/product/${product.id}`,
    },

    openGraph: {
      title: `${product.name} | ${product.brand} | رمال الطائف`,
      description:
        `${product.name} من ${product.brand} - متوفر لدى رمال الطائف بسعر ${product.price} جنيه.`,
      url: `https://rimalaltaif.com/product/${product.id}`,
      siteName: "رمال الطائف | Rimal Altaif",
      locale: "ar_EG",
      type: "website",
      images: [
        {
          url: `https://rimalaltaif.com${product.image}`,
          alt: product.name,
        },
      ],
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
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}