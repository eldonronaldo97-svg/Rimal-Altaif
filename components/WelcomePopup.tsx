"use client";

import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // يظهر فور تحميل الصفحة
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="welcome-overlay" onClick={() => setIsOpen(false)}>
      <div
        className="welcome-popup"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="welcome-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          ×
        </button>

        {/* Top decoration */}
        <div className="welcome-top-line" />

        <div className="welcome-content">
          <div className="welcome-small-title">
            RIMAL ALTAIF
          </div>

          <div className="welcome-divider">
            <span />
            <b>✦</b>
            <span />
          </div>

          <h2>
            خصم
            <strong>10%</strong>
          </h2>

          <p className="welcome-main-text">
            لأول <b>100 طلب</b> فقط
          </p>

          <p className="welcome-sub-text">
            اغتنم الفرصة واحصل على خصمك الآن
          </p>

          <div className="welcome-code">
            <span>كود الخصم</span>
            <strong>FIRST10</strong>
          </div>

          <button
            className="welcome-button"
            onClick={() => setIsOpen(false)}
          >
            تسوق الآن
            <span>←</span>
          </button>

          <button
            className="welcome-later"
            onClick={() => setIsOpen(false)}
          >
            ربما لاحقًا
          </button>
        </div>

        <div className="welcome-bottom-line" />
      </div>
    </div>
  );
}