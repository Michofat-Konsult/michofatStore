"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/components/store-provider";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
export default function Wishlist() {
  const { wishlist, ready } = useStore();
  return (
    <div className="container page-space">
      <div className="page-title">
        <span className="eyebrow">SAVE A LITTLE INSPIRATION</span>
        <h1>Your wishlist.</h1>
        <p>Good things to come back to.</p>
      </div>
      {!ready ? (
        <p>Loading your favourites…</p>
      ) : wishlist.length ? (
        <div className="product-grid">
          {products
            .filter((p) => wishlist.includes(p.id))
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={44} />
          <h2>Something will catch your eye.</h2>
          <p>Tap the heart on any product to save it here.</p>
          <Button asChild>
            <Link href="/shop">Find your favourites</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
