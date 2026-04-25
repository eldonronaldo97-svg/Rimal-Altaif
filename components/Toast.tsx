"use client";

import Link from "next/link";

export default function Toast({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fff",
        color: "#000",
        padding: "12px 16px",
        borderRadius: 12,
        zIndex: 9999,
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "90%",
        maxWidth: 400,
      }}
    >
      <span style={{ fontSize: 14 }}>
        تم إضافة المنتج للسلة 🛒
      </span>

      <Link href="/cart">
        <button
          style={{
            marginLeft: "auto",
            padding: "8px 12px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 13,
          }}
        >
          عرض السلة
        </button>
      </Link>
    </div>
  );
}