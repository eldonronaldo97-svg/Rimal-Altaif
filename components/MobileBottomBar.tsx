"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../lib/store";

import {
  FiHome,
  FiGrid,
  FiShoppingCart,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";

export default function MobileBottomBar() {
  const cart = useCart((s) => s.cart);

  useEffect(() => {
    const viewport = window.visualViewport;

    if (!viewport) return;

    const updateViewport = () => {
      document.documentElement.style.setProperty(
        "--mobile-viewport-top",
        `${viewport.offsetTop}px`
      );

      document.documentElement.style.setProperty(
        "--mobile-viewport-height",
        `${viewport.height}px`
      );
    };

    updateViewport();

    viewport.addEventListener(
      "resize",
      updateViewport
    );

    viewport.addEventListener(
      "scroll",
      updateViewport
    );

    return () => {
      viewport.removeEventListener(
        "resize",
        updateViewport
      );

      viewport.removeEventListener(
        "scroll",
        updateViewport
      );

      document.documentElement.style.removeProperty(
        "--mobile-viewport-top"
      );

      document.documentElement.style.removeProperty(
        "--mobile-viewport-height"
      );
    };
  }, []);

  return (
    <div className="mobile-bar-viewport">
      <div className="mobile-bar">
        <Link href="/" className="mobile-item">
          <FiHome size={22} color="#000" />
        </Link>

        <Link
          href="/brands"
          className="mobile-item"
        >
          <FiGrid size={22} color="#000" />
        </Link>

        <Link
          href="/cart"
          className="mobile-item"
          style={{ position: "relative" }}
        >
          {cart.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#000",
                color: "#fff",
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              {cart.length}
            </div>
          )}

          <FiShoppingCart
            size={22}
            color="#000"
          />
        </Link>

        <a
          href="https://wa.me/201060230817"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-item"
        >
          <FiMessageCircle
            size={22}
            color="#000"
          />
        </a>

        <a
          href="tel:01060230817"
          className="mobile-item"
        >
          <FiPhone size={22} color="#000" />
        </a>
      </div>
    </div>
  );
}