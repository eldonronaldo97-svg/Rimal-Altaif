"use client";

import { useCart } from "../lib/store";
import { useState } from "react";
import Link from "next/link";
import { products } from "../lib/products";

type ProductWithQuantity = (typeof products)[number] & {
  quantity?: number;
};

export default function Cart() {
  const { cart, remove, increase, decrease } = useCart();
  const [open, setOpen] = useState(false);
  const [quantityErrors, setQuantityErrors] = useState<Record<string, string>>({});

  const getProduct = (id: string) =>
    (products as ProductWithQuantity[]).find((product) => product.id === id);

  const total = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const handleIncrease = (id: string, currentQty: number) => {
    const product = getProduct(id);

    if (product && !product.stock) {
      setQuantityErrors((previous) => ({
        ...previous,
        [id]: "الكمية المطلوبة اكثر من الحد المسموح به",
      }));
      return;
    }

    // Reads the numeric limit from products.ts if quantity is defined for this product.
    const maxQuantity = product?.quantity;
    if (typeof maxQuantity === "number" && currentQty >= maxQuantity) {
      setQuantityErrors((previous) => ({
        ...previous,
        [id]: "الكمية المطلوبة اكثر من الحد المسموح به",
      }));
      return;
    }

    setQuantityErrors((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
    increase(id);
  };

  const handleDecrease = (id: string) => {
    setQuantityErrors((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
    decrease(id);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>🛒 ({totalItems})</button>

      <div
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : -350,
          width: 350,
          maxWidth: "100vw",
          height: "100vh",
          overflowY: "auto",
          background: "#fff",
          boxShadow: "-5px 0 20px rgba(0,0,0,0.1)",
          transition: "0.4s",
          padding: 20,
          zIndex: 1000,
        }}
      >
        <h2>السلة</h2>

        {cart.length === 0 ? (
          <p>السلة فارغة</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: "1px solid #eee",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <span>{item.name}</span>
                <button
                  aria-label={`حذف ${item.name}`}
                  onClick={() => {
                    remove(item.id);
                    setQuantityErrors((previous) => {
                      const next = { ...previous };
                      delete next[item.id];
                      return next;
                    });
                  }}
                >
                  ❌
                </button>
              </div>

              <p style={{ margin: "8px 0" }}>{item.price} جنيه للقطعة</p>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  aria-label={`تقليل كمية ${item.name}`}
                  onClick={() => handleDecrease(item.id)}
                  style={{ width: 32, height: 32, cursor: "pointer" }}
                >
                  −
                </button>
                <span aria-live="polite">{item.qty || 1}</span>
                <button
                  aria-label={`زيادة كمية ${item.name}`}
                  onClick={() => handleIncrease(item.id, item.qty || 1)}
                  style={{ width: 32, height: 32, cursor: "pointer" }}
                >
                  +
                </button>
              </div>

              {quantityErrors[item.id] && (
                <p
                  role="alert"
                  style={{ color: "#c62828", fontSize: 13, marginTop: 8, marginBottom: 0 }}
                >
                  {quantityErrors[item.id]}
                </p>
              )}

              <p style={{ marginTop: 8, fontWeight: 600 }}>
                إجمالي المنتج: {item.price * (item.qty || 1)} جنيه
              </p>
            </div>
          ))
        )}

        <p>الإجمالي الكلي: {total} جنيه</p>

        <Link href="/checkout">
          <button
            disabled={cart.length === 0}
            style={{
              width: "100%",
              padding: 15,
              background: cart.length ? "#000" : "#999",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: cart.length ? "pointer" : "not-allowed",
            }}
          >
            إتمام الطلب
          </button>
        </Link>

        <button onClick={() => setOpen(false)} style={{ marginTop: 12 }}>
          اغلاق
        </button>
      </div>
    </>
  );
}
