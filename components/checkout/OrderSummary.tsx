"use client";

import Image from "next/image";
import { CartProduct } from "@/lib/store";

interface Props {
  products: CartProduct[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

export default function OrderSummary({
  products,
  subtotal,
  shipping,
  discount,
  total,
}: Props) {
  return (
    <div className="sticky top-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-semibold">
        Order Summary
      </h2>

      {/* Products */}

      <div className="space-y-4">

        {products.map((product) => (

          <div
            key={product.id}
            className="flex items-center gap-4"
          >

            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border">

              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />

            </div>

            <div className="flex-1">

              <h3 className="line-clamp-2 font-medium">
                {product.name}
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Qty: {product.qty}
              </p>

            </div>

            <div className="font-semibold">
              {(product.price * product.qty).toLocaleString()} EGP
            </div>

          </div>

        ))}

      </div>

      <div className="my-6 border-t" />

      {/* Totals */}

      <div className="space-y-3">

        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>{subtotal.toLocaleString()} EGP</span>
        </div>

        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          <span>{shipping.toLocaleString()} EGP</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>- {discount.toLocaleString()} EGP</span>
        </div>

      </div>

      <div className="my-6 border-t" />

      <div className="flex items-center justify-between">

        <span className="text-lg font-semibold">
          Total
        </span>

        <span className="text-2xl font-bold">
          {total.toLocaleString()} EGP
        </span>

      </div>

    </div>
  );
}