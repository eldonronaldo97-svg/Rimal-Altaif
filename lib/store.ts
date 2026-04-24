"use client";

import { create } from "zustand";

type Item = {
  id: string;
  name: string;
  price: number;
};

type CartState = {
  cart: Item[];
  add: (item: Item) => void;
  remove: (id: string) => void;
};

export const useCart = create<CartState>((set) => ({
  cart: [],
  add: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  remove: (id) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id),
    })),
}));