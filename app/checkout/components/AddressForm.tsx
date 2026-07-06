"use client";

import { useState } from "react";
import FloatingInput from "./FloatingInput";
import FloatingSelect from "./FloatingSelect";
import FloatingTextarea from "./FloatingTextarea";
import FormRow from "./FormRow";
import Section from "./Section";

const governorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "القليوبية",
  "الشرقية",
  "الغربية",
  "الدقهلية",
  "البحيرة",
  "كفر الشيخ",
  "المنوفية",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
];

export default function AddressForm() {
  const [address, setAddress] = useState({
    governorate: "",
    city: "",
    address: "",
    building: "",
    floor: "",
    apartment: "",
    notes: "",
  });

  function update(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Section title="عنوان الشحن">
      <div className="space-y-5">

        <FloatingSelect
          label="المحافظة"
          name="governorate"
          value={address.governorate}
          onChange={update}
        >
          {governorates.map((gov) => (
            <option
              key={gov}
              value={gov}
            >
              {gov}
            </option>
          ))}
        </FloatingSelect>

        <FloatingInput
          label="المدينة"
          name="city"
          value={address.city}
          onChange={update}
        />

        <FloatingTextarea
          label="العنوان بالكامل"
          rows={4}
          name="address"
          value={address.address}
          onChange={update}
        />

        <FormRow cols={3}>
          <FloatingInput
            label="رقم المبنى"
            name="building"
            value={address.building}
            onChange={update}
          />

          <FloatingInput
            label="الدور"
            name="floor"
            value={address.floor}
            onChange={update}
          />

          <FloatingInput
            label="رقم الشقة"
            name="apartment"
            value={address.apartment}
            onChange={update}
          />
        </FormRow>

        <FloatingTextarea
          label="ملاحظات الطلب (اختياري)"
          rows={3}
          name="notes"
          value={address.notes}
          onChange={update}
        />

      </div>
    </Section>
  );
}