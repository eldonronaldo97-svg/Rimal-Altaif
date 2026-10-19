"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../../lib/store";
import { products } from "../../lib/products";

const STOCK_LIMIT_MESSAGE = "الكمية المطلوبة أكثر من الحد المسموح به";

export default function CartPage() {
  const cart = useCart((s) => s.cart);
  const remove = useCart((s) => s.remove);
  const increase = useCart((s) => s.increase);
  const decrease = useCart((s) => s.decrease);
  const storeMessage = useCart((s) => s.message);
  const clearMessage = useCart((s) => s.clearMessage);
  const [mounted, setMounted] = useState(false);
  const [quantityErrors, setQuantityErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleIncrease = (id: string) => {
    const ok = increase(id);
    if (!ok) {
      setQuantityErrors((previous) => ({ ...previous, [id]: STOCK_LIMIT_MESSAGE }));
      clearMessage();
      return;
    }
    setQuantityErrors((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
    clearMessage();
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

  if (cart.length === 0) {
    return (
      <main style={{ minHeight: "100vh", background: "#fff", padding: 20 }}>
        <div style={{ maxWidth: 500, margin: "80px auto", textAlign: "center" }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>السلة فارغة</h1>
          <p style={{ color: "#666", marginBottom: 30 }}>ابدأ تصفح مجموعتنا من العطور.</p>
          <Link href="/">
            <button style={{ height: 52, padding: "0 24px", border: "none", background: "#111", color: "#fff", borderRadius: 999, fontWeight: 600 }}>
              متابعة التسوق
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "#fff", minHeight: "100vh", padding: 20 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, marginBottom: 25, fontWeight: 700 }}>سلة التسوق</h1>

        {cart.map((item) => {
          const product = products.find((p) => p.id === item.id);
          const available = Number(product?.quantity ?? 0);
          const canIncrease = available > item.qty;

          return (
            <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "center", border: "1px solid #eee", borderRadius: 16, padding: 12, marginBottom: 14 }}>
              <img src={item.image} alt={item.name} style={{ width: 90, height: 90, objectFit: "contain", background: "#fafafa", borderRadius: 12 }} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 16, marginBottom: 8 }}>{item.name}</h3>
                <p style={{ color: "#666", fontSize: 15 }}>EGP {item.price.toLocaleString("en-US")}</p>

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                  <button type="button" onClick={() => handleDecrease(item.id)} aria-label={`تقليل كمية ${item.name}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, minWidth: 38, border: "1px solid #bbb", background: "#fff", color: "#111", borderRadius: 999, fontSize: 22, lineHeight: 1, cursor: "pointer", padding: 0 }}>−</button>
                  <span style={{ minWidth: 20, textAlign: "center", fontWeight: 700 }}>{item.qty}</span>
                  <button type="button" onClick={() => handleIncrease(item.id)} aria-label={`زيادة كمية ${item.name}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, minWidth: 38, border: "1px solid #111", background: canIncrease ? "#111" : "#fff", color: canIncrease ? "#fff" : "#111", borderRadius: 999, fontSize: 22, lineHeight: 1, cursor: "pointer", padding: 0 }}>+</button>
                </div>

                {quantityErrors[item.id] && (
                  <p role="alert" style={{ color: "#c62828", fontSize: 13, marginTop: 8, marginBottom: 0 }}>
                    {quantityErrors[item.id]}
                  </p>
                )}
              </div>

              <button type="button" onClick={() => handleRemove(item.id)} aria-label={`حذف ${item.name}`} style={{ border: "none", background: "#f5f5f5", color: "#111", width: 40, height: 40, minWidth: 40, borderRadius: 999, fontSize: 18, cursor: "pointer" }}>×</button>
            </div>
          );
        })}

        <div style={{ marginTop: 30, border: "1px solid #eee", borderRadius: 16, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, fontSize: 20, fontWeight: 700 }}>
            <span>الاجمالي</span>
            <span>EGP {total.toLocaleString("en-US")}</span>
          </div>

          {storeMessage && <p role="status" style={{ color: "#b42318", marginBottom: 12 }}>{storeMessage}</p>}

          <Link href="/checkout">
            <button style={{ width: "100%", height: 56, border: "none", borderRadius: 999, background: "#111", color: "#fff", fontSize: 15, fontWeight: 700 }}>
              إتمام الطلب
            </button>
          </Link>

          <Link href="/">
            <button style={{ width: "100%", height: 56, marginTop: 12, borderRadius: 999, background: "#fff", border: "1px solid #ddd", fontSize: 15, fontWeight: 600 }}>
              متابعة التسوق
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
