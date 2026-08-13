"use client";

import Link from "next/link";
import { useCart } from "../lib/store";

export default function ProductCard({ p }: any) {
  const add = useCart((s) => s.add);

  const handleAddToCart = () => {
    if (!p.stock) return;

    add({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
    });
  };

  return (
    <>
      <article className="product-card-new">
        {/* صورة المنتج */}
        <Link
          href={`/product/${p.id}`}
          className="product-card-image-link"
        >
          <div className="product-card-image">
            {!p.stock && (
              <div className="sold-out-badge">
                SOLD OUT
              </div>
            )}

            <img
              src={p.image}
              alt={p.name}
              className="product-card-img"
              style={{
                opacity: p.stock ? 1 : 0.5,
              }}
            />
          </div>
        </Link>

        {/* بيانات المنتج */}
        <div className="product-card-content">
          <div className="product-card-brand">
            {p.brand || "Rimal Altaif"}
          </div>

          <Link
            href={`/product/${p.id}`}
            className="product-card-name"
          >
            {p.name}
          </Link>

          {/* السعر */}
          <div className="product-card-prices">
            <span className="product-card-price">
              EGP {Number(p.price).toLocaleString("en-US")}
            </span>

            {p.oldPrice && Number(p.oldPrice) > Number(p.price) && (
              <span className="product-card-old-price">
                EGP {Number(p.oldPrice).toLocaleString("en-US")}
              </span>
            )}
          </div>

          {/* زر السلة */}
          <button
            type="button"
            className="product-card-btn"
            disabled={!p.stock}
            onClick={handleAddToCart}
          >
            {p.stock ? "أضف للسلة" : "نفذت الكمية"}
          </button>
        </div>
      </article>

      <style jsx>{`
        .product-card-new {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 14px;
          overflow: hidden;
          box-sizing: border-box;
          padding: 9px;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .product-card-new:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
        }

        .product-card-image-link {
          display: block;
          text-decoration: none;
        }

        .product-card-image {
          position: relative;
          width: 100%;
          height: 225px;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-card-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
          transition: transform 0.35s ease;
        }

        .product-card-new:hover .product-card-img {
          transform: scale(1.04);
        }

        .sold-out-badge {
          position: absolute;
          top: 9px;
          left: 9px;
          z-index: 5;
          background: #111111;
          color: #ffffff;
          padding: 6px 9px;
          border-radius: 5px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.7px;
        }

        .product-card-content {
          padding: 9px 5px 5px;
          text-align: center;
        }

        .product-card-brand {
          font-size: 12px;
          line-height: 1.2;
          font-weight: 800;
          color: #111111;
          margin-bottom: 7px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .product-card-name {
          display: block;
          min-height: 42px;
          color: #182936;
          font-size: 17px;
          line-height: 1.3;
          font-weight: 500;
          text-decoration: none;
          margin-bottom: 9px;
        }

        .product-card-prices {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          direction: ltr;
          white-space: nowrap;
          margin-bottom: 13px;
        }

        .product-card-price {
          color: #a5162b;
          font-size: 19px;
          line-height: 1;
          font-weight: 800;
        }

        .product-card-old-price {
          color: #999999;
          font-size: 15px;
          line-height: 1;
          font-weight: 500;
          text-decoration: line-through;
          text-decoration-thickness: 1.5px;
        }

        .product-card-btn {
          width: 100%;
          height: 48px;
          border: 2px solid #172b38;
          border-radius: 28px;
          background: #ffffff;
          color: #172b38;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease;
        }

        .product-card-btn:hover:not(:disabled) {
          background: #172b38;
          color: #ffffff;
          transform: translateY(-1px);
        }

        .product-card-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .product-card-new {
            border-radius: 12px;
            padding: 7px;
          }

          .product-card-image {
            height: 190px;
            border-radius: 9px;
          }

          .product-card-content {
            padding: 8px 3px 4px;
          }

          .product-card-brand {
            font-size: 10px;
            margin-bottom: 5px;
          }

          .product-card-name {
            font-size: 15px;
            min-height: 38px;
            margin-bottom: 7px;
          }

          .product-card-prices {
            gap: 6px;
            margin-bottom: 10px;
          }

          .product-card-price {
            font-size: 16px;
          }

          .product-card-old-price {
            font-size: 12px;
          }

          .product-card-btn {
            height: 44px;
            font-size: 14px;
          }

          .sold-out-badge {
            top: 7px;
            left: 7px;
            font-size: 8px;
            padding: 5px 7px;
          }
        }
      `}</style>
    </>
  );
}