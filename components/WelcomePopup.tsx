"use client";

import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  const closePopup = () => {
    localStorage.setItem("rimal_welcome_popup_seen", "true");
    setIsOpen(false);
  };

  useEffect(() => {
    const popupSeen = localStorage.getItem("rimal_welcome_popup_seen");

    if (!popupSeen) {
      setIsOpen(true);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="welcome-overlay" onClick={closePopup}>
      <div
        className="welcome-popup"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="welcome-close"
          onClick={closePopup}
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
            لفترة <b>محدودة</b> جدا
          </p>

          <p className="welcome-sub-text">
            اغتنم الفرصة واحصل على خصمك الآن
          </p>

          <div className="welcome-code">
            <span>كود الخصم</span>
            <strong>RIMAL10</strong>
          </div>

          <button
            className="welcome-button"
            onClick={closePopup}
          >
            تسوق الآن
            <span>←</span>
          </button>

          <button
            className="welcome-later"
            onClick={closePopup}
          >
            ربما لاحقًا
          </button>
        </div>

        <div className="welcome-bottom-line" />
      </div>
    </div>
  );
}