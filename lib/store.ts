"use client";

import { create } from "zustand";
import { products } from "./products";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartStore = {
  cart: CartProduct[];
  message: string;
  add: (item: Omit<CartProduct, "qty">) => boolean;
  remove: (id: string) => void;
  increase: (id: string) => boolean;
  decrease: (id: string) => void;
  clear: () => void;
  clearMessage: () => void;
};

const getAvailable = (id: string) => {
  const product = products.find((p) => p.id === id);
  return Number(product?.quantity ?? 0);
};

const save = (cart: CartProduct[]) => {
  if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(cart));
};

const readCart = (): CartProduct[] => {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item: any) => ({
      id: String(item.id ?? ""),
      name: String(item.name ?? item.title ?? "منتج"),
      price: Number(item.price ?? item.salePrice ?? 0),
      image: String(item.image ?? ""),
      qty: Math.max(1, Number(item.qty ?? item.quantity ?? 1) || 1),
    }));
  } catch { return []; }
};

export const useCart = create<CartStore>((set, get) => ({
  cart: readCart(),
  message: "",
  clearMessage: () => set({ message: "" }),
  add(item) {
    const available = getAvailable(item.id);
    if (available <= 0) { set({ message: "نفذت الكمية من المنتج ده" }); return false; }
    const cart = get().cart.map((i) => ({ ...i }));
    const existing = cart.find((i) => i.id === item.id);
    const nextQty = (existing?.qty ?? 0) + 1;
    if (nextQty > available) { set({ message: "الكمية المطلوبة اكثر من الحد المسموح به" }); return false; }
    if (existing) existing.qty = nextQty;
    else cart.push({ ...item, qty: 1 });
    save(cart); set({ cart, message: "تمت إضافة المنتج للسلة" }); return true;
  },
  increase(id) {
    const available = getAvailable(id);
    const cart = get().cart.map((i) => ({ ...i }));
    const item = cart.find((i) => i.id === id);
    if (!item) return false;
    if (item.qty + 1 > available) { set({ message: "الكمية المطلوبة اكثر من الحد المسموح به" }); return false; }
    item.qty += 1; save(cart); set({ cart, message: "" }); return true;
  },
  decrease(id) {
    let cart = get().cart.map((i) => ({ ...i }));
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    if (item.qty > 1) item.qty -= 1; else cart = cart.filter((i) => i.id !== id);
    save(cart); set({ cart, message: "" });
  },
  remove(id) { const cart = get().cart.filter((i) => i.id !== id); save(cart); set({ cart, message: "" }); },
  clear() { if (typeof window !== "undefined") localStorage.removeItem("cart"); set({ cart: [], message: "" }); },
}));
