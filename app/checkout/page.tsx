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
    <main className="min-h-screen bg-[#f8f8f8]">

      <div className="mx-auto max-w-7xl px-4 py-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

          <div className="space-y-6">

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