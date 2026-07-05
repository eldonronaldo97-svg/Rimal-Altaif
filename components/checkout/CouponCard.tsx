"use client";

import { TicketPercent } from "lucide-react";

interface Props {
  coupon: string;
  onCouponChange: (value: string) => void;
  onApply: () => void;

  loading?: boolean;
  applied?: boolean;
  discount?: number;
}

export default function CouponCard({
  coupon,
  onCouponChange,
  onApply,
  loading = false,
  applied = false,
  discount = 0,
}: Props) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100">
          <TicketPercent size={20} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Coupon
          </h2>

          <p className="text-sm text-neutral-500">
            Have a discount code?
          </p>
        </div>

      </div>

      <div className="flex gap-3">

        <input
          value={coupon}
          onChange={(e) => onCouponChange(e.target.value)}
          placeholder="Enter coupon code"
          className="h-14 flex-1 rounded-xl border border-neutral-300 px-4 outline-none transition focus:border-black"
        />

        <button
          type="button"
          disabled={loading}
          onClick={onApply}
          className="h-14 rounded-xl bg-black px-6 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Apply"}
        </button>

      </div>

      {applied && (
        <div className="mt-4 rounded-xl bg-green-50 p-4 text-green-700">
          🎉 Coupon applied successfully

          {discount > 0 && (
            <span className="ml-2 font-semibold">
              (-{discount.toLocaleString()} EGP)
            </span>
          )}
        </div>
      )}

    </div>
  );
}