"use client";

import { useCart } from "../../lib/store";
import Link from "next/link";

export default function Cart() {
  const cart = useCart((s) => s.cart);
  const remove = useCart((s) => s.remove);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>السلة فارغة 🛒</h2>

        <Link href="/">
          <button style={{ marginTop: 20 }}>
            رجوع للتسوق
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2 style={{ marginBottom: 20 }}>السلة</h2>

      {cart.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 15,
            background: "#fff",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <img
            src={item.image || "https://picsum.photos/100"}
            style={{ width: 80, borderRadius: 8 }}
          />

          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>{item.price} جنيه</p>
          </div>

          <button onClick={() => remove(item.id)}>❌</button>
        </div>
      ))}

      <h3 style={{ marginTop: 20 }}>
        الإجمالي: {total} جنيه
      </h3>

      <Link href="/checkout">
        <button
          style={{
            marginTop: 20,
            padding: 15,
            width: "100%",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: 8,
          }}
        >
          إتمام الطلب
        </button>
      </Link>
    </div>
  );
}