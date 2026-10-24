"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  Home,
  RefreshCw,
  XCircle,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import { useStore } from "./store-provider";
import { useTotals } from "./cart-view";
import { money } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function RetailCartView() {
  const { ready } = useStore();
  const { lines, subtotal, delivery, physical } = useTotals();
  const [feedback, setFeedback] = useState("");
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  function codeSubmit(e: FormEvent<HTMLFormElement>, gift = false) {
    e.preventDefault();
    setFeedback(
      gift
        ? "Gift certificates are not connected in this demo. No credit has been applied."
        : "Coupon codes are not connected in this demo. No discount has been applied.",
    );
  }
  function estimate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(
      !physical
        ? "Digital products have no delivery charge."
        : delivery
          ? `Estimated delivery: ${money(delivery)}. Demo flat rate within Nigeria; delivery is free on orders from ₦500,000.`
          : "Estimated delivery: Free. Your order qualifies for free demo delivery.",
    );
  }
  return (
    <div className="container retail-cart-page">
      <nav className="brand-breadcrumb" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home">
          <Home size={20} fill="currentColor" />
        </Link>
        <span>/</span>
        <span aria-current="page">Shopping Cart</span>
      </nav>
      <h1>
        Shopping Cart{" "}
        {ready && count > 0 && (
          <span>
            ({count} {count === 1 ? "item" : "items"})
          </span>
        )}
      </h1>
      {!ready ? (
        <p role="status">Loading your cart…</p>
      ) : !lines.length ? (
        <section className="retail-cart-empty">
          <ShoppingCart size={48} />
          <h2>Your shopping cart is empty!</h2>
          <p>Explore computers, phones, accessories and more.</p>
          <Link href="/shop" className="account-button account-red">
            Continue Shopping
          </Link>
        </section>
      ) : (
        <>
          <div
            className="retail-cart-table-wrap"
            tabIndex={0}
            role="region"
            aria-label="Shopping cart items"
          >
            <table className="retail-cart-table">
              <thead>
                <tr>
                  <th scope="col">IMAGE</th>
                  <th scope="col">PRODUCT NAME</th>
                  <th scope="col">MODEL</th>
                  <th scope="col">QUANTITY</th>
                  <th scope="col">UNIT PRICE</th>
                  <th scope="col">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {lines.map(({ product, quantity }) => (
                  <tr key={product.id}>
                    <td>
                      <Link
                        href={`/product/${product.id}`}
                        aria-label={product.name}
                      >
                        <Image
                          unoptimized
                          src={product.image}
                          alt={product.name}
                          width={85}
                          height={90}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="retail-cart-product-name"
                        href={`/product/${product.id}`}
                      >
                        {product.name}
                      </Link>
                      <small>
                        {product.brand} · {product.category}
                      </small>
                    </td>
                    <td className="retail-cart-model">
                      {product.id.toUpperCase()}
                    </td>
                    <td>
                      <CartQuantity
                        key={`${product.id}-${quantity}`}
                        product={product}
                        quantity={quantity}
                      />
                    </td>
                    <td>{money(product.price)}</td>
                    <td>{money(product.price * quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <section className="retail-cart-next">
            <h2>What would you like to do next?</h2>
            <p>
              Choose if you have a discount code or gift certificate you want to
              use or would like to estimate your delivery cost.
            </p>
            <div className="retail-cart-bottom">
              <div className="retail-cart-accordions">
                <details>
                  <summary>
                    Use Coupon Code <ChevronDown size={24} />
                  </summary>
                  <form onSubmit={(e) => codeSubmit(e)}>
                    <label htmlFor="cart-coupon">Enter your coupon here</label>
                    <div className="retail-cart-inline">
                      <input
                        id="cart-coupon"
                        name="coupon"
                        placeholder="Coupon code"
                        required
                        maxLength={50}
                      />
                      <button className="account-button" type="submit">
                        Apply Coupon
                      </button>
                    </div>
                  </form>
                </details>
                <details>
                  <summary>
                    Estimate Shipping &amp; Taxes <ChevronDown size={24} />
                  </summary>
                  <form onSubmit={estimate}>
                    <p>
                      Enter your destination for a demo delivery estimate.
                      Prices are tax-inclusive; no additional tax is added.
                    </p>
                    <label htmlFor="cart-country">
                      Country <span>*</span>
                    </label>
                    <select id="cart-country" name="country" required>
                      <option>Nigeria</option>
                    </select>
                    <label htmlFor="cart-state">
                      Region / State <span>*</span>
                    </label>
                    <input
                      id="cart-state"
                      name="state"
                      placeholder="Region / State"
                      autoComplete="address-level1"
                      required
                    />
                    <label htmlFor="cart-postcode">Post Code</label>
                    <input
                      id="cart-postcode"
                      name="postcode"
                      placeholder="Post Code"
                      autoComplete="postal-code"
                    />
                    <button className="account-button" type="submit">
                      Get Estimate
                    </button>
                  </form>
                </details>
                <details>
                  <summary>
                    Use Gift Certificate <ChevronDown size={24} />
                  </summary>
                  <form onSubmit={(e) => codeSubmit(e, true)}>
                    <label htmlFor="cart-gift">
                      Enter your gift certificate code here
                    </label>
                    <div className="retail-cart-inline">
                      <input
                        id="cart-gift"
                        name="gift"
                        placeholder="Gift certificate code"
                        required
                        maxLength={50}
                      />
                      <button className="account-button" type="submit">
                        Apply Gift Certificate
                      </button>
                    </div>
                  </form>
                </details>
              </div>
              <aside className="retail-cart-totals" aria-label="Cart totals">
                <table>
                  <tbody>
                    <tr>
                      <th scope="row">Sub-Total:</th>
                      <td>{money(subtotal)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Delivery:</th>
                      <td>{delivery ? money(delivery) : "Free"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Total:</th>
                      <td>{money(subtotal + delivery)}</td>
                    </tr>
                  </tbody>
                </table>
                <p>Demo prices include tax. No additional tax is added.</p>
              </aside>
            </div>
            {feedback && (
              <p className="account-status" role="status">
                {feedback}
              </p>
            )}
            <div className="retail-cart-footer-actions">
              <Link className="account-button account-red" href="/shop">
                Continue Shopping
              </Link>
              <Link className="account-button" href="/checkout">
                Checkout
              </Link>
            </div>
            <p className="retail-cart-demo">
              Demo checkout · No payment will be collected. Coupon and gift
              certificate redemption are not connected.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
function CartQuantity({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  const { setQuantity, toast } = useStore();
  const [value, setValue] = useState(String(quantity));
  function update(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = Number(value);
    if (!Number.isInteger(next) || next < 1 || next > product.stock) return;
    setQuantity(product.id, next);
    toast("Shopping cart quantity updated");
  }
  return (
    <form className="retail-cart-quantity" onSubmit={update}>
      <input
        type="number"
        aria-label={`Quantity for ${product.name}`}
        value={value}
        min={1}
        max={product.stock}
        step={1}
        required
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="retail-cart-update"
        aria-label={`Update ${product.name} quantity`}
        title="Update quantity"
      >
        <RefreshCw size={20} />
      </button>
      <button
        type="button"
        className="retail-cart-remove"
        aria-label={`Remove ${product.name}`}
        title="Remove item"
        onClick={() => setQuantity(product.id, 0)}
      >
        <XCircle size={20} fill="white" />
      </button>
    </form>
  );
}
