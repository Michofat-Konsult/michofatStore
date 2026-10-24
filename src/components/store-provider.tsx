"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, X, ArrowRight } from "lucide-react";
import { money } from "@/lib/utils";
import { products } from "@/lib/products";
import { sanitizeCart, type CartLine } from "@/lib/cart";
type Store = {
  cart: CartLine[];
  wishlist: string[];
  ready: boolean;
  compare: string[];
  toggleCompare: (id: string) => void;
  add: (id: string, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  toggleWish: (id: string) => void;
  clear: () => void;
  toast: (message: string) => void;
};
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [cartNotice, setCartNotice] = useState<{ id: string } | null>(null);
  const [noticePaused, setNoticePaused] = useState(false);
  const noticeRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (cartNotice) noticeRef.current?.showPopover();
  }, [cartNotice]);
  // Restore browser-only storage after hydration; initial server/client markup must match.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      setCart(
        sanitizeCart(
          JSON.parse(localStorage.getItem("michofat-cart") || "[]"),
          Object.fromEntries(products.map((p) => [p.id, p.stock])),
        ),
      );
      const saved = JSON.parse(
        localStorage.getItem("michofat-wishlist") || "[]",
      );
      if (Array.isArray(saved))
        setWishlist(
          saved.filter(
            (id: unknown) =>
              typeof id === "string" && products.some((p) => p.id === id),
          ),
        );
    } catch {}
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("michofat-cart", JSON.stringify(cart));
        localStorage.setItem("michofat-wishlist", JSON.stringify(wishlist));
      } catch {}
  }, [cart, wishlist, ready]);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3500);
      return () => clearTimeout(timer);
    }
  }, [message]);
  useEffect(() => {
    if (!cartNotice || noticePaused) return;
    const timer = setTimeout(() => setCartNotice(null), 8000);
    return () => clearTimeout(timer);
  }, [cartNotice, noticePaused]);
  function add(id: string, quantity = 1) {
    const p = products.find((p) => p.id === id);
    if (!p) return;
    if (!Number.isFinite(quantity) || quantity < 1 || p.stock < 1) return;
    quantity = Math.floor(quantity);
    if ((cart.find((l) => l.id === id)?.quantity || 0) >= p.stock) {
      setCartNotice(null);
      setMessage(`All available stock for ${p.name} is already in your cart`);
      return;
    }
    setCart((lines) => {
      const found = lines.find((l) => l.id === id);
      return found
        ? lines.map((l) =>
            l.id === id
              ? { ...l, quantity: Math.min(p.stock, l.quantity + quantity) }
              : l,
          )
        : [...lines, { id, quantity: Math.min(p.stock, quantity) }];
    });
    setMessage("");
    setNoticePaused(false);
    setCartNotice({ id });
  }
  const noticeProduct = products.find((p) => p.id === cartNotice?.id);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, line) =>
      sum +
      (products.find((p) => p.id === line.id)?.price || 0) * line.quantity,
    0,
  );
  return (
    <Context.Provider
      value={{
        cart,
        wishlist,
        ready,
        compare,
        toggleCompare: (id) =>
          setCompare((list) =>
            list.includes(id)
              ? list.filter((item) => item !== id)
              : [...list.slice(-3), id],
          ),
        add,
        setQuantity: (id, quantity) =>
          setCart((lines) =>
            quantity <= 0
              ? lines.filter((l) => l.id !== id)
              : lines.map((l) =>
                  l.id === id
                    ? {
                        ...l,
                        quantity: Math.min(
                          products.find((p) => p.id === id)?.stock || 1,
                          quantity,
                        ),
                      }
                    : l,
                ),
          ),
        toggleWish: (id) =>
          setWishlist((list) =>
            list.includes(id) ? list.filter((i) => i !== id) : [...list, id],
          ),
        clear: () => setCart([]),
        toast: setMessage,
      }}
    >
      {children}
      {noticeProduct && (
        <section
          ref={noticeRef}
          popover="manual"
          className="cart-success-toast"
          aria-label="Added to cart notification"
          onMouseEnter={() => setNoticePaused(true)}
          onMouseLeave={() => setNoticePaused(false)}
          onFocusCapture={() => setNoticePaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget))
              setNoticePaused(false);
          }}
        >
          <div className="cart-success-heading">
            <span>
              <ShoppingCart size={20} />
              {cartCount} item(s) - {money(cartSubtotal)}
            </span>
            <button
              aria-label="Dismiss cart notification"
              onClick={() => {
                setCartNotice(null);
                setNoticePaused(false);
              }}
            >
              <X size={24} />
            </button>
          </div>
          <div className="cart-success-body">
            <Image
              unoptimized
              src={noticeProduct.image}
              alt={noticeProduct.name}
              width={80}
              height={100}
            />
            <p role="status" aria-live="polite" aria-atomic="true">
              Success: You have added{" "}
              <Link
                href={`/product/${noticeProduct.id}`}
                onClick={() => setCartNotice(null)}
              >
                {noticeProduct.name}
              </Link>{" "}
              to your{" "}
              <Link href="/cart" onClick={() => setCartNotice(null)}>
                shopping cart
              </Link>
              !
            </p>
          </div>
          <div className="cart-success-actions">
            <Link href="/cart" onClick={() => setCartNotice(null)}>
              View Cart <ArrowRight size={19} />
            </Link>
            <Link href="/checkout" onClick={() => setCartNotice(null)}>
              Checkout <ArrowRight size={19} />
            </Link>
          </div>
        </section>
      )}
      <div
        role="status"
        aria-live="polite"
        className={`toast ${message ? "show" : ""}`}
      >
        {message}
      </div>
    </Context.Provider>
  );
}
export function useStore() {
  const context = useContext(Context);
  if (!context) throw new Error("StoreProvider required");
  return context;
}
