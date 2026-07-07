"use client";

interface Props {
  value: string;

  onChange: (
    value: string
  ) => void;
}

export default function CouponBox({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex gap-3">

      <input
        type="text"
        placeholder="Coupon Code"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          h-12
          flex-1
          rounded-xl
          border
          border-neutral-300
          bg-white
          px-4
          outline-none
          transition
          focus:border-black
          focus:ring-2
          focus:ring-black/10
        "
      />

      <button
        type="button"
        className="
          h-12
          rounded-xl
          border
          border-black
          px-6
          font-medium
          transition
          hover:bg-black
          hover:text-white
        "
      >
        Apply
      </button>

    </div>
  );
}