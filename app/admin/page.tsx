"use client";

import { useEffect, useState } from "react";
import { getOrders } from "../../lib/orders";

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const data = getOrders() || [];
    setOrders(data);
  }, []);

  const updateStatus = (index: number, status: string) => {
    const updated = [...orders];
    updated[index].status = status;
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const deleteOrder = (index: number) => {
    const updated = [...orders];
    updated.splice(index, 1);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: 40, background: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 30 }}>📦 الطلبات</h1>

      {orders.length === 0 && <p>لا يوجد طلبات</p>}

      {orders.map((o, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20,
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          }}
        >
          {/* بيانات العميل */}
          <h3 style={{ marginBottom: 10 }}>
            👤 {o.customer?.name || "—"}
          </h3>

          <p>📞 {o.customer?.phone1 || "—"}</p>
          {o.customer?.phone2 && <p>📞 {o.customer.phone2}</p>}
          <p>🏠 {o.customer?.address || "—"}</p>

          {/* المنتجات */}
          <div style={{ marginTop: 10 }}>
            <strong>🛍 المنتجات:</strong>
            {o.items?.map((item: any, idx: number) => (
              <div key={idx} style={{ fontSize: 14 }}>
                - {item.name} ({item.price} جنيه)
              </div>
            ))}
          </div>

          {/* الإجمالي */}
          <p style={{ marginTop: 10 }}>
            💰 الإجمالي: <strong>{o.total} جنيه</strong>
          </p>

          {/* التاريخ */}
          <p style={{ fontSize: 12, color: "#777" }}>
            📅 {o.date}
          </p>

          {/* صورة التحويل */}
          {o.image && (
            <img
              src={o.image}
              style={{
                width: 200,
                marginTop: 10,
                borderRadius: 10,
              }}
            />
          )}

          {/* الحالة */}
          <div style={{ marginTop: 15 }}>
            <select
              value={o.status}
              onChange={(e) => updateStatus(i, e.target.value)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ddd",
              }}
            >
              <option value="pending">🟡 قيد المراجعة</option>
              <option value="confirmed">🟢 تم التأكيد</option>
              <option value="shipped">🚚 تم الشحن</option>
              <option value="cancelled">🔴 ملغي</option>
            </select>
          </div>

          {/* أزرار */}
          <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
            <a
              href={`https://wa.me/2${o.customer?.phone1}`}
              target="_blank"
              style={{
                padding: "8px 12px",
                background: "green",
                color: "#fff",
                borderRadius: 6,
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              واتساب
            </a>

            <button
              onClick={() => deleteOrder(i)}
              style={{
                padding: "8px 12px",
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}