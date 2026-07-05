import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "الاسم مطلوب"),

  phone: z
    .string()
    .regex(/^01\d{9}$/, "رقم الهاتف غير صحيح"),

  phone2: z.string().optional(),

  governorate: z.string().min(1, "اختر المحافظة"),

  city: z.string().min(1, "اختر المدينة"),

  address: z.string().min(5, "اكتب العنوان"),

  building: z.string().optional(),

  floor: z.string().optional(),

  apartment: z.string().optional(),

  notes: z.string().optional(),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;