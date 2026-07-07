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
    sticky
    top-6
    h-fit
    rounded-2xl
    border
    border-[#e5e5e5]
    bg-white
    p-7
    shadow-sm
  "
>
      <h2 className="mb-8 text-3xl font-bold">
  ملخص الطلب
</h2>

      <div className="space-y-5">

        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-start gap-4 pb-5 border-b border-neutral-200"
          >
            <div
  className="
    relative
    h-20
    w-20
    overflow-hidden
    rounded-xl
    border
    bg-[#fafafa]
    flex-shrink-0
  "
>
  <Image
    src={product.image}
    alt={product.name}
    width={80}
    height={80}
    className="h-full w-full object-contain p-2"
  />
</div>

            <div className="flex-1">

              <h3 className="text-[15px] font-semibold leading-6">
                {product.name}
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                الكمية × {product.qty}
              </p>

            </div>

            <div className="text-lg font-bold">
              {(product.price * product.qty).toLocaleString()}
              {" "}
              EGP
            </div>

          </div>
        ))}

      </div>

      <div className="my-6 border-t" />

      <div className="space-y-5 text-[15px]">

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

        <span className="text-3xl font-bold">
          {total.toLocaleString()} EGP
        </span>

      </div>

    </aside>
  );
}