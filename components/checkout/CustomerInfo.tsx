"use client";

import { Dispatch, SetStateAction } from "react";
import Input from "./Input";
import Select from "./Select";
import { CustomerInfo } from "@/lib/orders";

interface Props {
  customer: CustomerInfo;
  setCustomer: Dispatch<SetStateAction<CustomerInfo>>;
  errors: Record<string, string>;
}

const governorates = [
  { label: "Choose Governorate", value: "" },
  { label: "القاهرة", value: "القاهرة" },
  { label: "الجيزة", value: "الجيزة" },
  { label: "الإسكندرية", value: "الإسكندرية" },
  { label: "القليوبية", value: "القليوبية" },
  { label: "الشرقية", value: "الشرقية" },
  { label: "الغربية", value: "الغربية" },
  { label: "المنوفية", value: "المنوفية" },
  { label: "البحيرة", value: "البحيرة" },
  { label: "كفر الشيخ", value: "كفر الشيخ" },
  { label: "الدقهلية", value: "الدقهلية" },
  { label: "دمياط", value: "دمياط" },
  { label: "بورسعيد", value: "بورسعيد" },
  { label: "الإسماعيلية", value: "الإسماعيلية" },
  { label: "السويس", value: "السويس" },
  { label: "الفيوم", value: "الفيوم" },
  { label: "بني سويف", value: "بني سويف" },
  { label: "المنيا", value: "المنيا" },
  { label: "أسيوط", value: "أسيوط" },
  { label: "سوهاج", value: "سوهاج" },
  { label: "قنا", value: "قنا" },
  { label: "الأقصر", value: "الأقصر" },
  { label: "أسوان", value: "أسوان" },
  { label: "مطروح", value: "مطروح" },
  { label: "البحر الأحمر", value: "البحر الأحمر" },
  { label: "الوادي الجديد", value: "الوادي الجديد" },
  { label: "شمال سيناء", value: "شمال سيناء" },
  { label: "جنوب سيناء", value: "جنوب سيناء" },
];

export default function CustomerInfoForm({
  customer,
  setCustomer,
  errors,
}: Props) {
  const update = (
    key: keyof CustomerInfo,
    value: string
  ) => {
    setCustomer((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">

        <Input
          label="Full Name"
          value={customer.name}
          error={errors.name}
          placeholder="Full Name"
          onChange={(e) =>
            update("name", e.target.value)
          }
        />

        <Input
          label="Phone"
          value={customer.phone}
          error={errors.phone}
          placeholder="01xxxxxxxxx"
          onChange={(e) =>
            update("phone", e.target.value)
          }
        />

        <Input
          label="Second Phone"
          value={customer.phone2 || ""}
          placeholder="Optional"
          onChange={(e) =>
            update("phone2", e.target.value)
          }
        />

        <Select
          label="Governorate"
          value={customer.governorate}
          error={errors.governorate}
          options={governorates}
          onChange={(e) =>
            update("governorate", e.target.value)
          }
        />

        <Input
          label="City"
          value={customer.city}
          error={errors.city}
          placeholder="City"
          onChange={(e) =>
            update("city", e.target.value)
          }
        />

        <Input
          label="Address"
          value={customer.address}
          error={errors.address}
          placeholder="Street Address"
          className="md:col-span-2"
          onChange={(e) =>
            update("address", e.target.value)
          }
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">

                <Input
          label="Building"
          value={customer.building || ""}
          placeholder="Building"
          onChange={(e) =>
            update("building", e.target.value)
          }
        />

        <Input
          label="Floor"
          value={customer.floor || ""}
          placeholder="Floor"
          onChange={(e) =>
            update("floor", e.target.value)
          }
        />

        <Input
          label="Apartment"
          value={customer.apartment || ""}
          placeholder="Apartment"
          onChange={(e) =>
            update("apartment", e.target.value)
          }
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Order Notes
        </label>

        <textarea
          rows={5}
          value={customer.notes || ""}
          placeholder="Write any notes..."
          onChange={(e) =>
            update("notes", e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-neutral-300
            bg-white
            p-4
            outline-none
            transition
            focus:border-black
            focus:ring-2
            focus:ring-black/10
          "
        />

      </div>

    </div>
  );
}