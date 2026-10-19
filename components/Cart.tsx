"use client";

import { useCart } from "../lib/store";
import { useState } from "react";
import Link from "next/link";

const STOCK_LIMIT_MESSAGE = "الكمية المطلوبة اكثر من الحد المسموح به";
const quantityButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  minWidth: 36,
  padding: 0,
  border: "1px solid #222",
  borderRadius: 6,
  background: "#fff",
  color: "#111",
  fontSize: 22,
  lineHeight: 1,
  fontWeight: 700,
  cursor: "pointer",
  visibility: "visible",
  opacity: 1,
};

export default function Cart() {
  const { cart, remove, increase, decrease, message, clearMessage } = useCart();
  const [open, setOpen] = useState(false);
  const [quantityErrors, setQuantityErrors] = useState<Record<string, string>>({});

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleIncrease = (id: string) => {
    const ok = increase(id);
    if (!ok) {
      setQuantityErrors((previous) => ({
        ...previous,
        [id]: useCart.getState().message || STOCK_LIMIT_MESSAGE,
      }));
      clearMessage();
      return;
    }
    setQuantityErrors((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
  };

  const handleDecrease = (id: string) => {
    decrease(id);
    setQuantityErrors((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
    clearMessage();
  };

  const handleRemove = (id: string) => {
    remove(id);
    setQuantityErrors((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>🛒 ({totalQty})</button>
      <div style={{ position: "fixed", top: 0, right: open ? 0 : -390, width: 350, maxWidth: "100vw", height: "100vh", overflowY: "auto", background: "#fff", color: "#111", boxShadow: "-5px 0 20px rgba(0,0,0,0.1)", transition: "0.4s", padding: 20, zIndex: 1000 }}>
        <h2>السلة</h2>
        <button onClick={() => setOpen(false)} style={{ float: "left" }}>إغلاق</button>
        {message && <p role="status" style={{ color: message.includes("تمت") ? "#167a3f" : "#b42318", padding: "10px 0" }}>{message}<button onClick={clearMessage} aria-label="إغلاق الرسالة"> × </button></p>}
        {!cart.length && <p>السلة فارغة</p>}
        {cart.map((item) => (
          <div key={item.id} style={{ margin: "18px 0", paddingBottom: 14, borderBottom: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <strong>{item.name}</strong>
              <button onClick={() => handleRemove(item.id)}>حذف</button>
            </div>
            <p>{item.price.toLocaleString("en-US")} جنيه × {item.qty} = {(item.price * item.qty).toLocaleString("en-US")} جنيه</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, direction: "ltr", width: "fit-content" }}>
              <button type="button" style={quantityButtonStyle} onClick={() => handleDecrease(item.id)} aria-label={`تقليل كمية ${item.name}`}>−</button>
              <span style={{ display: "inline-block", minWidth: 24, textAlign: "center", color: "#111", fontSize: 16 }}>{item.qty}</span>
              <button type="button" style={quantityButtonStyle} onClick={() => handleIncrease(item.id)} aria-label={`زيادة كمية ${item.name}`}>+</button>
            </div>
            {quantityErrors[item.id] && <p role="alert" style={{ color: "#c62828", fontSize: 13, marginTop: 6, marginBottom: 0 }}>{quantityErrors[item.id]}</p>}
          </div>
        ))}
        <p>الإجمالي: {total.toLocaleString("en-US")} جنيه</p>
        {cart.length > 0 && <Link href="/checkout"><button style={{ width: "100%", padding: 15, background: "#000", color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold" }}>إتمام الطلب</button></Link>}
      </div>
    </>
  );
}
