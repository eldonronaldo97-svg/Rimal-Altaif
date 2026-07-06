"use client";

import { ChevronDown, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f7f7]">

      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[420px_1fr]">

        {/* ================= RIGHT ================= */}

        <section className="bg-white px-5 py-8 lg:px-14">

          <h1 className="mb-10 text-center text-4xl font-bold">
            رمال الطائف
          </h1>

          {/* العميل */}

          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">
              بيانات العميل
            </h2>

            <div className="space-y-4">

              <input
                placeholder="الاسم بالكامل"
                className="h-14 w-full rounded-xl border px-4"
              />

              <input
                placeholder="رقم الهاتف"
                className="h-14 w-full rounded-xl border px-4"
              />

              <input
                placeholder="رقم هاتف إضافي (اختياري)"
                className="h-14 w-full rounded-xl border px-4"
              />

            </div>

          </div>

          {/* العنوان */}

          <div className="mb-8">

            <h2 className="mb-4 text-2xl font-bold">
              عنوان الشحن
            </h2>

            <div className="space-y-4">

              <select className="h-14 w-full rounded-xl border px-4">
                <option>المحافظة</option>
              </select>

              <select className="h-14 w-full rounded-xl border px-4">
                <option>المدينة</option>
              </select>

              <textarea
                rows={4}
                placeholder="العنوان بالكامل"
                className="w-full rounded-xl border p-4"
              />

            </div>

          </div>

          {/* الشحن */}

          <div className="mb-8">

            <h2 className="mb-4 text-2xl font-bold">
              طريقة الشحن
            </h2>

            <div className="rounded-xl border p-5">

              <div className="flex items-center justify-between">

                <span>شحن لجميع المحافظات</span>

                <span className="font-bold">
                  70 ج
                </span>

              </div>

            </div>

          </div>

          {/* الدفع */}

          <div>

            <h2 className="mb-4 text-2xl font-bold">
              طريقة الدفع
            </h2>

            <div className="space-y-3">

              <button className="flex h-16 w-full items-center justify-between rounded-xl border px-5">
                <span>الدفع عند الاستلام</span>
                <input type="radio" checked readOnly />
              </button>

              <button className="flex h-16 w-full items-center justify-between rounded-xl border px-5">
                <span>Instapay</span>
                <input type="radio" readOnly />
              </button>

              <button className="flex h-16 w-full items-center justify-between rounded-xl border px-5">
                <span>Vodafone Cash</span>
                <input type="radio" readOnly />
              </button>

            </div>

          </div>

          <button className="mt-8 h-14 w-full rounded-xl bg-black text-lg font-bold text-white">
            تأكيد الطلب
          </button>

        </section>

        {/* ================= LEFT ================= */}

        <aside className="border-b bg-[#fafafa] lg:min-h-screen lg:border-b-0 lg:border-r">

          <div className="flex h-16 items-center justify-between border-b px-5 lg:hidden">

            <button className="flex items-center gap-2">

              <ShoppingBag size={18} />

              ملخص الطلب

              <ChevronDown size={18} />

            </button>

            <span className="font-bold">
              1670 ج
            </span>

          </div>

          <div className="hidden p-8 lg:block">

            <h2 className="mb-6 text-2xl font-bold">
              ملخص الطلب
            </h2>

            <div className="rounded-2xl bg-white p-5 shadow-sm">

              <div className="flex gap-4">

                <div className="h-20 w-20 rounded-xl bg-neutral-200" />

                <div>

                  <h3 className="font-semibold">
                    Emerald Soul Diamond
                  </h3>

                  <p className="mt-2 text-neutral-500">
                    الكمية: 1
                  </p>

                </div>

              </div>

              <div className="my-5 border-t" />

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>الإجمالي الفرعي</span>
                  <span>1600 ج</span>
                </div>

                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span>70 ج</span>
                </div>

                <div className="flex justify-between text-xl font-bold">
                  <span>الإجمالي</span>
                  <span>1670 ج</span>
                </div>

              </div>

            </div>

          </div>

        </aside>

      </div>

    </main>
  );
}