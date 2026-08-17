import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const SITE_URL = "https://rimalaltaif.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const uniqueProducts = Array.from(
    new Map(
      products.map((product) => [product.id, product])
    ).values()
  );

  const uniqueBrands = Array.from(
    new Set(
      products
        .map((product) => product.brand)
        .filter(Boolean)
        .map((brand) =>
          brand.trim().toLowerCase().replace(/\s+/g, "-")
        )
    )
  );

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/men`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/women`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/unisex`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/best-sellers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/latest-release`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const brandPages: MetadataRoute.Sitemap =
    uniqueBrands.map((brand) => ({
      url: `${SITE_URL}/brand/${brand}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const productPages: MetadataRoute.Sitemap =
    uniqueProducts.map((product) => ({
      url: `${SITE_URL}/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [
    ...staticPages,
    ...brandPages,
    ...productPages,
  ];
}