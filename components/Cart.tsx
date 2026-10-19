"use client";

import { useCart } from "../lib/store";
import { useState } from "react";
import Link from "next/link";

export default function Cart() {
  const { cart, remove, increase, decrease, message, clearMessage } = useCart();
  const [open, setOpen] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <button onClick={() => setOpen(true)}>🛒 ({totalQty})</button>
      <div style={{ position: "fixed", top: 0, right: open ? 0 : -390, width: 350, maxWidth: "100vw", height: "100vh", overflowY: "auto", background: "#fff", boxShadow: "-5px 0 20px rgba(0,0,0,0.1)", transition: "0.4s", padding: 20, zIndex: 1000 }}>
        <h2>السلة</h2>
        <button onClick={() => setOpen(false)} style={{ float: "left" }}>إغلاق</button>
        {message && <p role="status" style={{ color: message.includes("تمت") ? "#167a3f" : "#b42318", padding: "10px 0" }}>{message}<button onClick={clearMessage} aria-label="إغلاق الرسالة"> × </button></p>}
        {!cart.length && <p>السلة فارغة</p>}
        {cart.map((item) => (
          <div key={item.id} style={{ margin: "18px 0", paddingBottom: 14, borderBottom: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><strong>{item.name}</strong><button onClick={() => remove(item.id)}>حذف</button></div>
            <p>{item.price.toLocaleString("en-US")} جنيه × {item.qty} = {(item.price * item.qty).toLocaleString("en-US")} جنيه</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => decrease(item.id)} aria-label="تقليل الكمية">−</button>
              <span>{item.qty}</span>
              <button onClick={() => { const ok = increase(item.id); if (!ok) window.alert(useCart.getState().message); }} aria-label="زيادة الكمية">+</button>
            </div>
          </div>
        ))}
        <p>الإجمالي: {total.toLocaleString("en-US")} جنيه</p>
        {cart.length > 0 && <Link href="/checkout"><button style={{ width: "100%", padding: 15, background: "#000", color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold" }}>إتمام الطلب</button></Link>}
      </div>
    </>
  );
}
