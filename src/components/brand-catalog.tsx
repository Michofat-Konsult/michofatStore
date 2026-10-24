"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Home,
  List,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { categories, products } from "@/lib/products";
import { money } from "@/lib/utils";
import { useStore } from "./store-provider";
import { RetailProduct } from "./retail-product";
const PRICE_LIMIT = 2500000;
export function BrandCatalog() {
  const params = useSearchParams();
  const special = params.get("deals") === "true";
  const { compare } = useStore();
  const [category, setCategory] = useState(params.get("category") || "");
  const [brand, setBrand] = useState(params.get("brand") || "");
  const [query, setQuery] = useState(params.get("q") || "");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(PRICE_LIMIT);
  const [discount, setDiscount] = useState(0);
  const [rating, setRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("default");
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const collectionTitle =
    brand === (params.get("brand") || "") &&
    category === (params.get("category") || "")
      ? params.get("title")
      : "";
  const title = special
    ? "Special Offers"
    : collectionTitle ||
      brand ||
      category ||
      (params.get("q") ? `Search: ${params.get("q")}` : "All products");
  const inventory = special
    ? products.filter((p) => p.oldPrice && p.oldPrice > p.price)
    : products;
  const base = inventory.filter(
    (p) =>
      (!category || p.category === category) && (!brand || p.brand === brand),
  );
  let results = base.filter(
    (p) =>
      p.price >= min &&
      p.price <= max &&
      (!inStock || p.stock > 0) &&
      p.rating >= rating &&
      (!discount ||
        (p.oldPrice &&
          ((p.oldPrice - p.price) / p.oldPrice) * 100 >= discount)) &&
      `${p.name} ${p.brand} ${p.category} ${p.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  if (sort === "price-low")
    results = results.toSorted((a, b) => a.price - b.price);
  if (sort === "price-high")
    results = results.toSorted((a, b) => b.price - a.price);
  if (sort === "rating-high")
    results = results.toSorted((a, b) => b.rating - a.rating);
  if (sort === "rating-low")
    results = results.toSorted((a, b) => a.rating - b.rating);
  if (sort === "name-asc")
    results = results.toSorted((a, b) => a.name.localeCompare(b.name));
  if (sort === "name-desc")
    results = results.toSorted((a, b) => b.name.localeCompare(a.name));
  if (sort === "popular")
    results = results.toSorted((a, b) => b.reviews - a.reviews);
  if (sort === "newest") results = results.toReversed();
  const pages = Math.max(1, Math.ceil(results.length / limit));
  const currentPage = Math.min(page, pages);
  const visible = results.slice((currentPage - 1) * limit, currentPage * limit);
  const active =
    min > 0 ||
    max < PRICE_LIMIT ||
    query !== (params.get("title") ? params.get("q") || "" : "") ||
    discount > 0 ||
    rating > 0 ||
    inStock ||
    (special && !!brand);
  function reset() {
    if (special) setBrand("");
    setMin(0);
    setMax(PRICE_LIMIT);
    setQuery(params.get("title") ? params.get("q") || "" : "");
    setDiscount(0);
    setRating(0);
    setInStock(false);
    setPage(1);
  }
  function updatePrice(value: number, isMin: boolean) {
    const safe = Number.isFinite(value)
      ? Math.max(0, Math.min(PRICE_LIMIT, value))
      : 0;
    if (isMin) setMin(Math.min(safe, max));
    else setMax(Math.max(safe, min));
    setPage(1);
  }
  return (
    <div
      className={`brand-catalog special-catalog ${special ? "" : "mega-catalog"}`}
    >
      {!special && (
        <Link
          className="brand-wide-banner"
          href="/shop?category=Accessories"
          aria-label="Explore wireless headphones"
        >
          <Image
            unoptimized
            src="/reference/banner-brand-inner.webp"
            alt="Wireless portable headphones. Explore our audio offers."
            width={1920}
            height={200}
            loading="eager"
          />
        </Link>
      )}
      <div className="container">
        <nav className="brand-breadcrumb" aria-label="Breadcrumb">
          <Link href="/" aria-label="Home">
            <Home size={17} fill="currentColor" />
          </Link>
          <span>/</span>
          {!special && (
            <>
              <Link href="/shop">{brand ? "Brand" : "Shop"}</Link>
              <span>/</span>
            </>
          )}
          <span aria-current="page">{title}</span>
        </nav>
        <div className="brand-layout">
          <aside
            className={`brand-sidebar ${filtersOpen ? "filters-open" : ""}`}
            aria-label="Product filters"
          >
            <div className="brand-filter-title">
              <h2>FILTER</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
              <ChevronDown size={17} />
            </div>
            {active && (
              <div className="brand-active-filters">
                <span>Filters applied</span>
                <button onClick={reset}>
                  Reset all <X size={13} />
                </button>
              </div>
            )}
            <details open className="brand-filter-group">
              <summary>
                PRICE <ChevronDown size={14} />
              </summary>
              <div className="brand-price-slider">
                {
                  <input
                    type="range"
                    aria-label="Minimum price slider"
                    min={0}
                    max={PRICE_LIMIT}
                    step={5000}
                    value={min}
                    onChange={(e) => updatePrice(Number(e.target.value), true)}
                  />
                }
                <input
                  type="range"
                  aria-label="Maximum price"
                  min={min}
                  max={PRICE_LIMIT}
                  step={5000}
                  value={max}
                  onChange={(e) => updatePrice(Number(e.target.value), false)}
                />
              </div>
              <div className="brand-price-inputs">
                <label>
                  <span className="sr-only">Minimum price</span>
                  <input
                    type="number"
                    min={0}
                    max={max}
                    value={min}
                    onChange={(e) => updatePrice(Number(e.target.value), true)}
                  />
                </label>
                <span>to</span>
                <label>
                  <span className="sr-only">Maximum price amount</span>
                  <input
                    type="number"
                    min={min}
                    max={PRICE_LIMIT}
                    value={max}
                    onChange={(e) => updatePrice(Number(e.target.value), false)}
                  />
                </label>
              </div>
              <span className="brand-price-caption">
                {money(min)} – {money(max)}
              </span>
            </details>
            {special && (
              <details
                open
                className="brand-filter-group special-manufacturers"
              >
                <summary>
                  MANUFACTURER <ChevronDown size={14} />
                </summary>
                <label className="brand-check">
                  <input
                    type="radio"
                    name="manufacturer"
                    checked={!brand}
                    onChange={() => {
                      setBrand("");
                      setPage(1);
                    }}
                  />
                  <span>All manufacturers</span>
                  <small>{inventory.length}</small>
                </label>
                {Array.from(new Set(inventory.map((p) => p.brand)))
                  .sort()
                  .map((b) => (
                    <label className="brand-check" key={b}>
                      <input
                        type="radio"
                        name="manufacturer"
                        checked={brand === b}
                        onChange={() => {
                          setBrand(b);
                          setPage(1);
                        }}
                      />
                      <span className="special-brand-mark" aria-hidden="true">
                        {b.slice(0, 2)}
                      </span>
                      <span>{b}</span>
                      <small>
                        {inventory.filter((p) => p.brand === b).length}
                      </small>
                    </label>
                  ))}
              </details>
            )}
            <details open className="brand-filter-group">
              <summary>
                SEARCH <ChevronDown size={14} />
              </summary>
              <div className="brand-filter-search">
                <input
                  aria-label="Search this listing"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                />
                <Search size={15} />
              </div>
            </details>
            {!special && (
              <details open className="brand-filter-group">
                <summary>
                  BRAND <ChevronDown size={14} />
                </summary>
                <select
                  aria-label="Filter by brand"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All brands</option>
                  {Array.from(
                    new Set(
                      products
                        .filter((p) => !category || p.category === category)
                        .map((p) => p.brand),
                    ),
                  )
                    .sort()
                    .map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                </select>
              </details>
            )}
            <details open className="brand-filter-group">
              <summary>
                AVAILABILITY <ChevronDown size={14} />
              </summary>
              <label className="brand-check">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => {
                    setInStock(e.target.checked);
                    setPage(1);
                  }}
                />
                <span>In Stock</span>
                <small>{base.filter((p) => p.stock > 0).length}</small>
              </label>
            </details>
            <details open className="brand-filter-group">
              <summary>
                DISCOUNT <ChevronDown size={14} />
              </summary>
              <label className="brand-check">
                <input
                  type="radio"
                  name="discount"
                  checked={discount === 0}
                  onChange={() => {
                    setDiscount(0);
                    setPage(1);
                  }}
                />
                <span>{special ? "All offers" : "All products"}</span>
                <small>{base.length}</small>
              </label>
              {[1, 10, 20, 30, 40, 50].map((d) => (
                <label key={d} className="brand-check">
                  <input
                    type="radio"
                    name="discount"
                    checked={discount === d}
                    onChange={() => {
                      setDiscount(d);
                      setPage(1);
                    }}
                  />
                  <span>{d === 1 ? "On sale" : `${d}% off or more`}</span>
                  <small>
                    {
                      base.filter(
                        (p) =>
                          p.oldPrice &&
                          ((p.oldPrice - p.price) / p.oldPrice) * 100 >= d,
                      ).length
                    }
                  </small>
                </label>
              ))}
            </details>
            <details open className="brand-filter-group">
              <summary>
                RATING <ChevronDown size={14} />
              </summary>
              {[0, 4.5, 4, 3].map((r) => (
                <label key={r} className="brand-check">
                  <input
                    type="radio"
                    name="rating"
                    aria-label={r ? `${r} stars and up` : "All ratings"}
                    checked={rating === r}
                    onChange={() => {
                      setRating(r);
                      setPage(1);
                    }}
                  />
                  {r ? (
                    <span className="brand-star-label">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={17}
                          fill={i <= Math.floor(r) ? "currentColor" : "none"}
                        />
                      ))}
                      <span>& up</span>
                    </span>
                  ) : (
                    <span>All ratings</span>
                  )}
                  <small>{base.filter((p) => p.rating >= r).length}</small>
                </label>
              ))}
            </details>
            <div className="brand-category-links">
              <h3>CATEGORIES</h3>
              <button
                className={!category ? "selected" : ""}
                onClick={() => {
                  setCategory("");
                  setBrand("");
                  setPage(1);
                }}
              >
                All products
              </button>
              {categories.map((c) => (
                <button
                  className={category === c ? "selected" : ""}
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    setBrand("");
                    reset();
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            {!special && (
              <div
                className="mega-listing-tags"
                aria-label="Related collections"
              >
                {Array.from(new Set(base.map((p) => p.brand)))
                  .slice(0, 4)
                  .map((b) => (
                    <Link key={b} href={`/shop?brand=${encodeURIComponent(b)}`}>
                      {b}
                    </Link>
                  ))}
              </div>
            )}
            <div className="brand-sidebar-help">
              <h3>Need a little advice?</h3>
              <p>Find the right technology for your next upgrade.</p>
              <Link href="/contact">Talk to our team →</Link>
            </div>
          </aside>
          <section className="brand-results" aria-label="Product listing">
            <h1>{title}</h1>
            <div className="brand-toolbar">
              <button
                className="brand-mobile-filter"
                onClick={() => setFiltersOpen(!filtersOpen)}
                aria-expanded={filtersOpen}
              >
                <SlidersHorizontal size={16} /> Filter
              </button>
              <div
                className="brand-view-controls"
                role="group"
                aria-label="Product display"
              >
                <button
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                >
                  <List size={22} />
                </button>
              </div>
              <label className="brand-show">
                Show:{" "}
                <select
                  value={limit}
                  aria-label="Products per page"
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  {[4, 8, 20, 25, 50, 100].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <Link href="/compare" className="brand-compare">
                Product Compare ({compare.length})
              </Link>
              <label className="brand-sort">
                Sort By:{" "}
                <select
                  aria-label="Sort products"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="default">Default</option>
                  <option value="popular">Best sellers</option>
                  <option value="newest">Newest</option>
                  <option value="name-asc">Name (A - Z)</option>
                  <option value="name-desc">Name (Z - A)</option>
                  <option value="price-low">Price (Low &gt; High)</option>
                  <option value="price-high">Price (High &gt; Low)</option>
                  <option value="rating-high">Rating (Highest)</option>
                  <option value="rating-low">Rating (Lowest)</option>
                </select>
              </label>
            </div>
            {active && (
              <div className="brand-results-filter-note">
                <span>{results.length} products match your filters</span>
                <button onClick={reset}>
                  Clear filters <X size={12} />
                </button>
              </div>
            )}
            {visible.length ? (
              <div
                className={`brand-products ${view === "list" ? "brand-list-view" : ""}`}
              >
                {visible.map((p) => (
                  <RetailProduct key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="empty-state brand-empty">
                <Search size={32} />
                <h2>No products found</h2>
                <p>Try another search or adjust your filters.</p>
                <button className="retail-button" onClick={reset}>
                  Reset filters
                </button>
              </div>
            )}
            <div className="brand-pagination">
              <p role="status">
                Showing {results.length ? (currentPage - 1) * limit + 1 : 0} to{" "}
                {Math.min(currentPage * limit, results.length)} of{" "}
                {results.length} ({pages} {pages === 1 ? "Page" : "Pages"})
              </p>
              {pages > 1 && (
                <nav aria-label="Product pages">
                  <button
                    aria-label="Previous page"
                    disabled={currentPage === 1}
                    onClick={() => setPage(currentPage - 1)}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: pages }, (_, i) => (
                    <button
                      key={i}
                      aria-label={`Page ${i + 1}`}
                      aria-current={currentPage === i + 1 ? "page" : undefined}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    aria-label="Next page"
                    disabled={currentPage === pages}
                    onClick={() => setPage(currentPage + 1)}
                  >
                    <ChevronRight size={16} />
                  </button>
                </nav>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
