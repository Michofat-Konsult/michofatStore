"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowLeftRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { type Product } from "@/lib/products";
import { money } from "@/lib/utils";
import { useStore } from "./store-provider";
export function RetailProduct({
  product: p,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { add, wishlist, toggleWish, compare, toggleCompare } = useStore();
  const modal = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  return (
    <article className={`retail-product ${compact ? "compact-product" : ""}`}>
      <div className="rp-image">
        <Link href={`/product/${p.id}`} tabIndex={-1} aria-hidden="true">
          <Image unoptimized src={p.image} alt="" width={270} height={338} />
        </Link>
        <span className="rp-new">New</span>
        {p.oldPrice && <span className="rp-sale">Sale</span>}
        <div className="rp-actions">
          <button
            aria-label={`Add ${p.name} to cart`}
            title="Add to cart"
            onClick={() => add(p.id)}
          >
            <ShoppingCart size={19} />
          </button>
          <button
            aria-label={`Save ${p.name}`}
            title="Save to wishlist"
            aria-pressed={wishlist.includes(p.id)}
            onClick={() => toggleWish(p.id)}
          >
            <Heart
              size={18}
              fill={wishlist.includes(p.id) ? "currentColor" : "none"}
            />
          </button>
          <button
            aria-label={`Quick view ${p.name}`}
            title="Quick view"
            onClick={() => modal.current?.showModal()}
          >
            <Eye size={20} />
          </button>
          <button
            aria-label={`Compare ${p.name}`}
            title="Compare"
            aria-pressed={compare.includes(p.id)}
            onClick={() => toggleCompare(p.id)}
          >
            <ArrowLeftRight size={18} />
          </button>
        </div>
      </div>
      {p.oldPrice && <OfferCountdown />}
      <div className="rp-rating" aria-label={`${p.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={15}
            fill={i <= Math.round(p.rating) ? "currentColor" : "none"}
          />
        ))}
      </div>
      <Link className="rp-name" href={`/product/${p.id}`}>
        {p.name}
      </Link>
      {p.oldPrice && (
        <div className="rp-savings">
          <progress
            aria-label="Discount percentage"
            max={100}
            value={Math.round((1 - p.price / p.oldPrice) * 100)}
          />
          <span>
            Save {Math.round((1 - p.price / p.oldPrice) * 100)}% on this offer
          </span>
        </div>
      )}
      <div className="rp-price">
        <strong>{money(p.price)}</strong>
        {p.oldPrice && <del>{money(p.oldPrice)}</del>}
      </div>
      <button className="rp-mobile-add" onClick={() => add(p.id)}>
        Add to cart <ShoppingCart size={14} />
      </button>
      <dialog
        ref={modal}
        aria-labelledby={titleId}
        className="retail-quick-view"
        onClick={(e) => {
          if (e.target === e.currentTarget) modal.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close quick view"
          onClick={() => modal.current?.close()}
        >
          <X />
        </button>
        <div className="quick-view-grid">
          <Image
            unoptimized
            src={p.image}
            alt={p.name}
            width={400}
            height={400}
          />
          <div>
            <span className="retail-kicker">{p.brand}</span>
            <h2 id={titleId}>{p.name}</h2>
            <strong className="quick-price">{money(p.price)}</strong>
            <p>{p.description}</p>
            <p className="stock">In stock · {p.stock} available</p>
            <button className="retail-button" onClick={() => add(p.id)}>
              Add to cart <ShoppingCart size={17} />
            </button>
            <Link
              href={`/product/${p.id}`}
              onClick={() => modal.current?.close()}
            >
              View full details →
            </Link>
          </div>
        </div>
      </dialog>
    </article>
  );
}
function OfferCountdown() {
  const [remaining, setRemaining] = useState("Ends 30 Nov · Demo offer");
  useEffect(() => {
    const timer = setInterval(() => {
      const seconds = Math.max(
        0,
        Math.floor(
          (Date.parse("2026-11-30T23:59:59+01:00") - Date.now()) / 1000,
        ),
      );
      if (!seconds) {
        setRemaining("Demo offer ended");
        return;
      }
      const days = Math.floor(seconds / 86400);
      const hours = String(Math.floor((seconds % 86400) / 3600)).padStart(
        2,
        "0",
      );
      const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(
        2,
        "0",
      );
      const secs = String(seconds % 60).padStart(2, "0");
      setRemaining(`Ends in: ${days}d ${hours}:${minutes}:${secs}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div
      className="rp-countdown"
      aria-label="Illustrative promotion ends 30 November 2026"
    >
      {remaining}
    </div>
  );
}
