"use client";

export default function Toast({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#000",
        color: "#fff",
        padding: "14px 22px",
        borderRadius: 12,
        zIndex: 9999,
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        fontSize: 14,
      }}
    >
      تم إضافة المنتج للسلة 🛒
    </div>
  );
}