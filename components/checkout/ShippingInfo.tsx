"use client";

interface Props {
  shipping: number;
}

export default function ShippingInfo({
  shipping,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6">

      <h2 className="mb-6 text-2xl font-semibold">
        Shipping Method
      </h2>

      <label
        className="
          flex
          cursor-pointer
          items-center
          justify-between
          rounded-2xl
          border
          border-black
          bg-neutral-50
          p-5
        "
      >
        <div>

          <h3 className="font-semibold">
            Standard Shipping
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            Delivery within 2 - 5 business days
          </p>

        </div>

        <div className="text-right">

          {shipping === 0 ? (
            <span className="text-lg font-bold text-green-600">
              FREE
            </span>
          ) : (
            <span className="text-lg font-bold">
              {shipping} EGP
            </span>
          )}

        </div>

      </label>

    </div>
  );
}