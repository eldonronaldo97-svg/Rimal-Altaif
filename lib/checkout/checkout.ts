export type PaymentMethod = "cod" | "instapay" | "vodafone";

export interface CustomerInfo {
  name: string;
  phone: string;
  phone2?: string;
  email?: string;

  governorate: string;
  city: string;

  address: string;

  building?: string;
  floor?: string;
  apartment?: string;

  notes?: string;
}

export interface CartProduct {
  id: string;
  name: string;
  image: string;

  price: number;
  qty: number;
}

export interface CheckoutData {
  customer: CustomerInfo;

  products: CartProduct[];

  paymentMethod: PaymentMethod;

  receipt?: File | null;

  coupon?: string;

  shipping: number;

  discount: number;

  subtotal: number;

  total: number;
}