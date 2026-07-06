"use client";

import { ChevronDown, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto max-w-7xl px-4 lg:grid lg:grid-cols-[420px_1fr] lg:px-8">
        {/* ================= RIGHT ================= */}

        <section className="bg-white px-8 py-10 lg:px-16">
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
                className="h-14 w-full rounded-xl border border-neutral-300 px-5 text-base outline-none transition focus:border-black"
              />

              <input
                placeholder="رقم الهاتف"
                className="h-14 w-full rounded-xl border border-neutral-300 px-5 text-base outline-none transition focus:border-black"
              />

              <input
                placeholder="رقم هاتف إضافي (اختياري)"
                className="h-14 w-full rounded-xl border border-neutral-300 px-5 text-base outline-none transition focus:border-black"
              />
            </div>
          </div>

          {/* العنوان */}

          <div className="mb-10">
            <h2 className="mb-5 text-xl font-bold lg:text-2xl">
              عنوان الشحن
            </h2>

            <div className="space-y-4">
              <select className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none transition focus:border-black">
                <option>اختر المحافظة</option>
              </select>

              <select className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none transition focus:border-black">
                <option>اختر المدينة</option>
              </select>

              <textarea
                rows={4}
                placeholder="العنوان بالكامل"
                className="w-full rounded-xl border border-neutral-300 p-5 outline-none transition focus:border-black"
              />
            </div>
          </div>

          {/* الشحن */}

          <div className="mb-10">
            <h2 className="mb-5 text-xl font-bold lg:text-2xl">
              طريقة الشحن
            </h2>

            <div className="rounded-xl border border-neutral-300 p-5 transition hover:border-black">
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
              <button className="flex h-16 w-full items-center justify-between rounded-xl border border-black bg-neutral-50 px-5 transition">
                <span>الدفع عند الاستلام</span>

                <input type="radio" checked readOnly />
              </button>

              <button className="flex h-16 w-full items-center justify-between rounded-xl border border-neutral-300 px-5 transition hover:border-black">
                <span>Instapay</span>

                <input type="radio" readOnly />
              </button>

              <button className="flex h-16 w-full items-center justify-between rounded-xl border border-neutral-300 px-5 transition hover:border-black">
                <span>Vodafone Cash</span>

                <input type="radio" readOnly />
              </button>
            </div>
          </div>

          <button className="mt-10 h-14 w-full rounded-xl bg-black text-lg font-bold text-white transition hover:bg-neutral-800">
            تأكيد الطلب
          </button>
        </section>

        {/* ================= LEFT ================= */}

        <aside className="border-b bg-[#fafafa] lg:min-h-screen lg:border-b-0 lg:border-r">
          {/* Mobile */}

          <div className="flex h-16 items-center justify-between border-b px-5 lg:hidden">
            <button className="flex items-center gap-2 font-medium">
              <ShoppingBag size={18} />

              ملخص الطلب

              <ChevronDown size={18} />
            </button>

            <span className="text-lg font-bold">1670 ج</span>
          </div>

          {/* Desktop */}

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