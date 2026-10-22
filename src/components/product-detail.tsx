"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { products, type Product } from "@/lib/products";
import { money } from "@/lib/utils";
import { useStore } from "./store-provider";
import { Button } from "./ui/button";
import { ProductCard } from "./product-card";
export function ProductDetail({ product: p }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("Overview");
  const { add, wishlist, toggleWish } = useStore();
  return (
    <div className="container page-space">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {p.name}
      </div>
      <div className="detail-grid">
        <div className="detail-image">
          {p.badge && <span className="product-badge">{p.badge}</span>}
          <Image
            unoptimized
            width={800}
            height={600}
            src={p.image}
            alt={p.name}
          />
        </div>
        <div className="detail-copy">
          <span className="eyebrow">
            {p.brand} / {p.category}
          </span>
          <h1>{p.name}</h1>
          <div className="rating">
            <Star size={16} fill="currentColor" />
            {p.rating} <span>· {p.reviews} sample ratings</span>
          </div>
          <div className="detail-price">
            <strong>{money(p.price)}</strong>
            {p.oldPrice && (
              <>
                <del>{money(p.oldPrice)}</del>
                <span>Save {money(p.oldPrice - p.price)}</span>
              </>
            )}
          </div>
          <p>{p.description}</p>
          <span className="stock detail-stock">
            <Check size={15} /> In stock · {p.stock} available
          </span>
          <div className="detail-buy">
            <div className="quantity">
              <button
                aria-label="Decrease quantity"
                disabled={qty === 1}
                onClick={() => setQty(qty - 1)}
              >
                <Minus size={15} />
              </button>
              <span>{qty}</span>
              <button
                aria-label="Increase quantity"
                disabled={qty >= p.stock}
                onClick={() => setQty(qty + 1)}
              >
                <Plus size={15} />
              </button>
            </div>
            <Button onClick={() => add(p.id, qty)}>
              Add to cart <Plus size={17} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Save to wishlist"
              aria-pressed={wishlist.includes(p.id)}
              onClick={() => toggleWish(p.id)}
            >
              <Heart
                size={18}
                fill={wishlist.includes(p.id) ? "currentColor" : "none"}
              />
            </Button>
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link href="/cart" onClick={() => add(p.id, qty)}>
              Buy now
            </Link>
          </Button>
          <div className="detail-perks">
            <span>
              <Truck size={20} />
              <span>
                <strong>
                  {p.category.includes("Software")
                    ? "Digital delivery"
                    : "Nationwide delivery"}
                </strong>
                <small>
                  {p.category.includes("Software")
                    ? "License fulfillment is simulated in this demo."
                    : "Free delivery on physical orders over ₦500,000."}
                </small>
              </span>
            </span>
            <span>
              <ShieldCheck size={20} />
              <span>
                <strong>Shop with confidence</strong>
                <small>Warranty details listed in specifications.</small>
              </span>
            </span>
          </div>
          <p className="fine-print">
            Mock product listing. Prices, availability and ratings are
            illustrative.
          </p>
        </div>
      </div>
      <section className="detail-tabs">
        <div role="tablist" aria-label="Product information">
          {["Overview", "Specifications", "Delivery & returns"].map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              aria-controls="product-tab"
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div id="product-tab" role="tabpanel">
          {tab === "Overview" ? (
            <>
              <h2>Made for your next move.</h2>
              <p>{p.description}</p>
              <p>
                Need help choosing or buying for a team?{" "}
                <Link href="/contact">Talk to our product specialists.</Link>
              </p>
            </>
          ) : tab === "Specifications" ? (
            <dl className="spec-table">
              {Object.entries(p.specs).map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <>
              <h2>A smoother journey to your door.</h2>
              <p>
                Demo physical delivery: 2–5 business days. ₦5,000 below
                ₦500,000; free from ₦500,000. Digital products have no delivery
                charge. A mixed cart follows physical delivery pricing.
              </p>
              <p>
                Our illustrative return window is 7 days for unused physical
                products. Digital licenses are excluded after activation.{" "}
                <Link href="/help">Read delivery and return details.</Link>
              </p>
            </>
          )}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>A few more good possibilities.</h2>
          <Link href="/shop">Explore all →</Link>
        </div>
        <div className="product-grid">
          {products
            .filter((other) => other.id !== p.id)
            .toSorted(
              (a, b) =>
                Number(b.category === p.category) -
                Number(a.category === p.category),
            )
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
    </div>
  );
}
