"use client";

import Link from "next/link";
import { useLiveInventory } from "@/components/InventoryProvider";
import { useCart } from "../lib/store";

export default function ProductCard({ p }: any) {
  const add = useCart((s) => s.add);
  const liveQuantity = useLiveInventory(p?.id);
  const inStock = typeof liveQuantity === "number" && liveQuantity > 0;
  const inventoryUnavailable = liveQuantity === null || liveQuantity === undefined;

  const handleAdd = () => {
    if (!inStock) return;
    const added = add({ id: String(p.id), name: p.name, image: p.image, price: Number(p.price) });
    if (!added) window.alert(useCart.getState().message);
  };

  return (
    <article className="product-card">
      <Link href={`/product/${p.id}`} className="product-image-link">
        <div className="product-image">
          {liveQuantity === 0 && <span className="sold-out-badge">نفذت الكمية</span>}
          <img src={p.image} alt={p.name} className="product-image-img" />
        </div>
      </Link>
      <div className="product-content">
        <div className="product-brand">{p.brand || "Rimal Altaif"}</div>
        <Link href={`/product/${p.id}`} className="product-name">{p.name}</Link>
        <div className="product-size">{p.size}</div>
        <div className="product-prices">
          <span className="product-price">EGP {Number(p.price).toLocaleString("en-US")}</span>
          {p.oldPrice && Number(p.oldPrice) > Number(p.price) && (
            <span className="product-old-price">EGP {Number(p.oldPrice).toLocaleString("en-US")}</span>
          )}
        </div>
        <button type="button" className="product-btn" disabled={!inStock} onClick={handleAdd}>
          {inventoryUnavailable ? "المخزون غير متاح مؤقتًا" : inStock ? "أضف للسلة" : "نفذت الكمية"}
        </button>
      </div>
    </article>
  );
}
