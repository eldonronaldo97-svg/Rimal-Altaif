"use client";

export default function Toast({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 30,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#000",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: 5
    }}>
      تمت الإضافة للسلة 🛒
    </div>
  );
}