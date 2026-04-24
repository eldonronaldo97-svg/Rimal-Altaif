"use client";

import { useCart } from "../lib/store";
import { useState } from "react";
import { saveOrder } from "../lib/orders";
import Link from "next/link";

export default function Cart() {
  const { cart, remove } = useCart();
  const [open, setOpen] = useState(false);

  const total = cart.reduce((s, i) => s + i.price, 0);

  const sendWhatsApp = () => {
    const items = cart.map(i => `${i.name} - ${i.price}`).join("%0A");

    const url = `https://wa.me/201XXXXXXXXX?text=طلب جديد:%0A${items}%0Aالإجمالي: ${total}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>🛒 ({cart.length})</button>

      <div style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : -350,
        width: 350,
        height: "100vh",
        background: "#fff",
        boxShadow: "-5px 0 20px rgba(0,0,0,0.1)",
        transition: "0.4s",
        padding: 20
      }}>
        <h2>السلة</h2>

        {cart.map(i => (
          <div key={i.id} style={{ marginBottom: 10 }}>
            {i.name}
            <button onClick={() => remove(i.id)}>❌</button>
          </div>
        ))}

        <p>الإجمالي: {total}</p>

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