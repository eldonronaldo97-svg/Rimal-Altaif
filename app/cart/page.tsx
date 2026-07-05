"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../../lib/store";

export default function CartPage() {
  const cart = useCart((s) => s.cart);
  const remove = useCart((s) => s.remove);
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return null;
}

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  if (cart.length === 0) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#fff",
          padding: 20,
        }}
      >
        <div
          style={{
            maxWidth: 500,
            margin: "80px auto",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 28,
              marginBottom: 12,
            }}
          >
            السلة فارغة
          </h1>

          <p
            style={{
              color: "#666",
              marginBottom: 30,
            }}
          >
            ابدأ تصفح مجموعتنا من العطور.
          </p>

          <Link href="/">
            <button
              style={{
                height: 52,
                padding: "0 24px",
                border: "none",
                background: "#111",
                color: "#fff",
                borderRadius: 999,
                fontWeight: 600,
              }}
            >
              متابعة التسوق
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#fff",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: 32,
            marginBottom: 25,
            fontWeight: 700,
          }}
        >
          سلة التسوق
        </h1>

        {cart.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              border: "1px solid #eee",
              borderRadius: 16,
              padding: 12,
              marginBottom: 14,
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: 90,
                height: 90,
                objectFit: "contain",
                background: "#fafafa",
                borderRadius: 12,
              }}
            />

            <div
              style={{
                flex: 1,
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                {item.name}
              </h3>

              <p
                style={{
                  color: "#666",
                  fontSize: 15,
                }}
              >
                EGP {item.price}
              </p>
            </div>

            <button
              onClick={() =>
                remove(item.id)
              }
              style={{
                border: "none",
                background: "#f5f5f5",
                width: 40,
                height: 40,
                borderRadius: 999,
                fontSize: 18,
              }}
            >
              ×
            </button>
          </div>
        ))}

        <div
          style={{
            marginTop: 30,
            border: "1px solid #eee",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginBottom: 20,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            <span>الاجمالي</span>
            <span>EGP {total}</span>
          </div>

          <Link href="/checkout">
            <button
              style={{
                width: "100%",
                height: 56,
                border: "none",
                borderRadius: 999,
                background: "#111",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              إتمام الطلب
            </button>
          </Link>

          <Link href="/">
            <button
              style={{
                width: "100%",
                height: 56,
                marginTop: 12,
                borderRadius: 999,
                background: "#fff",
                border: "1px solid #ddd",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              متابعة التسوق
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}