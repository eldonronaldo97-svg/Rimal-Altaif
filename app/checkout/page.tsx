"use client";

import { useMemo, useState } from "react";

import { useCart } from "@/lib/store";
import { saveOrder, CustomerInfo } from "@/lib/orders";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
// import ShippingInfo from "@/components/checkout/ShippingInfo";

export default function CheckoutPage() {
  const cart = useCart((state) => state.cart);
  const clear = useCart((state) => state.clear);

  const [customer, setCustomer] = useState<CustomerInfo>({
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

  const [paymentMethod, setPaymentMethod] = useState<
    "cod" | "instapay" | "vodafone"
  >("cod");

  const [receipt, setReceipt] = useState<string | null>(null);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }, [cart]);

  const shipping = subtotal >= 2000 ? 0 : 70;
  const discount = 0;
  const total = subtotal + shipping - discount;

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
      {/* Header */}

      <div className="bg-white border-b">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-center">

          <h1
            className="
              font-brand
              text-[28px]
              font-light
              tracking-[0.15em]
            "
          >
            رمال الطائف
          </h1>

        </div>

      </div>

      {/* Mobile Summary */}

      <div className="border-b bg-[#f5f5f5] lg:hidden">

        <button
          className="flex h-14 w-full items-center justify-between px-5"
        >
          <span className="font-semibold">
            ملخص الطلب
          </span>

          <span className="font-bold">
            {total} ج.م
          </span>

        </button>

      </div>

      {/* Checkout */}

      <div className="mx-auto max-w-[1400px]">

        <div className="grid lg:grid-cols-[58%_42%]">

          {/* FORM */}

          <div
            className="
              bg-white
              px-5
              py-8
              lg:border-l
              lg:border-[#e5e5e5]
              lg:px-16
            "
          >
            <CheckoutForm
              customer={customer}
              setCustomer={setCustomer}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              receipt={receipt}
              setReceipt={setReceipt}
              coupon={coupon}
              setCoupon={setCoupon}
              loading={loading}
              submit={submit}
            />
          </div>

          {/* SUMMARY */}

          <div
            className="
              bg-[#fafafa]
              px-5
              py-8
              lg:px-12
            "
          >
            <OrderSummary
              products={cart}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
            />
          </div>

        </div>

      </div>

    </main>
  );
}