"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [payment, setPayment] = useState("cod");
  const [shipping, setShipping] = useState("standard");

  const subtotal = 1450;
  const shippingCost = shipping === "express" ? 80 : 40;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-right font-[Cairo]">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_380px]">

        {/* LEFT */}
        <div className="bg-white px-5 md:px-10 py-10 space-y-6">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">إتمام الطلب</h1>
            <p className="text-sm text-gray-500 mt-1">
              من فضلك املأ البيانات لإتمام الطلب
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
            <Input placeholder="العنوان بالكامل" />

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
              desc="من 2 إلى 4 أيام"
            />

            <Radio
              active={shipping === "express"}
              onClick={() => setShipping("express")}
              title="شحن سريع"
              desc="من 1 إلى 2 يوم"
            />
          </Section>

          {/* PAYMENT */}
          <Section title="طريقة الدفع">
            <Radio
              active={payment === "cod"}
              onClick={() => setPayment("cod")}
              title="الدفع عند الاستلام"
              desc="ادفع عند استلام الطلب"
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
              <div className="mt-3 p-3 rounded-xl bg-gray-50 border text-sm">
                <p className="text-xs text-gray-500">رقم التحويل</p>
                <p className="font-bold text-lg">01234567890</p>

                <button className="mt-2 w-full h-10 bg-black text-white rounded-lg">
                  نسخ الرقم
                </button>
              </div>
            )}
          </Section>

          {/* COUPON */}
          <Section title="كود الخصم">
            <div className="flex gap-2">
              <input
                className="flex-1 h-12 border rounded-xl px-3"
                placeholder="أدخل الكود"
              />
              <button className="px-5 bg-black text-white rounded-xl">
                تطبيق
              </button>
            </div>
          </Section>

          {/* BUTTON */}
          <button className="w-full h-12 bg-black text-white rounded-xl text-lg active:scale-[0.98] transition">
            تأكيد الطلب
          </button>

        </div>

        {/* RIGHT */}
        <div className="hidden lg:block border-l bg-[#fafafa] p-6 space-y-5">

          <div className="flex justify-between text-sm">
            <span>الإجمالي</span>
            <span>{subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>الشحن</span>
            <span>{shippingCost}</span>
          </div>

          <div className="flex justify-between text-sm text-red-500">
            <span>خصم</span>
            <span>0</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>الإجمالي الكلي</span>
            <span>{total}</span>
          </div>

        </div>

      </div>

      {/* MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
        <span className="font-bold">{total} ج.م</span>

        <button className="bg-black text-white px-6 py-3 rounded-xl">
          إتمام
        </button>
      </div>

    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Section({ title, children }: any) {
  return (
    <div className="border rounded-2xl p-4 bg-white space-y-3">
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