"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/store";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  quantity: number;
  price: number;
}

export default function ProductCard({
  id,
  image,
  name,
  quantity,
  price,
}: ProductCardProps) {
  const increase = useCart((s) => s.increase);
  const decrease = useCart((s) => s.decrease);
  const remove = useCart((s) => s.remove);

  return (
    <div className="flex gap-4 border-b border-[#ECECEC] pb-6">

      <div className="relative h-20 w-20 flex-shrink-0">

        <div className="relative h-full w-full overflow-hidden rounded-xl border bg-white">

          <Image
            src={image || "/placeholder.png"}
            alt={name}
            fill
            sizes="80px"
            className="object-cover"
          />

        </div>

        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-700 text-xs text-white">
          {quantity}
        </span>

      </div>

      <div className="flex flex-1 flex-col">

        <div className="flex items-start justify-between">

          <h3 className="font-semibold leading-6">
            {name}
          </h3>

          <button
            type="button"
            onClick={() => remove(id)}
            className="text-neutral-400 transition hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>

        </div>

        <p className="mt-2 text-sm text-neutral-500">
          {price} ج
        </p>

        <div className="mt-4 flex items-center gap-2">

          <button
            type="button"
            onClick={() => decrease(id)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-neutral-100"
          >
            <Minus size={15} />
          </button>

          <span className="w-8 text-center font-semibold">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => increase(id)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-neutral-100"
          >
            <Plus size={15} />
          </button>

        </div>

      </div>

    </div>
  );
}