"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Headphones,
  Heart,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { useStore } from "./store-provider";
import { categories } from "@/lib/products";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Michofat home">
      <span className="logo-mark">
        <Zap size={25} fill="currentColor" />
      </span>
      <span>
        michofat<span className="logo-dot">.</span>
        <small>YOUR WORLD. UPGRADED.</small>
      </span>
    </Link>
  );
}
export function Header() {
  const { cart, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            <Truck size={14} /> Free delivery on orders over ₦500,000
          </span>
          <span className="top-right">
            Genuine tech. Real peace of mind.{" "}
            <Link href="/contact">
              Talk to an expert <ArrowRight size={12} />
            </Link>
          </span>
        </div>
      </div>
      <header className="header">
        <div className="container header-main">
          <Logo />
          <form action="/shop" className="search">
            <Search size={19} />
            <input
              name="q"
              aria-label="Search products"
              placeholder="Search laptops, phones, accessories…"
            />
            <button type="submit" aria-label="Submit search">
              <ArrowRight size={19} />
            </button>
          </form>
          <div className="header-actions">
            <Link href="/contact" className="support">
              <Headphones size={23} />
              <span>
                <small>Need a hand?</small>Let’s talk tech
              </span>
            </Link>
            <Link
              href="/wishlist"
              className="icon-link"
              aria-label={`Wishlist, ${wishlist.length} items`}
            >
              <Heart size={23} />
              {wishlist.length > 0 && <b>{wishlist.length}</b>}
            </Link>
            <Link
              href="/cart"
              className="icon-link"
              aria-label={`Cart, ${cart.reduce((a, l) => a + l.quantity, 0)} items`}
            >
              <ShoppingBag size={23} />
              <b>{cart.reduce((a, l) => a + l.quantity, 0)}</b>
            </Link>
            <button
              className="mobile-menu"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <nav
          className={`container navigation ${open ? "open" : ""}`}
          aria-label="Main navigation"
        >
          <Link href="/shop" onClick={() => setOpen(false)} className="browse">
            <Menu size={17} /> Shop all categories
          </Link>
          {[
            ["/", "Home"],
            ["/shop", "Shop"],
            ["/shop?deals=true", "Hot deals"],
            ["/about", "About us"],
            ["/contact", "Contact us"],
          ].map(([href, label]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={pathname === href ? "active" : ""}
            >
              {label}
              {label === "Hot deals" && <span className="nav-pill">HOT</span>}
            </Link>
          ))}
          <a className="nav-phone" href="tel:+2348000000000">
            <Phone size={15} /> Call our team
          </a>
        </nav>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div>
          <Logo />
          <p>
            Good tech. Great possibilities.
            <br />
            Your next upgrade starts here.
          </p>
          <span className="demo-label">
            Demo storefront · Mock products & prices
          </span>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/shop">Shop all products</Link>
          <Link href="/shop?deals=true">Latest deals</Link>
          <Link href="/wishlist">Your wishlist</Link>
          <Link href="/cart">Shopping cart</Link>
        </div>
        <div>
          <h3>Here to help</h3>
          <Link href="/contact">Contact us</Link>
          <Link href="/help">Delivery & returns</Link>
          <Link href="/help#faq">FAQs</Link>
          <Link href="/about">About Michofat</Link>
        </div>
        <div>
          <h3>Shop by category</h3>
          {categories.slice(0, 4).map((c) => (
            <Link key={c} href={`/shop?category=${encodeURIComponent(c)}`}>
              {c}
            </Link>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Michofat Store. All rights reserved.
        </span>
        <div>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms of service</Link>
          <span>🇳🇬 NGN</span>
        </div>
      </div>
    </footer>
  );
}
