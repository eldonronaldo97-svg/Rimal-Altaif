"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import ProductCard from "./ProductCard";
import CouponBox from "./CouponBox";
import OrderTotals from "./OrderTotals";
import { useCart } from "@/lib/store";

export default function OrderSummary() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cart = useCart((state) => state.cart);

  const shipping = 70;

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  if (!mounted) {
    return <div className="h-full p-10" />;
  }

  return (
    <>
      {/* Mobile */}

      <div className="lg:hidden">

        <button
          onClick={() => setOpen(!open)}
          className="flex h-16 w-full items-center justify-between border-b bg-white px-5"
        >
          <div className="flex items-center gap-2">

            <ShoppingBag size={18} />

            <span className="font-semibold">
              ملخص الطلب
            </span>

            {open ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}

          </div>

          <span className="font-bold">
            {subtotal + shipping} ج
          </span>

        </button>

        {open && (
          <div className="p-6">
            <SummaryBody
              cart={cart}
              subtotal={subtotal}
              shipping={shipping}
            />
          </div>
        )}

      </div>

      {/* Desktop */}

      <div className="hidden lg:block">

        <div className="sticky top-0 p-10">

          <SummaryBody
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
          />

        </div>

      </div>
    </>
  );
}

type SummaryBodyProps = {
  cart: {
    id: string;
    name: string;
    image: string;
    price: number;
    qty: number;
  }[];
  subtotal: number;
  shipping: number;
};

function SummaryBody({
  cart,
  subtotal,
  shipping,
}: SummaryBodyProps) {
  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">

        <ShoppingBag
          size={46}
          className="mx-auto mb-4 text-neutral-400"
        />

        <h3 className="text-lg font-semibold">
          سلة المشتريات فارغة
        </h3>

        <p className="mt-2 text-sm text-neutral-500">
          أضف بعض المنتجات لإتمام الطلب.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="space-y-6">

        {cart.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            quantity={item.qty}
            price={item.price}
          />
        ))}

      </div>

      <CouponBox />

      <OrderTotals
        subtotal={subtotal}
        shipping={shipping}
      />

    </div>
  );
}