"use client";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories } from "@/lib/products";
export function SearchCategory() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="header-search-category"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse" && window.matchMedia("(min-width: 701px)").matches) setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (
          e.pointerType === "mouse" &&
          !e.currentTarget.contains(document.activeElement)
        )
          setOpen(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <input type="hidden" name="category" value={value} />
      <button
        ref={trigger}
        type="button"
        aria-label={`Search category: ${value || "All Categories"}`}
        aria-expanded={open}
        aria-controls="header-search-categories"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span>{value || "All Categories"}</span>
        <ChevronDown size={17} />
      </button>
      {open && (
        <div
          className="header-category-options"
          id="header-search-categories"
          role="group"
          aria-label="Search categories"
        >
          {["", ...categories].map((c) => (
            <button
              type="button"
              key={c}
              aria-pressed={value === c}
              onClick={() => {
                setValue(c);
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              {c || "All Categories"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
