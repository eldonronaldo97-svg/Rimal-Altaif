"use client";

import { useEffect, useSyncExternalStore } from "react";

type InventoryItem = { id: string; name?: string; quantity: number };
type InventoryResponse = { success: boolean; products: InventoryItem[]; updatedAt?: string };

let quantities = new Map<string, number>();
let loaded = false;
let lastFetchAt = 0;
let inFlight: Promise<boolean> | null = null;
const listeners = new Set<() => void>();
const CACHE_MS = 5_000;

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function getLiveQuantity(id: string): number | null {
  if (!loaded) return null;
  return quantities.has(String(id)) ? quantities.get(String(id))! : null;
}

export function refreshInventory(force = false): Promise<boolean> {
  const now = Date.now();
  if (!force && loaded && now - lastFetchAt < CACHE_MS) return Promise.resolve(true);
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const response = await fetch("/api/inventory", {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Inventory request failed (${response.status})`);
      const data = (await response.json()) as InventoryResponse;
      if (!data?.success || !Array.isArray(data.products)) {
        throw new Error("Invalid inventory response");
      }

      const next = new Map<string, number>();
      for (const item of data.products) {
        const id = String(item?.id ?? "").trim();
        const quantity = Number(item?.quantity);
        if (!id || !Number.isFinite(quantity) || quantity < 0) continue;
        next.set(id, Math.floor(quantity));
      }
      quantities = next;
      loaded = true;
      lastFetchAt = Date.now();
      notify();
      return true;
    } catch (error) {
      console.error("Could not load live inventory:", error);
      // Do not turn a failed request into an assumption that stock exists.
      return false;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

export function useLiveInventory(productId?: string | number) {
  const id = productId == null ? "" : String(productId);
  const quantity = useSyncExternalStore(
    subscribe,
    () => (id ? getLiveQuantity(id) : null),
    () => null,
  );

  useEffect(() => {
    void refreshInventory();
    const timer = window.setInterval(() => void refreshInventory(true), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return quantity;
}

// Warm the cache for cart actions, but never use static product quantities as a fallback.
if (typeof window !== "undefined") void refreshInventory();
