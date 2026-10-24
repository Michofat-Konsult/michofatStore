"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  Menu,
  X,
  Laptop,
  Smartphone,
  Headphones,
  Network,
  Disc3,
  Printer,
  Camera,
  Gamepad2,
} from "lucide-react";
import { categories } from "@/lib/products";
const icons = [
  Laptop,
  Smartphone,
  Headphones,
  Network,
  Disc3,
  Printer,
  Camera,
  Gamepad2,
];
export function CategoryDrawer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  function close() {
    dialog.current?.close();
  }
  return (
    <>
      <button
        className="retail-category-trigger"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="top-categories"
      >
        <Menu size={23} /> Shop by Category
      </button>
      <dialog
        ref={dialog}
        id="top-categories"
        className="category-side-drawer"
        aria-labelledby="category-drawer-title"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              close();
          }
        }}
      >
        <header>
          <h2 id="category-drawer-title">Top categories</h2>
          <button onClick={close} aria-label="Close categories">
            <X size={26} />
          </button>
        </header>
        <nav aria-label="Top categories">
          {categories.map((category, index) => {
            const Icon = icons[index] ?? Laptop;
            return (
              <Link
                key={category}
                href={`/shop?category=${encodeURIComponent(category)}`}
                onClick={close}
              >
                <Icon size={25} />
                <span>{category}</span>
              </Link>
            );
          })}
        </nav>
      </dialog>
    </>
  );
}
