"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type InventoryMap = Record<string, number>;
type InventoryContextValue = {
  quantities: InventoryMap | null;
  refreshInventory: (force?: boolean) => Promise<boolean>;
};
type InventoryResponse = { success: boolean; products: Array<{ id: string | number; quantity: number }> };

const InventoryContext = createContext<InventoryContextValue>({
  quantities: null,
  refreshInventory: async () => false,
});

export function useLiveInventory(productId?: string | number): number | null | undefined {
  const { quantities } = useContext(InventoryContext);
  if (quantities === null) return null; // initial request unavailable / not loaded
  if (productId == null) return undefined;
  const id = String(productId);
  return Object.prototype.hasOwnProperty.call(quantities, id) ? quantities[id] : undefined;
}

export function useInventoryRefresh() {
  return useContext(InventoryContext).refreshInventory;
}

export default function InventoryProvider({
  initialInventory,
  children,
}: {
  initialInventory: InventoryMap | null;
  children: React.ReactNode;
}) {
  const [quantities, setQuantities] = useState<InventoryMap | null>(initialInventory);

  const refreshInventory = useCallback(async (force = false) => {
    try {
      const response = await fetch("/api/inventory", {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Inventory request failed (${response.status})`);
      const data = (await response.json()) as InventoryResponse;
      if (data?.success !== true || !Array.isArray(data.products)) {
        throw new Error("Invalid inventory response");
      }
      const next: InventoryMap = {};
      for (const item of data.products) {
        const id = String(item?.id ?? "").trim();
        const quantity = Number(item?.quantity);
        if (id && Number.isFinite(quantity) && quantity >= 0) next[id] = Math.floor(quantity);
      }
      setQuantities(next);
      return true;
    } catch (error) {
      console.error("Could not refresh live inventory:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    // Refresh once after hydration, then keep one shared polling timer for the whole site.
    void refreshInventory();
    const timer = window.setInterval(() => void refreshInventory(true), 30_000);
    return () => window.clearInterval(timer);
  }, [refreshInventory]);

  const value = useMemo(() => ({ quantities, refreshInventory }), [quantities, refreshInventory]);
  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}
