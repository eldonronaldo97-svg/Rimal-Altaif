"use client";

import { useCart } from "../lib/store";
import { useState } from "react";
import { saveOrder } from "../lib/orders";
import Link from "next/link";
import { products } from "../lib/products";

const STOCK_LIMIT_MESSAGE = "الكمية المطلوبة اكثر من الحد المسموح به";

type ProductWithQuantity = {
  id: string;
  quantity?: number;
  stock?: boolean;
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
    const maxQuantity = product?.quantity;

    // quantity is the authoritative stock count; zero means unavailable.
    if (
      !product ||
      product.stock === false ||
      typeof maxQuantity !== "number" ||
      maxQuantity <= 0 ||
      currentQty >= maxQuantity
    ) {
      setQuantityErrors((previous) => ({
        ...previous,
        [id]: STOCK_LIMIT_MESSAGE,
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
    decrease(id);
    setQuantityErrors((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
  };

  const sendWhatsApp = () => {
    const items = cart
      .map((item) => `${item.name} - ${item.price} × ${item.qty || 1}`)
      .join("%0A");

    const url = `https://wa.me/201XXXXXXXXX?text=طلب جديد:%0A${items}%0Aالإجمالي: ${total}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>🛒 ({totalItems})</button>

      <div style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : -350,
        width: 350,
        height: "100vh",
        background: "#fff",
        boxShadow: "-5px 0 20px rgba(0,0,0,0.1)",
        transition: "0.4s",
        padding: 20,
        overflowY: "auto",
        zIndex: 1000,
      }}>
        <h2>السلة</h2>

        {cart.map((item) => (
          <div key={item.id} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span>{item.name}</span>
              <button onClick={() => {
                remove(item.id);
                setQuantityErrors((previous) => {
                  const next = { ...previous };
                  delete next[item.id];
                  return next;
                });
              }}>❌</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <button aria-label={`تقليل كمية ${item.name}`} onClick={() => handleDecrease(item.id)}>−</button>
              <span>{item.qty || 1}</span>
              <button aria-label={`زيادة كمية ${item.name}`} onClick={() => handleIncrease(item.id, item.qty || 1)}>+</button>
            </div>

            {quantityErrors[item.id] && (
              <p role="alert" style={{ color: "#c62828", fontSize: 13, marginTop: 6, marginBottom: 0 }}>
                {quantityErrors[item.id]}
              </p>
            )}

            <p style={{ marginTop: 6 }}>الإجمالي: {item.price * (item.qty || 1)} جنيه</p>
          </div>
        ))}

        <p>الإجمالي: {total} جنيه</p>

        <Link href="/checkout">
          <button
            style={{
              width: "100%",
              padding: 15,
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
            }}
          >
            إتمام الطلب
          </button>
        </Link>

        <button onClick={() => setOpen(false)}>اغلاق</button>
      </div>
    </>
  );
}
