"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomerForm from "@/components/checkout/CustomerForm";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import TransferUpload from "@/components/checkout/TransferUpload";
import CouponCard from "@/components/checkout/CouponCard";
import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutButton from "@/components/checkout/CheckoutButton";

import {
  checkoutSchema,
  CheckoutForm,
} from "@/lib/checkout/validation";

import {
  calculateDiscount,
} from "@/lib/checkout/discount";

import {
  calculateShipping,
} from "@/lib/checkout/shipping";

import {
  PaymentMethod,
} from "@/lib/checkout/types";

import {
  useCart,
} from "@/lib/store";

import {
  saveOrder,
} from "@/lib/orders";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, clear } = useCart();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cod");

  const [receipt, setReceipt] =
    useState<File | null>(null);

  const [coupon, setCoupon] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [couponApplied, setCouponApplied] =
    useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );
  }, [cart]);

  const shipping = useMemo(() => {
    return calculateShipping();
  }, []);

  const discount = useMemo(() => {
    if (!couponApplied) return 0;

    return calculateDiscount(
      subtotal,
      coupon
    );
  }, [
    subtotal,
    coupon,
    couponApplied,
  ]);

  const total =
    subtotal +
    shipping -
    discount;

  function applyCoupon() {
    setCouponApplied(true);
  }

  async function onSubmit(
    data: CheckoutForm
  ) {
    try {
      setLoading(true);

      if (
        paymentMethod !== "cod" &&
        !receipt
      ) {
        alert(
          "Please upload payment receipt."
        );

        return;
      }

      const order = saveOrder({
        customer: data,

        products: cart,

        paymentMethod,

        receipt: receipt
          ? receipt.name
          : null,

        coupon,

        subtotal,

        shipping,

        discount,

        total,
      });

      clear();

      reset();

      router.push(`/checkout/success/${order.id}`);
    } finally {
      setLoading(false);
    }
  }
    return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 lg:grid-cols-3"
      >

        {/* Left Side */}

        <div className="space-y-6 lg:col-span-2">

          <CustomerForm
            register={register}
            watch={watch}
            errors={errors}
          />

          <PaymentMethods
            value={paymentMethod}
            onChange={setPaymentMethod}
          />

          <TransferUpload
            paymentMethod={paymentMethod}
            receipt={receipt}
            onReceiptChange={setReceipt}
          />

          <CouponCard
            coupon={coupon}
            onCouponChange={setCoupon}
            onApply={applyCoupon}
            applied={couponApplied}
            discount={discount}
          />

          <CheckoutButton
            loading={loading}
            disabled={cart.length === 0}
          />

        </div>

        {/* Right Side */}

        <div>

          <OrderSummary
            products={cart}
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            total={total}
          />

        </div>

      </form>

    </main>
  );
}