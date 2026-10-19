
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../lib/store";

export default function ProductCard({ p }: any) {
  const add = useCart((s) => s.add);

  // null means inventory has not loaded yet.
  const [liveQuantity, setLiveQuantity] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    async function loadInventory() {
      try {
        const response = await fetch("/api/inventory", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Inventory request failed");
        }

        const data = await response.json();

        if (!data?.success || !Array.isArray(data.products)) {
          throw new Error("Invalid inventory response");
        }

        const product = data.products.find(
          (item: any) => String(item.id) === String(p.id)
        );

        if (active && product) {
          setLiveQuantity(Math.max(0, Number(product.quantity) || 0));
        }
      } catch (error) {
        console.error("Could not load live inventory:", error);
      }
    }

    loadInventory();

    return () => {
      active = false;
    };
  }, [p.id]);

  // Don't allow adding to cart until the live quantity is known.
  const inStock = liveQuantity !== null && liveQuantity > 0;

  const handleAdd = () => {
    if (!inStock) return;

    const added = add({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
    });

    if (!added) window.alert(useCart.getState().message);
  };

  return (
    <article className="product-card">
      <Link href={`/product/${p.id}`} className="product-image-link">
        <div className="product-image">
          {liveQuantity === 0 && (
            <span className="sold-out-badge">SOLD OUT</span>
          )}

          <img
            src={p.image}
            alt={p.name}
            className="product-image-img"
          />
        </div>
      </Link>

      <div className="product-content">
        <div className="product-brand">
          {p.brand || "Rimal Altaif"}
        </div>

        <Link href={`/product/${p.id}`} className="product-name">
          {p.name}
        </Link>

        <div className="product-size">{p.size}</div>

        <div className="product-prices">
          <span className="product-price">
            EGP {Number(p.price).toLocaleString("en-US")}
          </span>

          {p.oldPrice && Number(p.oldPrice) > Number(p.price) && (
            <span className="product-old-price">
              EGP {Number(p.oldPrice).toLocaleString("en-US")}
            </span>
          )}
        </div>

        <button
          type="button"
          className="product-btn"
          disabled={!inStock}
          onClick={handleAdd}
        >
          {liveQuantity === null
            ? "جاري التحقق من المخزون..."
            : inStock
              ? "أضف للسلة"
              : "نفذت الكمية"}
        </button>
      </div>
    </article>
  );
}
