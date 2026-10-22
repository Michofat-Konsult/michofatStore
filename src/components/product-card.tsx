"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { type Product } from "@/lib/products";
import { money } from "@/lib/utils";
import { useStore } from "./store-provider";
export function ProductCard({ product: p }: { product: Product }) {
  const { add, wishlist, toggleWish } = useStore();
  return (
    <article className="product-card">
      <div
        className={`product-visual ${p.image.endsWith(".svg") ? "illustration" : "photograph"}`}
      >
        {p.badge && (
          <span
            className={`product-badge ${p.badge === "Bestseller" ? "blue" : ""}`}
          >
            {p.badge}
          </span>
        )}
        <button
          className={`wish-button ${wishlist.includes(p.id) ? "saved" : ""}`}
          onClick={() => toggleWish(p.id)}
          aria-label={`${wishlist.includes(p.id) ? "Remove" : "Save"} ${p.name}`}
          aria-pressed={wishlist.includes(p.id)}
        >
          <Heart
            size={17}
            fill={wishlist.includes(p.id) ? "currentColor" : "none"}
          />
        </button>
        <Link href={`/product/${p.id}`} tabIndex={-1} aria-hidden="true">
          <Image
            unoptimized
            width={800}
            height={600}
            src={p.image}
            alt=""
            loading="lazy"
          />
        </Link>
      </div>
      <div className="product-info">
        <span className="product-brand">
          {p.brand} <span>• {p.category.split(" & ")[0]}</span>
        </span>
        <Link href={`/product/${p.id}`}>
          <h3>{p.name}</h3>
        </Link>
        <div className="rating">
          <Star size={12} fill="currentColor" />
          {p.rating}
          <span>({p.reviews})</span>
          <span className="stock">In stock</span>
        </div>
        <div className="price-row">
          <div>
            <strong>{money(p.price)}</strong>
            {p.oldPrice && <del>{money(p.oldPrice)}</del>}
          </div>
        </div>
        <button
          onClick={() => add(p.id)}
          className="add-button"
          aria-label={`Add ${p.name} to cart`}
        >
          <ShoppingBag size={16} />
          <span>Add to cart</span>
        </button>
      </div>
    </article>
  );
}
