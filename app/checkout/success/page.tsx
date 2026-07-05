"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Home, ShoppingBag } from "lucide-react";
import { getOrderById } from "@/lib/orders";

export default function SuccessPage() {
  const params = useSearchParams();

  const id = params.get("id");

  const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">
        <div className="text-center">

          <h1 className="text-3xl font-bold">
            Order Not Found
          </h1>

          <p className="mt-3 text-neutral-500">
            We couldn't find this order.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-black px-6 text-white"
          >
            Back Home
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">

      <div className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">

        <div className="flex justify-center">

          <CheckCircle2
            className="text-green-500"
            size={80}
          />

        </div>

        <h1 className="mt-6 text-center text-4xl font-bold">
          Thank You!
        </h1>

        <p className="mt-3 text-center text-neutral-500">
          Your order has been placed successfully.
        </p>

        <div className="my-10 border-t" />

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-neutral-500">
              Order Number
            </span>

            <span className="font-semibold">
              {order.orderNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500">
              Customer
            </span>

            <span className="font-semibold">
              {order.customer.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500">
              Phone
            </span>

            <span className="font-semibold">
              {order.customer.phone}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500">
              Payment
            </span>

            <span className="font-semibold capitalize">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500">
              Status
            </span>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
              {order.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500">
              Total
            </span>

            <span className="text-xl font-bold">
              {order.total.toLocaleString()} EGP
            </span>
          </div>

        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">

          <Link
            href="/"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black text-white transition hover:bg-neutral-800"
          >
            <Home size={20} />
            Back Home
          </Link>

          <Link
            href="/shop"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-neutral-300 transition hover:border-black"
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
}