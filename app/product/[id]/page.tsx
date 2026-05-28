"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";

export default function ProductPage() {
  const { id } = useParams();

  const product = products.find(
    (p) => p.id === id
  );

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen pb-32">

      {/* PRODUCT */}
      <div className="max-w-md mx-auto">

        {/* IMAGE */}
        <div className="bg-[#f7f7f7] relative">

          {!product.stock && (
            <div className="
              absolute
              top-3
              left-3
              z-10
              bg-black
              text-white
              text-[10px]
              tracking-[2px]
              uppercase
              px-3
              py-2
            ">
              Sold Out
            </div>
          )}

          <img
            src={product.image}
            alt={product.name}
            className="
              w-full
              h-[420px]
              object-contain
              p-6
            "
          />
        </div>

        {/* INFO */}
        <div className="px-4 py-6">

          {/* BRAND */}
          <p className="
            text-[10px]
            uppercase
            tracking-[4px]
            text-zinc-500
            mb-3
          ">
            {product.brand}
          </p>

          {/* NAME */}
          <h1 className="
            text-[28px]
            font-light
            leading-[1.1]
            mb-3
          ">
            {product.name}
          </h1>

          {/* PRICE */}
          <p className="
            text-[22px]
            tracking-[1px]
            mb-6
          ">
            EGP {product.price}
          </p>

          {/* DESCRIPTION */}
          <p className="
            text-[14px]
            text-zinc-600
            leading-7
            mb-8
          ">
            Premium luxury fragrance with
            long-lasting performance and
            elegant signature scent.
          </p>

          {/* QUANTITY */}
          <div className="mb-5">

            <p className="
              text-[12px]
              uppercase
              tracking-[2px]
              mb-3
            ">
              Quantity
            </p>

            <div className="
              flex
              items-center
              border
              border-zinc-300
              w-[120px]
              h-[46px]
            ">
              <button
                onClick={() =>
                  setQty((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="flex-1 h-full text-xl"
              >
                -
              </button>

              <div className="
                flex-1
                text-center
                text-sm
              ">
                {qty}
              </div>

              <button
                onClick={() =>
                  setQty((prev) => prev + 1)
                }
                className="flex-1 h-full text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="
            flex
            flex-col
            gap-3
          ">
            <button className="
              h-[54px]
              bg-black
              text-white
              uppercase
              tracking-[2px]
              text-[11px]
            ">
              Add To Cart
            </button>

            <button className="
              h-[54px]
              border
              border-black
              uppercase
              tracking-[2px]
              text-[11px]
            ">
              Buy It Now
            </button>
          </div>

          {/* BENEFITS */}
          <div className="
            mt-10
            grid
            gap-3
          ">
            <div className="
              border
              border-zinc-200
              p-4
            ">
              <p className="
                text-sm
                font-medium
                mb-1
              ">
                Free Shipping
              </p>

              <p className="
                text-[13px]
                text-zinc-500
              ">
                Orders over EGP 3000
              </p>
            </div>

            <div className="
              border
              border-zinc-200
              p-4
            ">
              <p className="
                text-sm
                font-medium
                mb-1
              ">
                Cash On Delivery
              </p>

              <p className="
                text-[13px]
                text-zinc-500
              ">
                Available all over Egypt
              </p>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="px-4 mt-14">

          <h2 className="
            text-[26px]
            font-light
            mb-5
          ">
            You May Also Like
          </h2>

          <div className="
            grid
            grid-cols-2
            gap-[6px]
          ">
            {products
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="
                    no-underline
                    text-black
                  "
                >
                  <div className="
                    bg-[#f7f7f7]
                    p-3
                  ">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="
                        w-full
                        h-[160px]
                        object-contain
                      "
                    />

                    <h3 className="
                      text-[13px]
                      mt-3
                      leading-5
                    ">
                      {p.name}
                    </h3>

                    <p className="
                      text-[12px]
                      text-zinc-500
                      mt-1
                    ">
                      EGP {p.price}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}