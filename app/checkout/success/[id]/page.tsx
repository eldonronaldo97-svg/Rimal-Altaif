"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  Home,
  ShoppingBag,
  Calendar,
  CreditCard,
  User,
  Phone,
  Package,
} from "lucide-react";

import { getOrderById } from "@/lib/orders";

export default function SuccessPage() {
  const params = useParams();

const id = Array.isArray(params.id)
  ? params.id[0]
  : params.id;

const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Order Not Found
          </h1>

          <p className="mt-4 text-neutral-500">
            This order doesn't exist.
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
    <main className="mx-auto max-w-5xl px-4 py-12">

      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col items-center">

          <CheckCircle2
            size={80}
            className="text-green-500"
          />

          <h1 className="mt-6 text-5xl font-bold">
            Thank You!
          </h1>

          <p className="mt-3 text-neutral-500">
            Your order has been placed successfully.
          </p>

        </div>

        <div className="my-10 border-t" />

        <div className="grid gap-5 md:grid-cols-2">

          <InfoCard
            icon={<Package size={20} />}
            title="Order Number"
            value={order.orderNumber}
          />

          <InfoCard
            icon={<CreditCard size={20} />}
            title="Payment"
            value={order.paymentMethod}
          />

          <InfoCard
            icon={<Calendar size={20} />}
            title="Order Date"
            value={new Date(
              order.createdAt
            ).toLocaleString()}
          />

          <InfoCard
            icon={<User size={20} />}
            title="Customer"
            value={order.customer.name}
          />

          <InfoCard
            icon={<Phone size={20} />}
            title="Phone"
            value={order.customer.phone}
          />

          <InfoCard
            icon={<Package size={20} />}
            title="Status"
            value={order.status}
          />

        </div>

        <div className="my-10 border-t" />

        <h2 className="mb-5 text-2xl font-semibold">
          Order Items
        </h2>

        <div className="space-y-4">

          {order.products.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border p-4"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-xl border object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-neutral-500">
                    Qty: {item.qty}
                  </p>

                </div>

              </div>

              <div className="font-bold">
                {(item.price * item.qty).toLocaleString()} EGP
              </div>

            </div>

          ))}

        </div>

        <div className="my-10 border-t" />

        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>{order.subtotal.toLocaleString()} EGP</span>
        </div>

        <div className="mt-3 flex justify-between text-lg">
          <span>Shipping</span>
          <span>{order.shipping.toLocaleString()} EGP</span>
        </div>

        <div className="mt-3 flex justify-between text-lg text-green-600">
          <span>Discount</span>
          <span>- {order.discount.toLocaleString()} EGP</span>
        </div>

        <div className="my-8 border-t" />

        <div className="flex justify-between text-3xl font-bold">
          <span>Total</span>
          <span>{order.total.toLocaleString()} EGP</span>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">

          <Link
            href="/"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black text-white transition hover:bg-neutral-800"
          >
            <Home size={20} />
            Back Home
          </Link>

          <Link
            href="/shop"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl border transition hover:border-black"
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border p-5">

      <div className="rounded-xl bg-neutral-100 p-3">
        {icon}
      </div>

      <div>

        <p className="text-sm text-neutral-500">
          {title}
        </p>

        <p className="font-semibold">
          {value}
        </p>

      </div>

    </div>
  );
}