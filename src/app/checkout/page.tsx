"use client";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { OrderSummary, useTotals } from "@/components/cart-view";
import { useStore } from "@/components/store-provider";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/utils";
export default function Checkout() {
  const { ready, clear } = useStore();
  const { lines, subtotal, delivery, physical } = useTotals();
  const [order, setOrder] = useState<{ id: string; total: number } | null>(
    null,
  );
  if (!ready)
    return <div className="container page-space">Loading checkout…</div>;
  if (order)
    return (
      <div className="container page-space">
        <div className="empty-state success">
          <CheckCircle2 size={56} />
          <span className="eyebrow">ALL SET FOR WHAT’S NEXT</span>
          <h1>Your demo order is confirmed.</h1>
          <p>
            Order {order.id} · {money(order.total)}
          </p>
          <p>
            No charge was made, no email was sent, and no delivery is scheduled.
            <br />
            Your contact details were not saved.
          </p>
          <Button asChild>
            <Link href="/shop">Keep exploring</Link>
          </Button>
        </div>
      </div>
    );
  if (!lines.length)
    return (
      <div className="container page-space empty-state">
        <h1>Your bag is empty.</h1>
        <p>Add a little possibility before checking out.</p>
        <Button asChild>
          <Link href="/shop">Shop products</Link>
        </Button>
      </div>
    );
  return (
    <div className="container page-space">
      <div className="breadcrumb">
        <Link href="/cart">Cart</Link> / Checkout
      </div>
      <div className="page-title">
        <span className="eyebrow">THE LAST LITTLE STEP</span>
        <h1>Make it yours.</h1>
        <p>Demo checkout — no real payment or fulfillment.</p>
      </div>
      <form
        className="cart-layout"
        onSubmit={(e) => {
          e.preventDefault();
          setOrder({
            id: `MFT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
            total: subtotal + delivery,
          });
          clear();
        }}
      >
        <div className="form-panel">
          <h2>Contact information</h2>
          <div className="form-grid">
            <label>
              First name
              <input autoComplete="given-name" required maxLength={80} />
            </label>
            <label>
              Last name
              <input autoComplete="family-name" required maxLength={80} />
            </label>
            <label className="full">
              Email address
              <input type="email" autoComplete="email" required />
            </label>
            <label className="full">
              Phone number
              <input
                type="tel"
                autoComplete="tel"
                required
                minLength={7}
                maxLength={20}
              />
            </label>
          </div>
          {physical && (
            <>
              <h2>Delivery address</h2>
              <div className="form-grid">
                <label className="full">
                  Street address
                  <input
                    autoComplete="street-address"
                    required
                    maxLength={200}
                  />
                </label>
                <label>
                  City
                  <input autoComplete="address-level2" required />
                </label>
                <label>
                  State
                  <select required defaultValue="">
                    <option value="" disabled>
                      Select state
                    </option>
                    {[
                      "Abia",
                      "Adamawa",
                      "Akwa Ibom",
                      "Anambra",
                      "Bauchi",
                      "Bayelsa",
                      "Benue",
                      "Borno",
                      "Cross River",
                      "Delta",
                      "Ebonyi",
                      "Edo",
                      "Ekiti",
                      "Enugu",
                      "FCT Abuja",
                      "Gombe",
                      "Imo",
                      "Jigawa",
                      "Kaduna",
                      "Kano",
                      "Katsina",
                      "Kebbi",
                      "Kogi",
                      "Kwara",
                      "Lagos",
                      "Nasarawa",
                      "Niger",
                      "Ogun",
                      "Ondo",
                      "Osun",
                      "Oyo",
                      "Plateau",
                      "Rivers",
                      "Sokoto",
                      "Taraba",
                      "Yobe",
                      "Zamfara",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="full">
                  Country
                  <input value="Nigeria" readOnly />
                </label>
              </div>
            </>
          )}
          <h2>Payment</h2>
          <div className="payment-demo">
            <CreditCard />
            <div>
              <strong>Demo payment</strong>
              <p>No card details required. Your order will be simulated.</p>
            </div>
            <ShieldCheck />
          </div>
          <label className="checkbox-row">
            <input type="checkbox" required />{" "}
            <span>
              I understand this is a demo and agree to the{" "}
              <Link href="/terms">terms</Link>.
            </span>
          </label>
        </div>
        <OrderSummary>
          <Button type="submit" className="w-full">
            Place demo order
          </Button>
          <p className="fine-print">
            Your information stays in this form and is discarded when you leave.
          </p>
        </OrderSummary>
      </form>
    </div>
  );
}
