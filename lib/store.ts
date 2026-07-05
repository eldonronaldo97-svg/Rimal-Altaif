"use client";

import { create } from "zustand";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartStore = {
  cart: CartProduct[];

  add: (
  item: Omit<CartProduct, "qty">
) => void;

  remove: (
    id: string
  ) => void;

  increase: (
    id: string
  ) => void;

  decrease: (
    id: string
  ) => void;

  clear: () => void;

};

const save = (cart: CartProduct[]) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
};

export const useCart = create<CartStore>(
  (set, get) => ({
    cart:
typeof window !== "undefined"
  ? (() => {
      try {
        return JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
      } catch {
        return [];
      }
    })()
  : [],


    add(item) {
      const cart = structuredClone(get().cart);

      const index = cart.findIndex(
        (i) => i.id === item.id
      );

      if (index >= 0) {
        cart[index].qty += 1;
      } else {
        cart.push({
          ...item,
          qty: 1,
        });
      }

      save(cart);

      set({
        cart,
      });
    },

    increase(id) {
      const cart = [...get().cart];

      const item = cart.find(
        (i) => i.id === id
      );

      if (item) item.qty++;

      save(cart);

      set({
        cart,
      });
    },

    decrease(id) {
      let cart = [...get().cart];

      const item = cart.find(
        (i) => i.id === id
      );

      if (!item) return;

      if (item.qty > 1) {
        item.qty--;
      } else {
        cart = cart.filter(
          (i) => i.id !== id
        );
      }

      save(cart);

      set({
        cart,
      });
    },

    remove(id) {
      const cart = get().cart.filter(
        (i) => i.id !== id
      );

      save(cart);

      set({
        cart,
      });
    },

    clear() {
      localStorage.removeItem("cart");

      set({
        cart: [],
      });
    },
  })
);