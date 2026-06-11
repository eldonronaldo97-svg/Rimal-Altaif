"use client";

import { usePathname } from "next/navigation";
import MobileBottomBar from "./MobileBottomBar";

export default function LayoutContent() {
  const pathname = usePathname();

  const hideBar =
    pathname.startsWith("/product") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout");

  if (hideBar) return null;

  return <MobileBottomBar />;
}