"use client";

export default function Toast({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#000",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 10,
        zIndex: 9999,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        fontSize: 14,
      }}
    >
      تم إضافة المنتج للسلة 🛒
    </div>
  );
}