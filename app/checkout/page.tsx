"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Truck,
  CreditCard,
  Landmark,
} from "lucide-react";

type PaymentMethod = "cod" | "instapay" | "vodafone";

const governorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "القليوبية",
  "الشرقية",
  "الدقهلية",
  "الغربية",
  "المنوفية",
  "البحيرة",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر",
  "الوادي الجديد",
  "مطروح",
  "شمال سيناء",
  "جنوب سيناء",
];

export default function CheckoutPage() {
  const [summaryOpen, setSummaryOpen] = useState(false);

  const [payment, setPayment] =
    useState<PaymentMethod>("cod");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    phone2: "",
    governorate: "",
    city: "",
    address: "",
    building: "",
    floor: "",
    apartment: "",
    notes: "",
  });

  const subtotal = 1600;
  const shipping = 70;

  const total = useMemo(() => {
    return subtotal + shipping;
  }, []);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white"
    >
      <div className="mx-auto max-w-[1450px] lg:grid lg:grid-cols-[58%_42%]">

                {/* ================= ORDER SUMMARY ================= */}

        <aside className="border-b bg-[#fafafa] lg:order-2 lg:min-h-screen lg:border-b-0 lg:border-r">

          {/* Mobile */}

          <div className="lg:hidden">

            <button
              onClick={() => setSummaryOpen(!summaryOpen)}
              className="flex h-16 w-full items-center justify-between border-b px-5"
            >
              <div className="flex items-center gap-2">

                <ShoppingBag size={18} />

                <span className="font-semibold">
                  ملخص الطلب
                </span>

                {summaryOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}

              </div>

              <span className="font-bold">
                {total} ج
              </span>

            </button>

            {summaryOpen && (

              <div className="space-y-5 bg-white p-5">

                <div className="flex items-start gap-4">

                  <div className="relative">

                    <div className="h-20 w-20 rounded-xl border bg-neutral-100" />

                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-600 text-xs text-white">
                      1
                    </span>

                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold">
                      Emerald Soul Diamond
                    </h3>

                    <p className="mt-2 text-sm text-neutral-500">
                      {subtotal} ج
                    </p>

                  </div>

                </div>

                <div className="space-y-3 border-t pt-5">

                  <div className="flex justify-between">

                    <span>الإجمالي الفرعي</span>

                    <span>{subtotal} ج</span>

                  </div>

                  <div className="flex justify-between">

                    <span>الشحن</span>

                    <span>{shipping} ج</span>

                  </div>

                  <div className="flex justify-between border-t pt-4 text-lg font-bold">

                    <span>الإجمالي</span>

                    <span>{total} ج</span>

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* Desktop */}

          <div className="hidden p-10 lg:block">

            <div className="flex items-start gap-5">

              <div className="relative">

                <div className="h-24 w-24 rounded-2xl border bg-white" />

                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-700 text-xs text-white">
                  1
                </span>

              </div>

              <div className="flex-1">

                <h3 className="text-lg font-semibold">
                  Emerald Soul Diamond
                </h3>

                <p className="mt-2 text-neutral-500">
                  الكمية: 1
                </p>

                <p className="mt-3 font-bold">
                  {subtotal} ج
                </p>

              </div>

            </div>

            <div className="my-8 border-t" />

            <div className="space-y-5">

              <div className="flex justify-between">

                <span>الإجمالي الفرعي</span>

                <span>{subtotal} ج</span>

              </div>

              <div className="flex justify-between">

                <span>الشحن</span>

                <span>{shipping} ج</span>

              </div>

              <div className="flex justify-between border-t pt-5 text-2xl font-bold">

                <span>الإجمالي</span>

                <span>{total} ج</span>

              </div>

            </div>

          </div>

        </aside>

        {/* ================= FORM ================= */}

        <section className="px-5 py-8 lg:px-16 lg:py-12">

          <div className="mx-auto max-w-[680px]">

            <h1 className="mb-10 text-center text-4xl font-bold">
              رمال الطائف
            </h1>
                        {/* ================= بيانات العميل ================= */}

            <div className="mb-10">

              <h2 className="mb-5 text-2xl font-bold">
                بيانات العميل
              </h2>

              <div className="space-y-4">

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="الاسم بالكامل"
                  className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none transition focus:border-black"
                />

                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  placeholder="رقم الهاتف"
                  className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none transition focus:border-black"
                />

                <input
                  value={form.phone2}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone2: e.target.value,
                    })
                  }
                  placeholder="رقم هاتف إضافي (اختياري)"
                  className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none transition focus:border-black"
                />

              </div>

            </div>

            {/* ================= عنوان الشحن ================= */}

            <div className="mb-10">

              <h2 className="mb-5 text-2xl font-bold">
                عنوان الشحن
              </h2>

              <div className="space-y-4">

                <select
                  value={form.governorate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      governorate: e.target.value,
                    })
                  }
                  className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none"
                >

                  <option value="">
                    اختر المحافظة
                  </option>

                  {governorates.map((gov) => (
                    <option key={gov}>
                      {gov}
                    </option>
                  ))}

                </select>

                <input
                  value={form.city}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      city: e.target.value,
                    })
                  }
                  placeholder="المدينة"
                  className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none"
                />

                <textarea
                  rows={4}
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                  placeholder="العنوان بالكامل"
                  className="w-full rounded-xl border border-neutral-300 p-5 outline-none"
                />

                <div className="grid grid-cols-3 gap-3">

                  <input
                    placeholder="المبنى"
                    className="h-14 rounded-xl border border-neutral-300 px-4"
                  />

                  <input
                    placeholder="الدور"
                    className="h-14 rounded-xl border border-neutral-300 px-4"
                  />

                  <input
                    placeholder="الشقة"
                    className="h-14 rounded-xl border border-neutral-300 px-4"
                  />

                </div>

              </div>

            </div>
                        {/* ================= طريقة الشحن ================= */}

            <div className="mb-10">

              <h2 className="mb-5 text-2xl font-bold">
                طريقة الشحن
              </h2>

              <div className="rounded-2xl border border-[#d9d9d9] bg-white p-5 transition hover:border-black">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
                      <Truck size={20} />
                    </div>

                    <div>

                      <p className="font-semibold">
                        شحن لجميع المحافظات
                      </p>

                      <p className="text-sm text-neutral-500">
                        التوصيل خلال 2 - 5 أيام عمل
                      </p>

                    </div>

                  </div>

                  <span className="text-lg font-bold">
                    {shipping} ج
                  </span>

                </div>

              </div>

            </div>

            {/* ================= طريقة الدفع ================= */}

            <div className="mb-10">

              <h2 className="mb-5 text-2xl font-bold">
                طريقة الدفع
              </h2>

              <div className="space-y-4">

                <button
                  type="button"
                  onClick={() => setPayment("cod")}
                  className={`w-full rounded-2xl border p-5 text-right transition ${
                    payment === "cod"
                      ? "border-black bg-neutral-50"
                      : "border-neutral-300 bg-white"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-semibold">
                        الدفع عند الاستلام
                      </p>

                      <p className="mt-2 text-sm text-neutral-500">
                        ادفع عند استلام الطلب.
                      </p>

                    </div>

                    <input
                      type="radio"
                      checked={payment === "cod"}
                      readOnly
                    />

                  </div>

                </button>

                <button
                  type="button"
                  onClick={() => setPayment("instapay")}
                  className={`w-full rounded-2xl border p-5 text-right transition ${
                    payment === "instapay"
                      ? "border-black bg-neutral-50"
                      : "border-neutral-300 bg-white"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-semibold">
                        Instapay
                      </p>

                      <p className="mt-2 text-sm text-neutral-500">
                        سيتم عرض بيانات التحويل بعد تأكيد الطلب.
                      </p>

                    </div>

                    <input
                      type="radio"
                      checked={payment === "instapay"}
                      readOnly
                    />

                  </div>

                </button>

                <button
                  type="button"
                  onClick={() => setPayment("vodafone")}
                  className={`w-full rounded-2xl border p-5 text-right transition ${
                    payment === "vodafone"
                      ? "border-black bg-neutral-50"
                      : "border-neutral-300 bg-white"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-semibold">
                        Vodafone Cash
                      </p>

                      <p className="mt-2 text-sm text-neutral-500">
                        سيتم عرض رقم فودافون كاش بعد تأكيد الطلب.
                      </p>

                    </div>

                    <input
                      type="radio"
                      checked={payment === "vodafone"}
                      readOnly
                    />

                  </div>

                </button>

              </div>

            </div>

            <button
              type="submit"
              className="h-14 w-full rounded-xl bg-black text-lg font-bold text-white transition hover:opacity-90"
            >
              تأكيد الطلب
            </button>

          </div>

        </section>

      </div>

    </main>

  );
}