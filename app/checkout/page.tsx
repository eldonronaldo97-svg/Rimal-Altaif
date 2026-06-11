"use client";

import { useState } from "react";
import { useCart } from "../../lib/store";
import { saveOrder } from "../../lib/orders";

export default function Checkout() {
  const cart = useCart((s) => s.cart);

  const [name, setName] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<any>(null);

  const [copied, setCopied] = useState(false);

  const vodafoneNumber = "01060230817"; // 👈 غير الرقم هنا

  const total = cart.reduce((s, i) => s + i.price, 0);

  const copyNumber = () => {
    navigator.clipboard.writeText(vodafoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOrder = () => {
  if (!name || !phone1 || !address) {
    alert("من فضلك املى البيانات الأساسية");
    return;
  }

  if (!image) {
    alert("لازم ترفع صورة التحويل لتأكيد الطلب");
    return;
  }

  const order = {
    customer: {
      name,
      phone1,
      phone2,
      address,
    },
    items: cart,
    total,
    status: "pending",
    date: new Date().toLocaleString(),
  };

  saveOrder(order);

  const itemsText = cart
    .map(
      (item) =>
        `• ${item.name} - ${item.price} جنيه`
    )
    .join("\n");

  const message = `
طلب جديد 🔥

الاسم: ${name}

الموبايل: ${phone1}

رقم إضافي: ${phone2 || "لا يوجد"}

العنوان:
${address}

المنتجات:
${itemsText}

الإجمالي:
${total} جنيه

⚠️ العميل سيقوم بإرسال صورة التحويل في الواتساب.
`;

  window.open(
    `https://wa.me/201060230817?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  localStorage.removeItem("cart");

  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
};

    saveOrder(order);

    alert("تم إرسال طلبك ✅ سيتم مراجعته بعد التأكد من التحويل");

    localStorage.removeItem("cart");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: "auto" }}>
      <h2 style={{ marginBottom: 20 }}>إتمام الطلب</h2>

      {/* بيانات العميل */}
      <input
        placeholder="الاسم"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="رقم الموبايل الأساسي"
        value={phone1}
        onChange={(e) => setPhone1(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="رقم تاني (اختياري)"
        value={phone2}
        onChange={(e) => setPhone2(e.target.value)}
        style={inputStyle}
      />

      <textarea
        placeholder="العنوان"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ ...inputStyle, height: 100 }}
      />

      {/* رسالة الديبوزيت */}
      <div
        style={{
          background: "#fff3cd",
          padding: 15,
          borderRadius: 8,
          marginTop: 15,
          fontSize: 14,
        }}
      >
        ⚠️ لتأكيد الطلب:<br />
        برجاء تحويل ديبوزت 100 جنيه<br />
        ثم رفع صورة التحويل بالأسفل
      </div>

      {/* رقم التحويل + نسخ */}
      <div
        style={{
          marginTop: 15,
          background: "#fff",
          padding: 15,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #eee",
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
            رقم التحويل (فودافون كاش)
          </p>
          <strong style={{ fontSize: 18 }}>{vodafoneNumber}</strong>
        </div>

        <button
          onClick={copyNumber}
          style={{
            padding: "8px 15px",
            background: copied ? "green" : "#000",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {copied ? "تم النسخ ✓" : "نسخ"}
        </button>
      </div>

      {/* رفع الصورة */}
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0])}
        style={{ marginTop: 15 }}
      />

      {/* معاينة الصورة */}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          style={{
            width: "100%",
            marginTop: 10,
            borderRadius: 10,
          }}
        />
      )}

      <h3 style={{ marginTop: 20 }}>الإجمالي: {total} جنيه</h3>

      <button
        onClick={handleOrder}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 15,
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: "bold",
        }}
      >
        تأكيد الطلب
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 10,
  border: "1px solid #ddd",
  borderRadius: 8,
};