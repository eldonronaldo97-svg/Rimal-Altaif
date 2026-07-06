"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("cod");

  const subtotal = 1450;
  const shippingCost = shipping === "express" ? 80 : 40;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-right">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_420px] gap-6">

        {/* LEFT SIDE */}
        <div className="bg-white px-5 md:px-10 py-8 space-y-6">

          <h1 className="text-xl font-bold">إتمام الطلب</h1>

          {/* CONTACT */}
          <div className="space-y-2">
            <input className="input" placeholder="الاسم الكامل" />
            <input className="input" placeholder="رقم الهاتف" />
          </div>

          {/* ADDRESS */}
          <div className="space-y-2">
            <input className="input" placeholder="المحافظة" />
            <input className="input" placeholder="المدينة" />
            <input className="input" placeholder="العنوان بالتفصيل" />
          </div>

          {/* SHIPPING */}
          <div className="space-y-2">

            <div
              onClick={() => setShipping("standard")}
              className={`radio ${shipping === "standard" && "active"}`}
            >
              شحن عادي (2 - 4 أيام)
            </div>

            <div
              onClick={() => setShipping("express")}
              className={`radio ${shipping === "express" && "active"}`}
            >
              شحن سريع (1 - 2 يوم)
            </div>

          </div>

          {/* PAYMENT */}
          <div className="space-y-2">

            <div
              onClick={() => setPayment("cod")}
              className={`radio ${payment === "cod" && "active"}`}
            >
              الدفع عند الاستلام
            </div>

            <div
              onClick={() => setPayment("instapay")}
              className={`radio ${payment === "instapay" && "active"}`}
            >
              إنستاباي
            </div>

            <div
              onClick={() => setPayment("vodafone")}
              className={`radio ${payment === "vodafone" && "active"}`}
            >
              فودافون كاش
            </div>

          </div>

          {/* BUTTON */}
          <button className="w-full h-12 bg-black text-white rounded-xl">
            تأكيد الطلب
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:block bg-white border-l p-6">

          <h2 className="font-bold mb-4">ملخص الطلب</h2>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>الإجمالي الفرعي</span>
              <span>{subtotal} ج.م</span>
            </div>

            <div className="flex justify-between">
              <span>الشحن</span>
              <span>{shippingCost} ج.م</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-bold">
              <span>الإجمالي</span>
              <span>{total} ج.م</span>
            </div>

          </div>

        </div>

      </div>

      {/* STYLES */}
      <style jsx>{`
        .input {
          width: 100%;
          height: 44px;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          padding: 0 12px;
          font-size: 14px;
          background: white;
        }

        .radio {
          padding: 12px;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          cursor: pointer;
          background: white;
        }

        .radio.active {
          border-color: black;
          background: #f5f5f5;
        }
      `}</style>

    </div>
  );
}