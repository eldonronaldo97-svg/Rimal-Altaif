"use client";

import Link from "next/link";
import { useCart } from "@/lib/store";

export default function FloatingCart() {
  const cart = useCart((s) => s.cart);

  if (cart.length === 0) return null;

  return (
    <Link
      href="/cart"
      style={{
        position: "fixed",
        left: 20,
        top: 90,
        zIndex: 9999,
        background: "#000",
        color: "#fff",
        width: 60,
        height: 60,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        fontSize: 24,
        boxShadow: "0 6px 20px rgba(0,0,0,.25)",
      }}
    >
      🛒

      <span
        style={{
          position: "absolute",
          top: -4,
          right: -4,
          background: "red",
          color: "#fff",
          width: 22,
          height: 22,
          borderRadius: "50%",
          fontSize: 12,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cart.length}
      </span>
    </Link>
  );
}