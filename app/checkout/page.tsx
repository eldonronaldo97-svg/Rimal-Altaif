"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("cod");
  const [coupon, setCoupon] = useState("");

  const subtotal = 1450;
  const shippingCost = shipping === "express" ? 80 : 40;
  const discount = coupon.toLowerCase() === "sale10" ? 145 : 0;

  const total = subtotal + shippingCost - discount;

  return (
    <div className="min-h-screen bg-white text-right font-[Cairo]">

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* TITLE */}
        <div>
          <h1 className="text-2xl font-bold">إتمام الطلب</h1>
          <p className="text-sm text-gray-500 mt-1">
            من فضلك املأ البيانات لإكمال الطلب
          </p>
        </div>

        {/* CONTACT */}
        <Section title="بيانات التواصل">
          <Input placeholder="الاسم الكامل" />
          <Input placeholder="رقم الهاتف" />
          <Input placeholder="رقم إضافي (اختياري)" />
        </Section>

        {/* ADDRESS */}
        <Section title="عنوان التوصيل">
          <Input placeholder="المحافظة" />
          <Input placeholder="المدينة" />
          <Input placeholder="العنوان بالتفصيل" />

          <div className="grid grid-cols-3 gap-2">
            <Input placeholder="المبنى" />
            <Input placeholder="الدور" />
            <Input placeholder="الشقة" />
          </div>
        </Section>

        {/* SHIPPING */}
        <Section title="طريقة الشحن">
          <Radio
            active={shipping === "standard"}
            onClick={() => setShipping("standard")}
            title="شحن عادي"
            desc="2 - 4 أيام"
          />

          <Radio
            active={shipping === "express"}
            onClick={() => setShipping("express")}
            title="شحن سريع"
            desc="1 - 2 يوم"
          />
        </Section>

        {/* PAYMENT */}
        <Section title="طريقة الدفع">
          <Radio
            active={payment === "cod"}
            onClick={() => setPayment("cod")}
            title="الدفع عند الاستلام"
            desc="ادفع عند الاستلام"
          />

          <Radio
            active={payment === "instapay"}
            onClick={() => setPayment("instapay")}
            title="إنستاباي"
            desc="تحويل فوري"
          />

          <Radio
            active={payment === "vodafone"}
            onClick={() => setPayment("vodafone")}
            title="فودافون كاش"
            desc="محفظة إلكترونية"
          />

          {payment !== "cod" && (
            <div className="mt-3 p-3 border rounded-xl bg-gray-50 text-sm">
              <p className="text-xs text-gray-500">رقم التحويل</p>
              <p className="font-bold">01234567890</p>

              <button className="w-full mt-2 h-10 bg-black text-white rounded-lg">
                نسخ الرقم
              </button>
            </div>
          )}
        </Section>

        {/* COUPON */}
        <Section title="كود الخصم">
          <div className="flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 h-12 border rounded-xl px-3 text-sm"
              placeholder="أدخل الكود"
            />
            <button className="px-4 bg-black text-white rounded-xl">
              تطبيق
            </button>
          </div>
        </Section>

        {/* ORDER SUMMARY (SIMPLE LIKE VIDEO) */}
        <Section title="ملخص الطلب">
          <Row label="الإجمالي الفرعي" value={`${subtotal} ج.م`} />
          <Row label="الشحن" value={`${shippingCost} ج.م`} />
          <Row label="الخصم" value={`-${discount} ج.م`} />

          <div className="border-t pt-3 flex justify-between font-bold">
            <span>الإجمالي</span>
            <span>{total} ج.م</span>
          </div>
        </Section>

        {/* BUTTON */}
        <button className="w-full h-12 bg-black text-white rounded-xl text-lg active:scale-[0.98] transition">
          تأكيد الطلب
        </button>

      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function Section({ title, children }: any) {
  return (
    <div className="border rounded-2xl p-4 space-y-3">
      <h2 className="font-bold text-sm">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full h-12 border rounded-xl px-3 text-sm outline-none focus:border-black"
    />
  );
}

function Radio({ active, title, desc, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center border rounded-xl p-3 cursor-pointer transition ${
        active ? "border-black bg-gray-50" : "border-gray-200"
      }`}
    >
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>

      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
        active ? "border-black" : "border-gray-300"
      }`}>
        {active && <div className="w-2 h-2 bg-black rounded-full" />}
      </div>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}