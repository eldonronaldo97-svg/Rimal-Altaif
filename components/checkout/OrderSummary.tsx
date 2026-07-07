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
    <aside
      className="
        h-fit
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-8
        lg:sticky
        lg:top-6
      "
    >
      <h2 className="mb-6 text-2xl font-bold">
        ملخص الطلب
      </h2>

      <div className="space-y-5">

        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4"
          >
            <div
  className="overflow-hidden rounded-2xl border"
  style={{
    width: 80,
    height: 80,
    minWidth: 80,
    position: "relative",
  }}
>
  <Image
    src={product.image}
    alt={product.name}
    width={80}
    height={80}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
    }}
  />
</div>

            <div className="flex-1">

              <h3 className="font-semibold leading-5">
                {product.name}
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                Qty : {product.qty}
              </p>

            </div>

            <div className="font-bold">
              {(product.price * product.qty).toLocaleString()}
              {" "}
              EGP
            </div>

          </div>
        ))}

      </div>

      <div className="my-6 border-t" />

      <div className="space-y-4">

                <div className="flex items-center justify-between">
          <span className="text-neutral-500">
            إجمالي المنتجات
          </span>

          <span className="font-medium">
            {subtotal.toLocaleString()} EGP
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500">
            الشحن
          </span>

          <span className="font-medium">
            {shipping === 0
              ? "Free"
              : `${shipping.toLocaleString()} EGP`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500">
            الخصم
          </span>

          <span className="font-medium text-green-600">
            - {discount.toLocaleString()} EGP
          </span>
        </div>

      </div>

      <div className="my-6 border-t" />

      <div className="flex items-center justify-between">

        <span className="text-xl font-bold">
          الإجمالي
        </span>

        <span className="text-2xl font-bold">
          {total.toLocaleString()} EGP
        </span>

      </div>

    </aside>
  );
}