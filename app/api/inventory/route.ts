import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxHhrvzHZEvGfnhCwbH_e7IgF1ahwjm6VXfGKHjPsuC99PcU9dC5Hf59WK15CLIHCNO/exec";

export async function GET() {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=inventory`, {
      cache: "no-store",
      redirect: "follow",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Inventory endpoint returned ${response.status}`);

    const data = await response.json();
    if (!data?.success || !Array.isArray(data.products)) {
      throw new Error(data?.error || "Invalid inventory response");
    }

    const seen = new Set<string>();
    const products = data.products.map((item: any) => {
      const id = String(item?.id ?? "").trim();
      const quantity = Number(item?.quantity);
      if (!id || !Number.isFinite(quantity) || quantity < 0) {
        throw new Error("Inventory contains an invalid product ID or quantity");
      }
      if (seen.has(id)) throw new Error(`Duplicate product ID in inventory: ${id}`);
      seen.add(id);
      return { id, name: String(item?.name ?? ""), quantity: Math.floor(quantity) };
    });

    return NextResponse.json({ ...data, products }, {
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
    });
  } catch (error) {
    console.error("Inventory API error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Inventory request failed",
    }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
