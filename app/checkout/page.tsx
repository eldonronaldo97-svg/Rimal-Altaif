"use client";

import { ChevronDown, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-white">

      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[460px_1fr]">

        {/* LEFT */}

        <section className="order-2 px-6 py-8 lg:order-1 lg:px-12 lg:py-12">

          {/* Logo */}

          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-wider">
              RIMAL ALTAIF
            </h1>
          </div>

          {/* Contact */}

          <div className="mb-8 rounded-2xl border border-neutral-200 p-6">

            <h2 className="mb-5 text-2xl font-semibold">
              بيانات العميل
            </h2>

            <div className="h-14 rounded-xl bg-neutral-100" />

          </div>

          {/* Delivery */}

          <div className="mb-8 rounded-2xl border border-neutral-200 p-6">

            <h2 className="mb-5 text-2xl font-semibold">
              عنوان الشحن
            </h2>

            <div className="space-y-4">

              <div className="h-14 rounded-xl bg-neutral-100" />
              <div className="h-14 rounded-xl bg-neutral-100" />
              <div className="h-14 rounded-xl bg-neutral-100" />
              <div className="h-14 rounded-xl bg-neutral-100" />
              <div className="h-14 rounded-xl bg-neutral-100" />

            </div>

          </div>

          {/* Shipping */}

          <div className="mb-8 rounded-2xl border border-neutral-200 p-6">

            <h2 className="mb-5 text-2xl font-semibold">
              طريقة الشحن
            </h2>

            <div className="h-16 rounded-xl border border-black" />

          </div>

          {/* Payment */}

          <div className="rounded-2xl border border-neutral-200 p-6">

            <h2 className="mb-5 text-2xl font-semibold">
              طريقة الدفع
            </h2>

            <div className="space-y-4">

              <div className="h-16 rounded-xl bg-neutral-100" />
              <div className="h-16 rounded-xl bg-neutral-100" />
              <div className="h-16 rounded-xl bg-neutral-100" />

            </div>

          </div>

          <button className="mt-8 h-14 w-full rounded-xl bg-black text-lg font-semibold text-white">
            تأكيد الطلب
          </button>

        </section>

        {/* RIGHT */}

        <aside className="order-1 border-b bg-neutral-50 lg:order-2 lg:min-h-screen lg:border-b-0 lg:border-l">

          {/* Mobile Summary */}

          <div className="flex h-16 items-center justify-between border-b px-6 lg:hidden">

            <button className="flex items-center gap-2 font-medium">

              <ShoppingBag size={20} />

              ملخص الطلب

              <ChevronDown size={18} />

            </button>

            <span className="text-lg font-bold">
              EGP 0
            </span>

          </div>

          {/* Desktop Summary */}

          <div className="hidden p-10 lg:block">

            <h2 className="mb-8 text-2xl font-semibold">
              Order Summary
            </h2>

            <div className="space-y-5">

              <div className="h-24 rounded-2xl bg-white" />
              <div className="h-24 rounded-2xl bg-white" />

            </div>

            <div className="my-8 border-t" />

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>EGP 0</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>EGP 0</span>
              </div>

              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>EGP 0</span>
              </div>

            </div>

          </div>

        </aside>

      </div>

    </main>
  );
}