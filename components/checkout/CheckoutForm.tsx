"use client";

import { Dispatch, SetStateAction } from "react";

import { CustomerInfo } from "@/lib/orders";

import CustomerInfoForm from "./CustomerInfo";
import PaymentMethods from "./PaymentMethods";
import UploadReceipt from "./UploadReceipt";
import CouponBox from "./CouponBox";

interface Props {
  customer: CustomerInfo;
  setCustomer: Dispatch<
    SetStateAction<CustomerInfo>
  >;

  paymentMethod:
    | "cod"
    | "instapay"
    | "vodafone";

  setPaymentMethod: Dispatch<
    SetStateAction<
      "cod" | "instapay" | "vodafone"
    >
  >;

  receipt: string | null;

  setReceipt: Dispatch<
    SetStateAction<string | null>
  >;

  coupon: string;

  setCoupon: Dispatch<
    SetStateAction<string>
  >;

  loading: boolean;

  submit: () => void;
}

export default function CheckoutForm({
  customer,
  setCustomer,

  paymentMethod,
  setPaymentMethod,

  receipt,
  setReceipt,

  coupon,
  setCoupon,

  loading,

  submit,
}: Props) {
  return (
    <div className="space-y-6">

      <div className="rounded-3xl border bg-white p-6">

        <div className="mb-6">

          <h1 className="text-3xl font-bold">
            Checkout
          </h1>

          <p className="mt-2 text-neutral-500">
            Complete your order
          </p>

        </div>

        <CustomerInfoForm
          customer={customer}
          setCustomer={setCustomer}
          errors={{}}
        />

      </div>

      <div className="rounded-3xl border bg-white p-6">

        <h2 className="mb-6 text-2xl font-semibold">
          Payment Method
        </h2>

        <PaymentMethods
          value={paymentMethod}
          onChange={setPaymentMethod}
        />

      </div>
            {(paymentMethod === "instapay" ||
        paymentMethod === "vodafone") && (
        <div className="rounded-3xl border bg-white p-6">

          <h2 className="mb-6 text-2xl font-semibold">
            Upload Receipt
          </h2>

          <UploadReceipt
            value={receipt}
            onChange={setReceipt}
          />

        </div>
      )}

      <div className="rounded-3xl border bg-white p-6">

        <h2 className="mb-6 text-2xl font-semibold">
          Discount
        </h2>

        <CouponBox
          value={coupon}
          onChange={setCoupon}
        />

      </div>

            <button
        type="button"
        onClick={submit}
        disabled={loading}
        className="
          h-14
          w-full
          rounded-2xl
          bg-black
          text-lg
          font-semibold
          text-white
          transition
          hover:bg-neutral-800
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading
          ? "Processing..."
          : "Complete Order"}
      </button>

    </div>
  );
}