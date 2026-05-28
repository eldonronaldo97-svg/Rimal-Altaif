"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductPage() {
  const { id } = useParams();

  const product = products.find(
    (p) => p.id === id
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Product not found
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen pb-32">
      
      {/* PRODUCT */}
      <div className="max-w-md mx-auto px-4 pt-4">

        {/* IMAGE */}
        <div className="relative bg-[#f7f7f7] mb-8">

          {!product.stock && (
            <div className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] tracking-[2px] uppercase px-3 py-2">
              Sold Out
            </div>
          )}

          <img
            src={product.image}
            alt={product.name}
            className="
              w-full
              h-[380px]
              object-contain
              p-5
            "
          />
        </div>

        {/* INFO */}
        <div className="text-center">

          {/* BRAND */}
          <p className="
            text-[10px]
            tracking-[4px]
            uppercase
            text-zinc-500
            mb-3
          ">
            {product.brand}
          </p>

          {/* NAME */}
          <h1 className="
            text-[30px]
            leading-[1.1]
            font-light
            mb-4
          ">
            {product.name}
          </h1>

          {/* PRICE */}
          <p className="
            text-[22px]
            tracking-[2px]
            mb-5
          ">
            EGP {product.price}
          </p>

          {/* DESCRIPTION */}
          <p className="
            text-[14px]
            leading-7
            text-zinc-600
            mb-8
          ">
            Premium luxury fragrance with elegant
            performance, long-lasting scent and a
            sophisticated signature experience.
          </p>

          {/* EXTRA */}
          <div className="
            border-t
            border-zinc-200
            pt-6
            text-sm
            text-zinc-700
          ">
            <p className="mb-3">
              Category: {product.category}
            </p>

            <p>
              Availability:{" "}
              {product.stock
                ? "In Stock"
                : "Sold Out"}
            </p>
          </div>
        </div>

        {/* RELATED */}
        <div className="mt-20">

          <h2 className="
            text-[28px]
            font-light
            text-center
            mb-6
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
                  className="text-black no-underline"
                >
                  <div className="bg-[#f7f7f7] p-3">

                    <img
                      src={p.image}
                      alt={p.name}
                      className="
                        w-full
                        h-[170px]
                        object-contain
                      "
                    />

                    <h3 className="
                      mt-3
                      text-[13px]
                      font-medium
                      leading-5
                    ">
                      {p.name}
                    </h3>

                    <p className="
                      mt-1
                      text-[12px]
                      text-zinc-500
                    ">
                      EGP {p.price}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* FIXED BUTTONS */}
      <div className="
        fixed
        bottom-0
        left-0
        w-full
        bg-white
        border-t
        border-zinc-200
        p-3
        grid
        grid-cols-2
        gap-2
        z-50
      ">
        <button className="
          h-[52px]
          bg-black
          text-white
          text-[11px]
          uppercase
          tracking-[2px]
        ">
          Add To Cart
        </button>

        <a
          href="https://wa.me/201000000000"
          target="_blank"
          className="
            h-[52px]
            border
            border-black
            flex
            items-center
            justify-center
            text-[11px]
            uppercase
            tracking-[2px]
          "
        >
          WhatsApp
        </a>
      </div>
    </main>
  );
}