"use client";

import { Truck } from "lucide-react";

export default function ShippingMethod() {
  return (
    <section className="mb-10">

      <h2 className="mb-6 text-2xl font-semibold">
        طريقة الشحن
      </h2>

      <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">

        <label className="flex cursor-pointer items-center justify-between p-5 transition hover:bg-neutral-50">

          <div className="flex items-center gap-4">

            <input
              type="radio"
              defaultChecked
              className="h-5 w-5 accent-[#1773EA]"
            />

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3F4F6]">
              <Truck size={20} />
            </div>

            <div>

              <p className="font-semibold text-[#111827]">
                شحن لجميع المحافظات
              </p>

              <p className="mt-1 text-sm text-[#6B7280]">
                مدة التوصيل من يومين إلى خمسة أيام عمل
              </p>

            </div>

          </div>

          <span className="text-lg font-bold">
            70 ج
          </span>

        </label>

      </div>

    </section>
  );
}