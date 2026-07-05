"use client";

import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { PaymentMethod } from "@/lib/checkout/types";

interface Props {
  paymentMethod: PaymentMethod;
  receipt: File | null;
  onReceiptChange: (file: File | null) => void;
}

const INSTAPAY_NUMBER = "01012345678";
const VODAFONE_NUMBER = "01012345678";

export default function TransferUpload({
  paymentMethod,
  receipt,
  onReceiptChange,
}: Props) {
  if (paymentMethod === "cod") return null;

  const isInstapay = paymentMethod === "instapay";

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-semibold">
        Payment Details
      </h2>

      {/* QR */}

      <div className="mb-6 flex justify-center">
        <Image
          src={
            isInstapay
              ? "/payments/instapay-qr.png"
              : "/payments/vodafone-qr.png"
          }
          alt="QR Code"
          width={220}
          height={220}
          className="rounded-2xl border"
        />
      </div>

      {/* Number */}

      <div className="mb-6 rounded-2xl bg-neutral-100 p-4 text-center">

        <p className="text-sm text-neutral-500">
          Transfer To
        </p>

        <p className="mt-2 text-xl font-bold tracking-wider">
          {isInstapay
            ? INSTAPAY_NUMBER
            : VODAFONE_NUMBER}
        </p>

      </div>

      {/* Upload */}

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 p-8 transition hover:border-black">

        <UploadCloud size={40} />

        <p className="mt-3 font-medium">
          Upload Transfer Receipt
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          JPG, PNG or PDF
        </p>

        <input
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) =>
            onReceiptChange(
              e.target.files?.[0] ?? null
            )
          }
        />

      </label>

      {receipt && (
        <div className="mt-4 rounded-xl bg-green-50 p-3 text-center text-sm text-green-700">
          ✅ {receipt.name}
        </div>
      )}

    </div>
  );
}