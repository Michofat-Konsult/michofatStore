"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useStore } from "./store-provider";
import { products } from "@/lib/products";
import { deliveryCost } from "@/lib/cart";
import { money } from "@/lib/utils";
import { Button } from "./ui/button";
export function useTotals() {
  const { cart } = useStore();
  const lines = cart.flatMap((line) => {
    const product = products.find((p) => p.id === line.id);
    return product ? [{ ...line, product }] : [];
  });
  const subtotal = lines.reduce(
    (sum, l) => sum + l.product.price * l.quantity,
    0,
  );
  const physical = lines.some((l) => !l.product.category.includes("Software"));
  return {
    lines,
    subtotal,
    delivery: deliveryCost(subtotal, physical),
    physical,
  };
}
export function OrderSummary({ children }: { children?: React.ReactNode }) {
  const { lines, subtotal, delivery } = useTotals();
  return (
    <aside className="order-summary">
      <h2>Order summary</h2>
      <div>
        <span>
          Subtotal ({lines.reduce((a, l) => a + l.quantity, 0)} items)
        </span>
        <strong>{money(subtotal)}</strong>
      </div>
      <div>
        <span>Delivery</span>
        <strong>{delivery ? money(delivery) : "Free"}</strong>
      </div>
      <p className="fine-print">
        Demo prices are tax-inclusive. No additional tax is added.
      </p>
      <div className="total">
        <strong>Total</strong>
        <strong>{money(subtotal + delivery)}</strong>
      </div>
      {children}
      <span className="summary-note">
        <Truck size={16} /> Carefully packed. Happily delivered.
      </span>
    </aside>
  );
}
export function CartView() {
  const { ready, setQuantity } = useStore();
  const { lines } = useTotals();
  if (!ready)
    return <div className="container page-space">Loading your cart…</div>;
  return (
    <div className="container page-space">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Cart
      </div>
      <div className="page-title">
        <span className="eyebrow">GOOD CHOICES START HERE</span>
        <h1>Your shopping bag.</h1>
        <p>A few steps closer to your next upgrade.</p>
      </div>
      {!lines.length ? (
        <div className="empty-state">
          <ShoppingBag size={48} />
          <h2>Your bag has possibilities.</h2>
          <p>Find something you’ll love and we’ll keep it here.</p>
          <Button asChild>
            <Link href="/shop">
              Explore the store <ArrowRight size={17} />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
            {lines.map(({ product: p, quantity }) => (
              <article className="cart-line" key={p.id}>
                <Link href={`/product/${p.id}`}>
                  <Image
                    unoptimized
                    width={800}
                    height={600}
                    src={p.image}
                    alt={p.name}
                  />
                </Link>
                <div>
                  <span className="product-brand">{p.brand}</span>
                  <Link href={`/product/${p.id}`}>
                    <h3>{p.name}</h3>
                  </Link>
                  <span className="stock">In stock</span>
                  <strong>{money(p.price)}</strong>
                </div>
                <div className="cart-line-controls">
                  <button
                    className="remove"
                    onClick={() => setQuantity(p.id, 0)}
                    aria-label={`Remove ${p.name}`}
                  >
                    <Trash2 size={17} />
                  </button>
                  <div className="quantity">
                    <button
                      aria-label={`Decrease ${p.name}`}
                      onClick={() => setQuantity(p.id, quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{quantity}</span>
                    <button
                      aria-label={`Increase ${p.name}`}
                      disabled={quantity >= p.stock}
                      onClick={() => setQuantity(p.id, quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <strong>{money(p.price * quantity)}</strong>
                </div>
              </article>
            ))}
            <Link className="text-link" href="/shop">
              <ArrowLeft size={16} /> Keep exploring
            </Link>
          </div>
          <OrderSummary>
            <Button asChild className="w-full">
              <Link href="/checkout">
                Continue to checkout <ArrowRight size={17} />
              </Link>
            </Button>
            <p className="fine-print">
              This is a demo. No payment will be collected.
            </p>
          </OrderSummary>
        </div>
      )}
    </div>
  );
}
