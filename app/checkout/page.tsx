"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { useCart } from "@/lib/store";
import { saveOrder, CustomerInfo } from "@/lib/orders";

const governorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "القليوبية",
  "الشرقية",
  "الغربية",
  "المنوفية",
  "البحيرة",
  "كفر الشيخ",
  "الدقهلية",
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
  "مطروح",
  "البحر الأحمر",
  "الوادي الجديد",
  "شمال سيناء",
  "جنوب سيناء",
];

export default function CheckoutPage() {

  const cart = useCart((state) => state.cart);
  const clear = useCart((state) => state.clear);

  const [customer, setCustomer] =
    useState<CustomerInfo>({
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

  const [paymentMethod, setPaymentMethod] =
    useState<"cod" | "instapay" | "vodafone">("cod");

  const [receipt, setReceipt] =
    useState<string | null>(null);

  const [coupon, setCoupon] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const subtotal = useMemo(() => {

    return cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

  }, [cart]);

  const shipping =
    subtotal >= 2000 ? 0 : 70;

  const discount = 0;

  const total =
    subtotal +
    shipping -
    discount;

  const update = (
    key: keyof CustomerInfo,
    value: string
  ) => {

    setCustomer((prev) => ({
      ...prev,
      [key]: value,
    }));

  };

  async function submit() {

    if (!cart.length) return;

    setLoading(true);

    const order = saveOrder({
      customer,
      products: cart,
      paymentMethod,
      receipt,
      coupon,
      subtotal,
      shipping,
      discount,
      total,
    });

    clear();

    window.location.href =
      "/order-success?id=" + order.id;

  }

  return (

    <main
      dir="rtl"
      className="min-h-screen bg-[#fafafa]"
    >

      {/* HEADER */}

      <header className="border-b bg-white">

        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-center">

          <h1 className="text-[30px] font-light tracking-[0.18em]">
            رمال الطائف
          </h1>

        </div>

      </header>

      {/* MOBILE SUMMARY */}

      <div className="border-b bg-[#f5f5f5] lg:hidden">

        <button
          className="flex h-14 w-full items-center justify-between px-5"
        >

          <span className="font-semibold">
            📦 ملخص الطلب
          </span>

          <span className="text-lg font-bold">
            {total.toLocaleString()} ج.م
          </span>

        </button>

      </div>

      {/* PAGE */}

      <div className="mx-auto max-w-[1400px]">

        <div className="grid lg:grid-cols-[58%_42%]">

          {/* LEFT */}

<div className="bg-white px-6 py-8 lg:border-l lg:border-[#e5e5e5] lg:px-16">

  <h2 className="mb-2 text-[34px] font-bold">
    معلومات التواصل
  </h2>

  <p className="mb-8 text-neutral-500">
    أدخل بيانات الشحن لإتمام الطلب
  </p>

  <div className="space-y-4">

    <input
      value={customer.name}
      onChange={(e) => update("name", e.target.value)}
      placeholder="الاسم بالكامل"
      className="h-[58px] w-full rounded-xl border border-[#d9d9d9] bg-white px-5 text-[15px] outline-none focus:border-black"
    />

    <input
      dir="ltr"
      value={customer.phone}
      onChange={(e) => update("phone", e.target.value)}
      placeholder="رقم الهاتف"
      className="h-[58px] w-full rounded-xl border border-[#d9d9d9] bg-white px-5 text-[15px] outline-none focus:border-black"
    />

    <input
      dir="ltr"
      value={customer.phone2}
      onChange={(e) => update("phone2", e.target.value)}
      placeholder="رقم هاتف احتياطي (اختياري)"
      className="h-[58px] w-full rounded-xl border border-[#d9d9d9] bg-white px-5 text-[15px] outline-none focus:border-black"
    />

    <select
      value={customer.governorate}
      onChange={(e) => update("governorate", e.target.value)}
      className="h-[58px] w-full rounded-xl border border-[#d9d9d9] bg-white px-5 outline-none"
    >

      <option value="">
        اختر المحافظة
      </option>

      {governorates.map((g) => (

        <option
          key={g}
          value={g}
        >
          {g}
        </option>

      ))}

    </select>

    <input
      value={customer.city}
      onChange={(e) => update("city", e.target.value)}
      placeholder="المدينة"
      className="h-[58px] w-full rounded-xl border border-[#d9d9d9] bg-white px-5 outline-none"
    />

    <input
      value={customer.address}
      onChange={(e) => update("address", e.target.value)}
      placeholder="العنوان بالكامل"
      className="h-[58px] w-full rounded-xl border border-[#d9d9d9] bg-white px-5 outline-none"
    />

    <input
      value={customer.building}
      onChange={(e) => update("building", e.target.value)}
      placeholder="رقم المبنى"
      className="h-[58px] w-full rounded-xl border border-[#d9d9d9] bg-white px-5 outline-none"
    />

    <input
      value={customer.floor}
      onChange={(e) => update("floor", e.target.value)}
      placeholder="الدور"
      className="h-[58px] w-full rounded-xl border border-[#d9d9d9] bg-white px-5 outline-none"
    />

    <input
      value={customer.apartment}
      onChange={(e) => update("apartment", e.target.value)}
      placeholder="رقم الشقة"
      className="h-[58px] w-full rounded-xl border border-[#d9d9d9] bg-white px-5 outline-none"
    />

    <textarea
      rows={4}
      value={customer.notes}
      onChange={(e) => update("notes", e.target.value)}
      placeholder="ملاحظات الطلب (اختياري)"
      className="w-full rounded-xl border border-[#d9d9d9] p-5 outline-none"
    />

  </div>

  <div className="my-10 border-t" />
  {/* PAYMENT */}

  <h2 className="mb-2 text-[34px] font-bold">
    طريقة الدفع
  </h2>

  <p className="mb-8 text-neutral-500">
    اختر وسيلة الدفع المناسبة
  </p>

  <div className="space-y-3">

    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#d9d9d9] p-4">

      <div>

        <p className="font-semibold">
          الدفع عند الاستلام
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          Cash On Delivery
        </p>

      </div>

      <input
        type="radio"
        checked={paymentMethod === "cod"}
        onChange={() =>
          setPaymentMethod("cod")
        }
      />

    </label>

    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#d9d9d9] p-4">

      <div>

        <p className="font-semibold">
          InstaPay
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          تحويل عبر InstaPay
        </p>

      </div>

      <input
        type="radio"
        checked={paymentMethod === "instapay"}
        onChange={() =>
          setPaymentMethod("instapay")
        }
      />

    </label>

    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#d9d9d9] p-4">

      <div>

        <p className="font-semibold">
          Vodafone Cash
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          تحويل عبر Vodafone Cash
        </p>

      </div>

      <input
        type="radio"
        checked={paymentMethod === "vodafone"}
        onChange={() =>
          setPaymentMethod("vodafone")
        }
      />

    </label>

  </div>

  {(paymentMethod === "instapay" ||
    paymentMethod === "vodafone") && (

    <div className="mt-6">

      <p className="mb-3 font-semibold">
        رفع صورة إيصال التحويل
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          const reader = new FileReader();

          reader.onload = () =>
            setReceipt(reader.result as string);

          reader.readAsDataURL(file);
        }}
      />

    </div>

  )}

  <div className="my-10 border-t" />

  <h2 className="mb-2 text-[34px] font-bold">
    كود الخصم
  </h2>

  <input
    value={coupon}
    onChange={(e) =>
      setCoupon(e.target.value)
    }
    placeholder="اكتب كود الخصم"
    className="
      h-[58px]
      w-full
      rounded-xl
      border
      border-[#d9d9d9]
      px-5
      outline-none
    "
  />

  <button
    onClick={submit}
    disabled={loading}
    className="
      mt-10
      h-16
      w-full
      rounded-xl
      bg-black
      text-lg
      font-semibold
      text-white
    "
  >
    {loading
      ? "جارى تنفيذ الطلب..."
      : "إتمام الطلب"}
  </button>

</div>
{/* RIGHT SIDE */}

<div className="bg-[#f7f7f7] px-6 py-8 lg:px-12">

  <div className="sticky top-6">

    <h2 className="mb-8 text-[34px] font-bold">
      ملخص الطلب
    </h2>

    <div className="space-y-6">

      {cart.map((item) => (

        <div
          key={item.id}
          className="flex items-start gap-4 border-b border-[#e5e5e5] pb-5"
        >

          <div className="relative h-20 w-20 overflow-hidden rounded-xl border bg-white">

            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-2"
            />

          </div>

          <div className="flex-1">

            <h3 className="font-semibold leading-6">
              {item.name}
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              الكمية × {item.qty}
            </p>

          </div>

          <div className="font-bold">
            {(item.price * item.qty).toLocaleString()} ج.م
          </div>

        </div>

      ))}

    </div>

    <div className="my-8 border-t" />

    <div className="space-y-4">

      <div className="flex justify-between">

        <span className="text-neutral-500">
          إجمالي المنتجات
        </span>

        <span>
          {subtotal.toLocaleString()} ج.م
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-neutral-500">
          الشحن
        </span>

        <span>
          {shipping === 0
            ? "مجاني"
            : `${shipping} ج.م`}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-neutral-500">
          الخصم
        </span>

        <span className="text-green-600">
          - {discount} ج.م
        </span>

      </div>

    </div>

    <div className="my-8 border-t" />

    <div className="flex items-center justify-between">

      <span className="text-xl font-bold">
        الإجمالي
      </span>

      <span className="text-3xl font-bold">
        {total.toLocaleString()} ج.م
      </span>

    </div>

  </div>

</div>

</div>

</div>

</main>

);
}