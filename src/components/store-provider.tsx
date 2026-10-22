"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { products } from "@/lib/products";
import { sanitizeCart, type CartLine } from "@/lib/cart";
type Store = {
  cart: CartLine[];
  wishlist: string[];
  ready: boolean;
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
  const [message, setMessage] = useState("");
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
  function add(id: string, quantity = 1) {
    const p = products.find((p) => p.id === id);
    if (!p) return;
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
    setMessage(`${p.name} added to your cart`);
  }
  return (
    <Context.Provider
      value={{
        cart,
        wishlist,
        ready,
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
