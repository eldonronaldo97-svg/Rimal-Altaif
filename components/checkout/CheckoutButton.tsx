"use client";

import { Loader2, ShoppingBag } from "lucide-react";

interface Props {
  loading: boolean;
  disabled?: boolean;
}

export default function CheckoutButton({
  loading,
  disabled = false,
}: Props) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="
        flex h-14 w-full items-center justify-center gap-2
        rounded-2xl bg-black text-white font-semibold
        transition-all duration-200
        hover:bg-neutral-800
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Placing Order...</span>
        </>
      ) : (
        <>
          <ShoppingBag className="h-5 w-5" />
          <span>Complete Order</span>
        </>
      )}
    </button>
  );
}