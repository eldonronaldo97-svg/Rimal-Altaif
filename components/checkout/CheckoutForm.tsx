"use client";

import { Dispatch, SetStateAction } from "react";

import { CustomerInfo } from "@/lib/orders";

import CustomerInfoForm from "./CustomerInfo";
import PaymentMethods from "./PaymentMethods";
import UploadReceipt from "./UploadReceipt";
import CouponBox from "./CouponBox";

interface Props {
  customer: CustomerInfo;
  setCustomer: Dispatch<SetStateAction<CustomerInfo>>;

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
    <div className="space-y-12">

      {/* CONTACT */}

      <section>

        <div className="mb-8">

          <h2 className="text-[34px] font-bold tracking-tight">
            معلومات التواصل
          </h2>

          <p className="mt-2 text-neutral-500">
            أدخل بياناتك لإتمام الطلب.
          </p>

        </div>

        <CustomerInfoForm
          customer={customer}
          setCustomer={setCustomer}
          errors={{}}
        />

      </section>

      <hr className="border-neutral-200" />

      {/* PAYMENT */}
            <section>

        <div className="mb-8">

          <h2 className="text-[34px] font-bold tracking-tight">
            طريقة الدفع
          </h2>

          <p className="mt-2 text-neutral-500">
            اختر وسيلة الدفع المناسبة لك.
          </p>

        </div>

        <PaymentMethods
          value={paymentMethod}
          onChange={setPaymentMethod}
        />

        {(paymentMethod === "instapay" ||
          paymentMethod === "vodafone") && (

          <div className="mt-8">

            <h3 className="mb-5 text-xl font-semibold">
              رفع إيصال التحويل
            </h3>

            <UploadReceipt
              value={receipt}
              onChange={setReceipt}
            />

          </div>

        )}

      </section>

      <hr className="border-neutral-200" />

      {/* COUPON */}

      <section>

        <div className="mb-8">

          <h2 className="text-[34px] font-bold tracking-tight">
            كود الخصم
          </h2>

          <p className="mt-2 text-neutral-500">
            إذا كان لديك كوبون خصم أدخله هنا.
          </p>

        </div>

        <CouponBox
          value={coupon}
          onChange={setCoupon}
        />

      </section>

      <hr className="border-neutral-200" />

      {/* COMPLETE ORDER */}
            <section>

        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="
            flex
            h-16
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-black
            text-lg
            font-semibold
            text-white
            transition-all
            hover:bg-neutral-800
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "جارٍ تأكيد الطلب..."
            : "إتمام الطلب"}
        </button>

        <p className="mt-4 text-center text-sm text-neutral-500">
          بالضغط على زر إتمام الطلب فإنك توافق على تنفيذ الطلب
          وفقًا لبيانات الشحن التي أدخلتها.
        </p>

      </section>

    </div>
  );
}