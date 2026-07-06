"use client";

import { ChevronDown, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1600px] lg:grid lg:grid-cols-[420px_minmax(700px,900px)] lg:justify-center">

        {/* ================= RIGHT ================= */}

        <section className="bg-white py-10 px-8 lg:px-20">
          <div className="mx-auto max-w-2xl">

            <h1 className="mb-12 text-center text-3xl font-bold lg:text-4xl">
              رمال الطائف
            </h1>

            {/* العميل */}

            <div className="mb-10">
              <h2 className="mb-5 text-xl font-bold lg:text-2xl">
                بيانات العميل
              </h2>

              <div className="space-y-4">

                <input
                  placeholder="الاسم بالكامل"
                  className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none focus:border-black"
                />

                <input
                  placeholder="رقم الهاتف"
                  className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none focus:border-black"
                />

                <input
                  placeholder="رقم هاتف إضافي (اختياري)"
                  className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none focus:border-black"
                />

              </div>
            </div>

            {/* العنوان */}

            <div className="mb-10">
              <h2 className="mb-5 text-xl font-bold lg:text-2xl">
                عنوان الشحن
              </h2>

              <div className="space-y-4">

                <select className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none focus:border-black">
                  <option>اختر المحافظة</option>
                </select>

                <select className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none focus:border-black">
                  <option>اختر المدينة</option>
                </select>

                <textarea
                  rows={4}
                  placeholder="العنوان بالكامل"
                  className="w-full rounded-xl border border-neutral-300 p-5 outline-none focus:border-black"
                />

              </div>
            </div>

            {/* الشحن */}

            <div className="mb-10">
              <h2 className="mb-5 text-xl font-bold lg:text-2xl">
                طريقة الشحن
              </h2>

              <div className="rounded-xl border border-neutral-300 p-5">
                <div className="flex items-center justify-between">
                  <span>شحن لجميع المحافظات</span>
                  <span className="font-bold">70 ج</span>
                </div>
              </div>
            </div>

            {/* الدفع */}

            <div>
              <h2 className="mb-5 text-xl font-bold lg:text-2xl">
                طريقة الدفع
              </h2>

              <div className="space-y-3">

                <button className="flex h-16 w-full items-center justify-between rounded-xl border border-black bg-neutral-50 px-5">
                  <span>الدفع عند الاستلام</span>
                  <input type="radio" checked readOnly />
                </button>

                <button className="flex h-16 w-full items-center justify-between rounded-xl border border-neutral-300 px-5">
                  <span>Instapay</span>
                  <input type="radio" readOnly />
                </button>

                <button className="flex h-16 w-full items-center justify-between rounded-xl border border-neutral-300 px-5">
                  <span>Vodafone Cash</span>
                  <input type="radio" readOnly />
                </button>

              </div>
            </div>

            <button className="mt-10 h-14 w-full rounded-xl bg-black text-lg font-bold text-white">
              تأكيد الطلب
            </button>

          </div>
        </section>

        {/* ================= LEFT ================= */}

        <aside className="border-r bg-[#fafafa]">

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

            </div>

          </div>

        </aside>

      </div>
    </main>
  );
}