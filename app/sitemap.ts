import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const uniqueProducts = Array.from(
    new Map(
      products.map((product) => [product.id, product])
    ).values()
  );

  const productUrls: MetadataRoute.Sitemap =
    uniqueProducts.map((product) => ({
      url: `https://rimalaltaif.com/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [
    {
      url: "https://rimalaltaif.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    ...productUrls,
  ];
}