"use client";

import { useMemo } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";

import { CheckoutForm } from "@/lib/checkout/validation";
import { EGYPT } from "@/lib/checkout/egypt";

interface Props {
  register: UseFormRegister<CheckoutForm>;
  watch: UseFormWatch<CheckoutForm>;
  errors: FieldErrors<CheckoutForm>;
}

export default function CustomerForm({
  register,
  watch,
  errors,
}: Props) {
  const governorate = watch("governorate");

  const cities = useMemo(() => {
    return (
      EGYPT.find((g) => g.name === governorate)?.cities ?? []
    );
  }, [governorate]);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-semibold">
        Customer Information
      </h2>

      <div className="space-y-5">

        {/* Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name *
          </label>

          <input
            {...register("name")}
            placeholder="Enter your full name"
            className="h-14 w-full rounded-xl border border-neutral-300 px-4 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone Number *
          </label>

          <input
            {...register("phone")}
            placeholder="01XXXXXXXXX"
            className="h-14 w-full rounded-xl border border-neutral-300 px-4 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10"
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Alternative Phone */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Alternative Phone
          </label>

          <input
            {...register("phone2")}
            placeholder="Optional"
            className="h-14 w-full rounded-xl border border-neutral-300 px-4 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Governorate */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Governorate *
          </label>

          <select
            {...register("governorate")}
            className="h-14 w-full rounded-xl border border-neutral-300 bg-white px-4 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10"
          >
            <option value="">
              Select Governorate
            </option>

            {EGYPT.map((g) => (
              <option
                key={g.name}
                value={g.name}
              >
                {g.name}
              </option>
            ))}
          </select>

          {errors.governorate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.governorate.message}
            </p>
          )}
        </div>

        {/* City */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            City *
          </label>

          <select
            {...register("city")}
            disabled={!governorate}
            className="h-14 w-full rounded-xl border border-neutral-300 bg-white px-4 outline-none transition-all disabled:bg-neutral-100 disabled:text-neutral-400 focus:border-black focus:ring-2 focus:ring-black/10"
          >
            <option value="">
              Select City
            </option>

            {cities.map((city) => (
              <option
                key={city}
                value={city}
              >
                {city}
              </option>
            ))}
          </select>

          {errors.city && (
            <p className="mt-1 text-sm text-red-500">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* Address */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Address *
          </label>

          <textarea
            {...register("address")}
            rows={4}
            placeholder="Street, Building, Landmark..."
            className="w-full rounded-xl border border-neutral-300 p-4 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10"
          />

          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Building / Floor / Apartment */}

        <div className="grid grid-cols-3 gap-3">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Building
            </label>

            <input
              {...register("building")}
              placeholder="Building"
              className="h-14 w-full rounded-xl border border-neutral-300 px-4 outline-none transition-all focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Floor
            </label>

            <input
              {...register("floor")}
              placeholder="Floor"
              className="h-14 w-full rounded-xl border border-neutral-300 px-4 outline-none transition-all focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Apartment
            </label>

            <input
              {...register("apartment")}
              placeholder="Apartment"
              className="h-14 w-full rounded-xl border border-neutral-300 px-4 outline-none transition-all focus:border-black"
            />
          </div>

        </div>
                {/* Notes */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Order Notes
          </label>

          <textarea
            {...register("notes")}
            rows={4}
            placeholder="Any special instructions? (Optional)"
            className="w-full rounded-xl border border-neutral-300 p-4 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

      </div>

    </div>
  );
}