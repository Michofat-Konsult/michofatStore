"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  Heart,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { categories } from "@/lib/products";
import { money } from "@/lib/utils";
import { useStore } from "./store-provider";
import { useTotals } from "./cart-view";
import { CategoryDrawer } from "./category-drawer";
import { SearchCategory } from "./search-category";
export function RetailLogo() {
  return (
    <Link className="retail-logo" href="/" aria-label="Michofat home">
      <ShoppingCart strokeWidth={1.7} />
      <span>
        michofat<small>ICT mega store</small>
      </span>
    </Link>
  );
}
const menuGroups = [
  {
    title: "Laptops & computers",
    links: [
      [
        "Apple MacBook",
        "/shop?brand=Apple&category=Laptops%20%26%20computers&title=Apple%20MacBook",
      ],
      [
        "HP laptops",
        "/shop?brand=HP&category=Laptops%20%26%20computers&title=HP%20laptops",
      ],
      ["Dell computers", "/shop?brand=Dell&title=Dell%20computers"],
      ["All computers", `/shop?category=${encodeURIComponent(categories[0])}`],
    ],
  },
  {
    title: "Phones & accessories",
    links: [
      [
        "Apple iPhone",
        "/shop?brand=Apple&category=Phones%20%26%20tablets&title=Apple%20iPhone",
      ],
      [
        "Samsung Galaxy",
        "/shop?brand=Samsung&category=Phones%20%26%20tablets&title=Samsung%20Galaxy",
      ],
      ["Headphones", "/shop?q=headphones&title=Headphones"],
      ["Mouse & keyboard", "/shop?q=mouse&title=Mouse%20%26%20keyboard"],
      ["USB-C accessories", "/shop?q=USB-C&title=USB-C%20accessories"],
    ],
  },
  {
    title: "Networking & software",
    links: [
      ["Cisco routers", "/shop?brand=Cisco&q=router&title=Cisco%20routers"],
      [
        "Network switches",
        "/shop?category=Networking&q=switch&title=Network%20switches",
      ],
      ["Windows licenses", "/shop?q=Windows&title=Windows%20licenses"],
      [
        "Antivirus & security",
        "/shop?category=Software%20%26%20security&title=Antivirus%20%26%20security",
      ],
      ["Business enquiries", "/contact"],
    ],
  },
];
export function Header() {
  const { cart, wishlist, compare, setQuantity } = useStore();
  const { lines, subtotal, delivery } = useTotals();
  const [promo, setPromo] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState("");
  const drawer = useRef<HTMLDialogElement>(null);
  const count = cart.reduce((sum, l) => sum + l.quantity, 0);
  function closeMenus() {
    setMenu("");
    setMobile(false);
  }
  return (
    <>
      {promo && (
        <div className="retail-top-ad">
          <Link
            href="/shop?category=Accessories"
            aria-label="Music time: shop headphones"
          >
            <Image
              unoptimized
              src="/reference/banner-top-offer-banner-1920x50.jpg"
              alt="Music Time. Wireless Portable Headphone. Buy now."
              width={1920}
              height={50}
              loading="eager"
            />
          </Link>
          <button
            aria-label="Dismiss promotion"
            onClick={() => setPromo(false)}
          >
            <X size={18} />
          </button>
        </div>
      )}
      <header className="retail-header">
        <div className="container retail-header-main">
          <RetailLogo />
          <form action="/shop" className="retail-search">
            <SearchCategory />
            <input
              name="q"
              aria-label="Search products"
              placeholder="Search For Products"
            />
            <button type="submit" aria-label="Search products">
              <span>SEARCH</span>
              <Search size={19} />
            </button>
          </form>
          <div className="retail-header-actions">
            <Link
              href="/compare"
              aria-label={`Compare, ${compare.length} products`}
            >
              <ArrowLeftRight />
              {compare.length > 0 && <b>{compare.length}</b>}
            </Link>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
            >
              <Heart />
              {wishlist.length > 0 && <b>{wishlist.length}</b>}
            </Link>
            <button
              onClick={() => drawer.current?.showModal()}
              aria-label={`Open cart, ${count} items`}
            >
              <ShoppingCart />
              <b>{count}</b>
            </button>
            <button
              className="retail-mobile-toggle"
              onClick={() => setMobile(!mobile)}
              aria-label="Toggle navigation"
              aria-expanded={mobile}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <div className="retail-nav-wrap">
        <nav
          className={`container retail-nav ${mobile ? "mobile-open" : ""}`}
          aria-label="Main navigation"
          onPointerLeave={(e) => {
            if (
              e.pointerType === "mouse" &&
              !e.currentTarget.contains(document.activeElement)
            )
              setMenu("");
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setMenu("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMenu("");
          }}
        >
          <div className="retail-category-menu">
            <CategoryDrawer />
          </div>
          <Link href="/" onClick={closeMenus} className="retail-home-link">
            Home
          </Link>
          <Link href="/shop?deals=true" onClick={closeMenus}>
            Special <span className="retail-label red-label">Hot</span>
          </Link>
          <Link href="/journal" onClick={closeMenus}>
            Blog
          </Link>
          <button
            onClick={() => setMenu(menu === "mega" ? "" : "mega")}
            onPointerEnter={(e) => {
              if (
                e.pointerType === "mouse" &&
                window.matchMedia("(min-width: 701px)").matches
              )
                setMenu("mega");
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setMenu("mega");
              }
            }}
            aria-expanded={menu === "mega"}
            aria-controls="retail-mega-menu"
          >
            Mega Menu <ChevronDown size={13} />
          </button>
          <div
            className="header-small-menu"
            onPointerEnter={(e) => {
              if (
                e.pointerType === "mouse" &&
                window.matchMedia("(min-width: 701px)").matches
              )
                setMenu("business");
            }}
          >
            <button
              type="button"
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setMenu("business");
                }
              }}
              onClick={() => setMenu(menu === "business" ? "" : "business")}
              aria-expanded={menu === "business"}
              aria-controls="header-business-links"
            >
              Business{" "}
              <span className="retail-label yellow-label">Featured</span>
              <ChevronDown size={13} />
            </button>
            {menu === "business" && (
              <div className="header-small-panel" id="header-business-links">
                <Link href="/contact" onClick={closeMenus}>
                  Contact us
                </Link>
                <Link href="/about" onClick={closeMenus}>
                  About us
                </Link>
                <Link href="/return" onClick={closeMenus}>
                  Product returns
                </Link>
                <Link href="/help" onClick={closeMenus}>
                  Help &amp; delivery
                </Link>
              </div>
            )}
          </div>
          <div
            className="header-small-menu retail-account"
            onPointerEnter={(e) => {
              if (
                e.pointerType === "mouse" &&
                window.matchMedia("(min-width: 701px)").matches
              )
                setMenu("account");
            }}
          >
            <button
              type="button"
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setMenu("account");
                }
              }}
              onClick={() => setMenu(menu === "account" ? "" : "account")}
              aria-expanded={menu === "account"}
              aria-controls="header-account-links"
            >
              <UserRound size={20} /> My account <ChevronDown size={13} />
            </button>
            {menu === "account" && (
              <div className="header-small-panel" id="header-account-links">
                <Link href="/login" onClick={closeMenus}>
                  Login
                </Link>
                <Link href="/register" onClick={closeMenus}>
                  Register
                </Link>
                <Link href="/account" onClick={closeMenus}>
                  My Account
                </Link>
                <Link href="/account/orders" onClick={closeMenus}>
                  Order History
                </Link>
                <Link href="/wishlist" onClick={closeMenus}>
                  Wish List
                </Link>
              </div>
            )}
          </div>
          {menu === "mega" && (
            <div className="retail-mega" id="retail-mega-menu">
              <div className="retail-mega-groups">
                {menuGroups.map((g) => (
                  <div key={g.title}>
                    <h3>{g.title}</h3>
                    {g.links.map(([label, url]) => (
                      <Link key={label} href={url} onClick={closeMenus}>
                        {label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <Link
                href="/shop?category=Software%20%26%20security"
                onClick={closeMenus}
              >
                <Image
                  unoptimized
                  src="/reference/banner-megamenu-offer-220x400.jpg"
                  alt="Explore Microsoft software and devices"
                  width={220}
                  height={400}
                />
              </Link>
              <button
                className="mega-close"
                aria-label="Close mega menu"
                onClick={() => setMenu("")}
              >
                <X size={18} />
              </button>
            </div>
          )}
        </nav>
      </div>
      <div className="retail-sale-strip">
        <Link href="/shop?deals=true">
          <strong>Upgrade for less</strong> on computers, phones, accessories,
          networking & more <span>SHOP DEALS</span>
        </Link>
      </div>
      <dialog
        className="retail-cart-drawer"
        ref={drawer}
        aria-labelledby="retail-cart-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) drawer.current?.close();
        }}
      >
        <div className="retail-drawer-heading">
          <h2 id="retail-cart-title">Cart</h2>
          <button
            aria-label="Close cart"
            onClick={() => drawer.current?.close()}
          >
            <X size={25} />
          </button>
        </div>
        <div className="retail-drawer-body">
          {!lines.length ? (
            <p className="drawer-empty">Your shopping cart is empty!</p>
          ) : (
            lines.map(({ product: p, quantity }) => (
              <div className="drawer-line" key={p.id}>
                <Image
                  unoptimized
                  src={p.image}
                  alt={p.name}
                  width={80}
                  height={90}
                />
                <div>
                  <Link
                    onClick={() => drawer.current?.close()}
                    href={`/product/${p.id}`}
                  >
                    {p.name}
                  </Link>
                  <strong>{money(p.price)}</strong>
                  <div className="drawer-quantity">
                    <button
                      onClick={() => setQuantity(p.id, quantity - 1)}
                      aria-label={`Decrease ${p.name}`}
                    >
                      <Minus size={13} />
                    </button>
                    <span>{quantity}</span>
                    <button
                      disabled={quantity >= p.stock}
                      onClick={() => setQuantity(p.id, quantity + 1)}
                      aria-label={`Increase ${p.name}`}
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setQuantity(p.id, 0)}
                  aria-label={`Remove ${p.name}`}
                >
                  <X size={15} />
                </button>
              </div>
            ))
          )}
          <dl className="drawer-totals">
            <div>
              <dt>Sub-Total:</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            {!!lines.length && (
              <div>
                <dt>Delivery:</dt>
                <dd>{delivery ? money(delivery) : "Free"}</dd>
              </div>
            )}
            <div>
              <dt>Total:</dt>
              <dd>{money(subtotal + (lines.length ? delivery : 0))}</dd>
            </div>
          </dl>
        </div>
        <div className="retail-drawer-actions">
          <Link
            className="retail-button"
            href="/cart"
            onClick={() => drawer.current?.close()}
          >
            Edit cart <ArrowRight size={18} />
          </Link>
          <Link
            className="retail-button red-button"
            href={lines.length ? "/checkout" : "/shop"}
            onClick={() => drawer.current?.close()}
          >
            {lines.length ? "Checkout" : "Start shopping"}{" "}
            <ArrowRight size={18} />
          </Link>
        </div>
      </dialog>
    </>
  );
}
export function Footer() {
  const [done, setDone] = useState(false);
  return (
    <footer className="retail-footer">
      <div className="container retail-footer-news">
        <RetailLogo />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <label className="sr-only" htmlFor="retail-news-email">
            Newsletter email
          </label>
          <Mail size={20} />
          <input
            id="retail-news-email"
            type="email"
            required
            placeholder="Email ID"
            disabled={done}
          />
          <button disabled={done}>{done ? "SUBSCRIBED" : "SUBSCRIBE"}</button>
          <small role="status">
            {done
              ? "Demo signup complete. No email sent."
              : "Demo newsletter · No details are transmitted."}
          </small>
        </form>
        <div className="retail-social" aria-label="Customer support">
          <Link href="/contact" aria-label="Contact support">
            <Phone size={19} />
          </Link>
          <a href="mailto:hello@michofat.example" aria-label="Email Michofat">
            <Mail size={19} />
          </a>
          <Link href="/journal" aria-label="Read our journal">
            <BookOpen size={19} />
          </Link>
          <Link href="/wishlist" aria-label="View wishlist">
            <Heart size={19} />
          </Link>
          <Link href="/account" aria-label="Open my account">
            <UserRound size={19} />
          </Link>
        </div>
      </div>
      <div className="container retail-footer-grid">
        <div>
          <h3>ABOUT US</h3>
          <p>
            Your world, upgraded. Michofat brings computers, phones,
            accessories, networking and software together in one ICT mega store.
            Find the right tools for your work, your business and everything in
            between.
          </p>
          <small>Demo storefront · Mock inventory and prices</small>
        </div>
        <div>
          <h3>MY ACCOUNT</h3>
          <Link href="/account/orders">My order</Link>
          <Link href="/return">Returns</Link>
          <Link href="/contact">Support</Link>
          <Link href="/compare">Compare products</Link>
          <Link href="/wishlist">Wishlist</Link>
        </div>
        <div>
          <h3>QUICK LINKS</h3>
          <Link href="/about">About us</Link>
          <Link href="/journal">Blog</Link>
          <Link href="/shop">Shop products</Link>
          <Link href="/contact">Contact us</Link>
          <Link href="/#testimonials">Testimonials</Link>
        </div>
        <div>
          <h3>GET IN TOUCH</h3>
          <p>
            <MapPin size={17} /> Serving customers across Nigeria
          </p>
          <p>
            <Clock size={17} /> Mon–Fri · 9:00 AM–6:00 PM WAT
          </p>
          <a href="tel:+2348000000000">
            <Phone size={17} /> +234 (800) 000 0000
          </a>
          <a href="mailto:hello@michofat.example">
            <Mail size={17} /> hello@michofat.example
          </a>
          <small>Contact details are placeholders.</small>
        </div>
      </div>
      <div className="retail-footer-bottom">
        <div className="container">
          <span>
            © {new Date().getFullYear()} Michofat Store. All rights reserved.
          </span>
          <span>English · ₦ Nigerian Naira</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <span className="demo-payment">DEMO CHECKOUT</span>
          </div>
        </div>
      </div>
      <a className="retail-back-top" href="#top" aria-label="Back to top">
        <ChevronDown size={23} />
      </a>
    </footer>
  );
}
