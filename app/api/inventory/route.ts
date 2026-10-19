
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxHhrvzHZEvGfnhCwbH_e7IgF1ahwjm6VXfGKHjPsuC99PcU9dC5Hf59WK15CLIHCNO/exec";

export async function GET() {
  try {
    const response = await fetch(
      `${APPS_SCRIPT_URL}?action=inventory`,
      {
        cache: "no-store",
        redirect: "follow",
      }
    );

    if (!response.ok) {
      throw new Error(`Inventory endpoint returned ${response.status}`);
    }

    const data = await response.json();

    if (!data?.success || !Array.isArray(data.products)) {
      throw new Error(data?.error || "Invalid inventory response");
    }

    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("Inventory API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Inventory request failed",
      },
      { status: 502 }
    );
  }
}
