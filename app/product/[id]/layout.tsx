import type { Metadata } from "next";
import { products } from "@/lib/products";

type Props = {
  params: Promise<{ id: string }>;
};

const SITE_URL = "https://rimalaltaif.com";

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function brandSlug(brand: string) {
  return brand.trim().toLowerCase().replace(/\s+/g, "-");
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "المنتج غير متاح | رمال الطائف",
      description: "المنتج غير متاح حاليًا على رمال الطائف.",
      robots: {
        index: false,
        follow: true,
      },
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
      canonical: `${SITE_URL}/product/${product.id}`,
    },

    openGraph: {
      title: `${product.name} | ${product.brand} | رمال الطائف`,
      description:
        `${product.name} من ${product.brand} - متوفر لدى رمال الطائف بسعر ${product.price} جنيه.`,
      url: `${SITE_URL}/product/${product.id}`,
      siteName: "رمال الطائف | Rimal Altaif",
      locale: "ar_EG",
      type: "website",

      images: [
        {
          url: absoluteUrl(product.image),
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

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return children;
  }

  const productUrl = `${SITE_URL}/product/${product.id}`;

  const brandUrl = `${SITE_URL}/brand/${brandSlug(product.brand)}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,

    image: [absoluteUrl(product.image)],

    description:
      `${product.name} من ${product.brand} - ${product.size}. ` +
      `متوفر لدى رمال الطائف.`,

    brand: {
      "@type": "Brand",
      name: product.brand,
    },

    category: product.category,

    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "EGP",
      price: Number(product.price),

      availability: product.stock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: SITE_URL,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: product.brand,
        item: brandUrl,
      },

      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      {children}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}