"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "@/lib/products";
import { money } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { Button } from "./ui/button";
export function Catalog() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [max, setMax] = useState(2500000);
  const [brand, setBrand] = useState("");
  const [deals, setDeals] = useState(params.get("deals") === "true");
  const [sort, setSort] = useState("featured");
  const [filters, setFilters] = useState(false);
  let results = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!brand || p.brand === brand) &&
      p.price <= max &&
      (!deals || p.oldPrice) &&
      `${p.name} ${p.brand} ${p.category} ${p.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  if (sort === "price-low")
    results = results.toSorted((a, b) => a.price - b.price);
  if (sort === "price-high")
    results = results.toSorted((a, b) => b.price - a.price);
  if (sort === "rating")
    results = results.toSorted((a, b) => b.rating - a.rating);
  function reset() {
    setQuery("");
    setCategory("");
    setMax(2500000);
    setBrand("");
    setDeals(false);
  }
  return (
    <div className="container page-space">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Shop
      </div>
      <div className="page-title">
        <span className="eyebrow">YOUR NEXT UPGRADE IS HERE</span>
        <h1>Explore the store.</h1>
        <p>A little something for every kind of possibility.</p>
      </div>
      <div className="catalog-toolbar">
        <div className="catalog-search">
          <Search size={18} />
          <input
            aria-label="Search the catalog"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
          />
        </div>
        <Button
          variant="outline"
          className="filter-toggle"
          onClick={() => setFilters(!filters)}
        >
          <SlidersHorizontal size={16} /> Filters
        </Button>
        <label className="sort-label">
          Sort by{" "}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>
      <div className="catalog-layout">
        <aside className={`filter-panel ${filters ? "visible" : ""}`}>
          <div className="filter-heading">
            <h2>Filters</h2>
            <button onClick={reset}>Reset all</button>
          </div>
          <fieldset>
            <legend>Categories</legend>
            <label>
              <input
                type="radio"
                checked={!category}
                onChange={() => setCategory("")}
              />{" "}
              All products
            </label>
            {categories.map((c) => (
              <label key={c}>
                <input
                  type="radio"
                  checked={category === c}
                  onChange={() => setCategory(c)}
                />
                {c}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Price range</legend>
            <input
              type="range"
              aria-label="Maximum price"
              min={0}
              max={2500000}
              step={5000}
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>₦0</span>
              <strong>{money(max)}</strong>
            </div>
          </fieldset>
          <fieldset>
            <legend>Brand</legend>
            <select
              aria-label="Filter by brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">All brands</option>
              {Array.from(new Set(products.map((p) => p.brand)))
                .sort()
                .map((b) => (
                  <option key={b}>{b}</option>
                ))}
            </select>
          </fieldset>
          <label className="deals-checkbox">
            <input
              type="checkbox"
              checked={deals}
              onChange={(e) => setDeals(e.target.checked)}
            />{" "}
            On sale only
          </label>
          <div className="filter-help">
            <h3>Choosing can be tricky.</h3>
            <p>Let’s find your perfect fit.</p>
            <Link href="/contact">Ask a tech expert →</Link>
          </div>
        </aside>
        <div>
          <div className="results-meta">
            <span>{results.length} products found</span>
            {(category || brand || deals) && (
              <button onClick={reset}>
                Clear filters <X size={13} />
              </button>
            )}
          </div>
          {results.length ? (
            <div className="product-grid catalog-grid">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={38} />
              <h2>No matches just yet.</h2>
              <p>
                Try a different search or give your filters a little more room.
              </p>
              <Button onClick={reset}>Reset filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
