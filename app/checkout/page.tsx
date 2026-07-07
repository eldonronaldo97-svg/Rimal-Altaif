"use client";

import { useMemo, useState } from "react";

import { useCart } from "@/lib/store";
import { saveOrder, CustomerInfo } from "@/lib/orders";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import ShippingInfo from "@/components/checkout/ShippingInfo";

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
    useState<"cod" | "instapay" | "vodafone">(
      "cod"
    );

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
      "/order-success?id=" +
      order.id;
  }

  return (
    <main
  dir="rtl"
  className="min-h-screen bg-[#f8f8f8] text-right"
>

      <div className="border-b bg-white -mx-6 -mt-8 mb-8 lg:-mx-10">

  <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

    <div className="flex items-center gap-4">

      <img
        src="/logo.png"
        alt="Rimal Altaif"
        className="h-12 w-auto"
      />

      <div>

        <h1 className="text-xl font-semibold">
          رمال الطائف
        </h1>

        <p className="text-sm text-neutral-500">
          عطور أصلية 100%
        </p>

      </div>

    </div>

    <div className="text-left">

      <p className="text-xs text-neutral-500">
        إجمالي الطلب
      </p>

      <p className="text-3xl font-bold">
        {total} ج.م
      </p>

    </div>

  </div>

</div>

<div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">

<div className="mb-6 rounded-xl border bg-white lg:hidden">

  <button
    type="button"
    className="flex w-full items-center justify-between p-4 text-lg font-semibold"
  >
    <span>ملخص الطلب</span>

    <span>{total} ج.م</span>

  </button>

</div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] items-start">

          <div className="w-full max-w-3xl space-y-8">

            <ShippingInfo
              shipping={shipping}
            />

            <CheckoutForm
              customer={customer}
              setCustomer={setCustomer}
              paymentMethod={paymentMethod}
              setPaymentMethod={
                setPaymentMethod
              }
              receipt={receipt}
              setReceipt={setReceipt}
              coupon={coupon}
              setCoupon={setCoupon}
              loading={loading}
              submit={submit}
            />

          </div>

          <OrderSummary
            products={cart}
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            total={total}
          />

        </div>

      </div>

    </main>
  );
}