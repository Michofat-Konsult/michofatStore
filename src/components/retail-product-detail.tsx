"use client";
import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ChevronDown,
  CreditCard,
  Heart,
  HelpCircle,
  Home,
  Maximize2,
  MinusCircle,
  PlusCircle,
  RotateCcw,
  Ruler,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { products, type Product } from "@/lib/products";
import { money } from "@/lib/utils";
import { useStore } from "./store-provider";
import { RetailProduct } from "./retail-product";
type Review = { name: string; text: string; rating: number };
function Specifications({ product: p }: { product: Product }) {
  return (
    <dl className="pdp-specifications">
      {Object.entries(p.specs).map(([key, value]) => (
        <div key={key}>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
export function RetailProductDetail({ product: p }: { product: Product }) {
  const { add, wishlist, toggleWish, compare, toggleCompare } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState(0);
  const [tab, setTab] = useState("Description");
  const [relatedOffset, setRelatedOffset] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewStatus, setReviewStatus] = useState("");
  const [questionDone, setQuestionDone] = useState(false);
  const [lightZoom, setLightZoom] = useState(false);
  const lightbox = useRef<HTMLDialogElement>(null);
  const specs = useRef<HTMLDialogElement>(null);
  const question = useRef<HTMLDialogElement>(null);
  const tabPanel = useRef<HTMLDivElement>(null);
  const reviewForm = useRef<HTMLFormElement>(null);
  const uid = useId();
  const available = p.stock > 0;
  const digital = p.category.includes("Software");
  const related = products
    .filter((other) => other.id !== p.id)
    .toSorted(
      (a, b) =>
        Number(b.category === p.category) - Number(a.category === p.category),
    );
  function openImage() {
    setLightZoom(false);
    lightbox.current?.showModal();
  }
  function selectTab(next: string) {
    setTab(next);
  }
  function submitReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = new FormData(e.currentTarget);
    setReviews((list) => [
      ...list,
      {
        name: String(fields.get("name")).trim(),
        text: String(fields.get("review")).trim(),
        rating: reviewRating,
      },
    ]);
    e.currentTarget.reset();
    setReviewStatus(
      "Your demo review was added locally. Nothing was published or sent.",
    );
    setTab("Reviews");
  }
  return (
    <div className="poco-product-detail">
      <Link
        className="brand-wide-banner"
        href="/shop?category=Accessories"
        aria-label="Explore wireless headphones"
      >
        <Image
          unoptimized
          src="/reference/banner-brand-inner.webp"
          alt="Wireless portable headphones. Explore audio offers."
          width={1920}
          height={200}
          loading="eager"
        />
      </Link>
      <div className="container">
        <nav className="brand-breadcrumb" aria-label="Breadcrumb">
          <Link href="/" aria-label="Home">
            <Home size={17} fill="currentColor" />
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(p.category)}`}>
            {p.category}
          </Link>
          <span>/</span>
          <span aria-current="page">{p.name}</span>
        </nav>
        <div className="pdp-columns">
          <div className="pdp-left-column">
            <section className="pdp-gallery" aria-label="Product images">
              <div className="pdp-thumbnails" aria-label="Image views">
                {["Product overview", "Closer look"].map((label, i) => (
                  <button
                    key={label}
                    onClick={() => setView(i)}
                    aria-label={label}
                    aria-pressed={view === i}
                  >
                    <Image
                      unoptimized
                      src={p.image}
                      alt=""
                      width={100}
                      height={110}
                      className={i === 1 ? "pdp-detail-crop" : ""}
                    />
                    <span>{i === 1 ? "Detail" : "Overview"}</span>
                  </button>
                ))}
                <button
                  className="pdp-thumb-expand"
                  onClick={openImage}
                  aria-label="Open image gallery"
                >
                  <Maximize2 size={22} />
                  <span>Expand</span>
                </button>
              </div>
              <div className="pdp-main-image">
                <button
                  className={`pdp-wishlist ${wishlist.includes(p.id) ? "is-saved" : ""}`}
                  aria-label={`${wishlist.includes(p.id) ? "Remove from" : "Save to"} wishlist`}
                  aria-pressed={wishlist.includes(p.id)}
                  onClick={() => toggleWish(p.id)}
                >
                  <Heart
                    size={20}
                    fill={wishlist.includes(p.id) ? "currentColor" : "none"}
                  />
                </button>
                <button
                  className={`pdp-image-open ${view === 1 ? "pdp-view-detail" : ""}`}
                  onClick={openImage}
                  aria-label={`View ${p.name} image fullscreen`}
                >
                  <Image
                    unoptimized
                    src={p.image}
                    alt={`${p.name}${view === 1 ? " — magnified detail" : ""}`}
                    width={650}
                    height={650}
                    loading="eager"
                  />
                </button>
                <button
                  className="pdp-expand"
                  onClick={openImage}
                  aria-label="Enlarge product image"
                >
                  <Maximize2 size={18} />
                </button>
                <span className="pdp-image-caption">
                  {view === 1
                    ? "Magnified product image"
                    : "Representative product image"}
                </span>
              </div>
            </section>
            <section className="pdp-tabs">
              <div role="tablist" aria-label="Product information">
                {["Description", "Reviews", "Specifications"].map((t) => (
                  <button
                    key={t}
                    id={`${uid}-tab-${t}`}
                    role="tab"
                    aria-selected={tab === t}
                    aria-controls={`${uid}-panel`}
                    onClick={() => selectTab(t)}
                  >
                    {t.toUpperCase()}
                    {t === "Reviews" && reviews.length > 0
                      ? ` (${reviews.length})`
                      : ""}
                  </button>
                ))}
              </div>
              <div
                ref={tabPanel}
                id={`${uid}-panel`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${tab}`}
              >
                {tab === "Description" ? (
                  <>
                    <h2>Ready for your next upgrade.</h2>
                    <p>{p.description}</p>
                    <h3>Know your product.</h3>
                    <p>
                      Explore the specifications to check compatibility and
                      features before choosing your setup. For deployment,
                      licensing or business purchases, our team can help you
                      find the right fit.
                    </p>
                    <h3>Shop with confidence.</h3>
                    <p>
                      {p.specs.Warranty ||
                        "Warranty details are listed in the product specifications."}{" "}
                      {digital
                        ? "Digital license delivery is simulated in this demo."
                        : "Nationwide delivery is available, with free physical delivery from ₦500,000."}
                    </p>
                    <p className="pdp-demo-note">
                      Demo listing. Prices, stock, images and aggregate ratings
                      are illustrative.
                    </p>
                  </>
                ) : tab === "Specifications" ? (
                  <Specifications product={p} />
                ) : (
                  <div className="pdp-review-list">
                    <h2>Customer reviews</h2>
                    <p>
                      {p.rating}/5 from {p.reviews} sample ratings. No real
                      customer reviews are loaded in this demo.
                    </p>
                    {reviews.map((r, i) => (
                      <article key={`${r.name}-${i}`}>
                        <div>
                          <strong>{r.name}</strong>
                          <span>{r.rating}/5 · Local demo review</span>
                        </div>
                        <p>{r.text}</p>
                      </article>
                    ))}
                    <button
                      onClick={() =>
                        reviewForm.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        })
                      }
                    >
                      Write a review →
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
          <div className="pdp-right-column">
            <section className="pdp-purchase">
              <h1>{p.name}</h1>
              <div className="pdp-rating-line">
                <span
                  className="pdp-stars"
                  aria-label={`${p.rating} out of 5 stars`}
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      size={17}
                      key={i}
                      fill={i <= Math.round(p.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </span>
                <span className="pdp-rating-badge">{p.rating}/5</span>
                <button
                  onClick={() => {
                    setTab("Reviews");
                    tabPanel.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                >
                  {p.reviews} sample ratings
                </button>
                <span className="pdp-code">
                  <strong>Product Code:</strong> {p.id.toUpperCase()}
                </span>
              </div>
              <div className="pdp-product-meta">
                <dl>
                  <div>
                    <dt>Brand:</dt>
                    <dd>
                      <Link href={`/shop?brand=${encodeURIComponent(p.brand)}`}>
                        {p.brand}
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt>Category:</dt>
                    <dd>{p.category}</dd>
                  </div>
                  <div>
                    <dt>Availability:</dt>
                    <dd>
                      <span
                        className={`pdp-availability ${!available ? "out-of-stock" : ""}`}
                      >
                        {available ? "In Stock" : "Out of Stock"}
                      </span>
                      {available && <small>{p.stock} available</small>}
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/shop?brand=${encodeURIComponent(p.brand)}`}
                  className="pdp-brand-badge"
                  aria-label={`Shop ${p.brand}`}
                >
                  {p.brand}
                </Link>
              </div>
              <div className="pdp-price">
                <strong>{money(p.price)}</strong>
                {p.oldPrice && (
                  <>
                    <del>{money(p.oldPrice)}</del>
                    <span>Save {money(p.oldPrice - p.price)}</span>
                  </>
                )}
              </div>
              <div className="pdp-buy-box">
                <div className="pdp-buy-row">
                  <div className="pdp-quantity">
                    <button
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1 || !available}
                      onClick={() => setQuantity((q) => q - 1)}
                    >
                      <MinusCircle size={17} fill="currentColor" />
                    </button>
                    <input
                      aria-label="Quantity"
                      type="number"
                      min={1}
                      max={Math.max(1, p.stock)}
                      value={quantity}
                      disabled={!available}
                      onChange={(e) =>
                        setQuantity(
                          Math.min(
                            Math.max(
                              1,
                              Math.floor(Number(e.target.value) || 1),
                            ),
                            Math.max(1, p.stock),
                          ),
                        )
                      }
                    />
                    <button
                      aria-label="Increase quantity"
                      disabled={quantity >= p.stock || !available}
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      <PlusCircle size={17} fill="currentColor" />
                    </button>
                  </div>
                  <button
                    className="retail-button red-button pdp-add-cart"
                    disabled={!available}
                    onClick={() => add(p.id, quantity)}
                  >
                    ADD TO CART
                  </button>
                  {available ? (
                    <Link
                      className="retail-button pdp-buy-now"
                      href="/checkout"
                      onClick={() => add(p.id, quantity)}
                    >
                      BUY NOW
                    </Link>
                  ) : (
                    <button className="retail-button" disabled>
                      BUY NOW
                    </button>
                  )}
                </div>
                <button
                  className="pdp-compare"
                  aria-pressed={compare.includes(p.id)}
                  onClick={() => toggleCompare(p.id)}
                >
                  <ArrowLeftRight size={15} />
                  {compare.includes(p.id)
                    ? "REMOVE FROM COMPARISON"
                    : "COMPARE THIS PRODUCT"}
                </button>
              </div>
              <div className="pdp-utility-links">
                <button onClick={() => specs.current?.showModal()}>
                  <Ruler size={16} /> Specifications
                </button>
                <button onClick={openImage}>
                  <Maximize2 size={15} /> Popup
                </button>
                <button onClick={() => question.current?.showModal()}>
                  <HelpCircle size={16} /> Ask Question
                </button>
              </div>
              <div className="pdp-tags">
                <strong>Tags:</strong>
                <Link href={`/shop?brand=${encodeURIComponent(p.brand)}`}>
                  {p.brand}
                </Link>
                <Link href={`/shop?category=${encodeURIComponent(p.category)}`}>
                  {p.category}
                </Link>
              </div>
              <div className="pdp-service-icons">
                <div>
                  <CreditCard />
                  <span>Demo checkout</span>
                </div>
                <div>
                  <RotateCcw />
                  <Link href="/help">Easy returns</Link>
                </div>
                <div>
                  <ShieldCheck />
                  <Link href="/contact">Expert support</Link>
                </div>
              </div>
            </section>
            <section className="pdp-review-box">
              <div className="pdp-review-summary">
                <strong>{p.rating}/5</strong>
                <span>{p.reviews} sample ratings</span>
                <span className="pdp-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={22} fill="currentColor" />
                  ))}
                </span>
              </div>
              <form ref={reviewForm} onSubmit={submitReview}>
                <h2>Write a review</h2>
                <label className="sr-only" htmlFor={`${uid}-review-name`}>
                  Your Name
                </label>
                <input
                  id={`${uid}-review-name`}
                  name="name"
                  placeholder="Your Name"
                  required
                  maxLength={100}
                />
                <label className="sr-only" htmlFor={`${uid}-review-text`}>
                  Your Review
                </label>
                <textarea
                  id={`${uid}-review-text`}
                  name="review"
                  placeholder="Your Review"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                />
                <fieldset className="pdp-review-rating">
                  <legend>Your rating</legend>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <label key={i}>
                      <input
                        type="radio"
                        name="rating"
                        value={i}
                        checked={reviewRating === i}
                        onChange={() => setReviewRating(i)}
                      />
                      <span>
                        {i} <Star size={12} fill="currentColor" />
                      </span>
                    </label>
                  ))}
                </fieldset>
                <p className="pdp-demo-note">
                  Demo form. Reviews stay in this page and are not published.
                </p>
                <div className="pdp-review-submit">
                  <button type="submit" className="retail-button red-button">
                    Write Review
                  </button>
                </div>
                <p role="status" className="pdp-review-status">
                  {reviewStatus}
                </p>
              </form>
            </section>
          </div>
        </div>
        <section className="pdp-faq">
          <h2>FAQ (Frequently Asked Questions)</h2>
          {[
            {
              q: "How will my order be delivered?",
              a: digital
                ? "This is a digital item, so no physical delivery fee applies. License fulfillment is simulated in this demo."
                : "Illustrative delivery is 2–5 business days across Nigeria. Delivery is ₦5,000 below ₦500,000, and free for physical orders from ₦500,000.",
            },
            {
              q: "How do I check compatibility?",
              a: "Open Specifications for the available product information. Check your existing devices and software requirements, or contact our team for help.",
            },
            {
              q: "What warranty is included?",
              a:
                p.specs.Warranty ||
                "Warranty terms vary by product. Contact the team before buying to confirm the coverage.",
            },
            {
              q: "Can I return this product?",
              a: "Illustrative returns: unused physical products in original packaging may be returned within 7 days. Activated digital licenses are excluded. See Delivery & returns for details.",
            },
            {
              q: "Can I order for my business?",
              a: "Yes. Use Ask Question or the contact page for business setups, bulk purchases, deployment and licensing advice. Enquiries are simulated in this demo.",
            },
            {
              q: "Will checkout charge me?",
              a: "No. Checkout is simulated. It does not collect money, reserve inventory or arrange a real delivery.",
            },
          ].map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>
                {item.q}
                <ChevronDown size={18} />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>
        <section className="pdp-related">
          <div className="retail-section-title">
            <h2>RELATED PRODUCTS</h2>
            <div className="retail-pager">
              <button
                aria-label="Previous related products"
                onClick={() =>
                  setRelatedOffset(
                    (n) => (n - 1 + related.length) % related.length,
                  )
                }
              >
                <ArrowLeft size={16} />
              </button>
              <button
                aria-label="Next related products"
                onClick={() =>
                  setRelatedOffset((n) => (n + 1) % related.length)
                }
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="retail-product-grid">
            {Array.from(
              { length: Math.min(4, related.length) },
              (_, i) => related[(relatedOffset + i) % related.length],
            ).map((other) => (
              <RetailProduct key={other.id} product={other} />
            ))}
          </div>
        </section>
      </div>
      <dialog
        ref={lightbox}
        className="pdp-lightbox"
        aria-label={`${p.name} image gallery`}
        onClick={(e) => {
          if (e.target === e.currentTarget) lightbox.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close image gallery"
          onClick={() => lightbox.current?.close()}
        >
          <X />
        </button>
        <h2>{p.name}</h2>
        <button
          className={`pdp-lightbox-image ${lightZoom ? "is-zoomed" : ""}`}
          aria-label={lightZoom ? "Zoom out" : "Zoom in"}
          onClick={() => setLightZoom(!lightZoom)}
        >
          <Image
            unoptimized
            src={p.image}
            alt={p.name}
            width={900}
            height={750}
          />
        </button>
        <p>
          Click the image to {lightZoom ? "zoom out" : "zoom in"} ·
          Representative product image
        </p>
      </dialog>
      <dialog
        ref={specs}
        className="pdp-spec-dialog"
        aria-labelledby={`${uid}-spec-title`}
      >
        <button
          className="dialog-close"
          aria-label="Close specifications"
          onClick={() => specs.current?.close()}
        >
          <X />
        </button>
        <h2 id={`${uid}-spec-title`}>Product specifications</h2>
        <p>{p.name}</p>
        <Specifications product={p} />
      </dialog>
      <dialog
        ref={question}
        className="pdp-question-dialog"
        aria-labelledby={`${uid}-question-title`}
      >
        <button
          className="dialog-close"
          aria-label="Close question form"
          onClick={() => question.current?.close()}
        >
          <X />
        </button>
        <h2 id={`${uid}-question-title`}>Ask a question</h2>
        <p>About {p.name}</p>
        {questionDone ? (
          <p role="status" className="pdp-question-success">
            Your demo question is complete. Nothing was sent or saved.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setQuestionDone(true);
            }}
          >
            <label>
              Your name
              <input required maxLength={100} />
            </label>
            <label>
              Email address
              <input type="email" required />
            </label>
            <label>
              Your question
              <textarea required minLength={10} maxLength={2000} rows={4} />
            </label>
            <p className="pdp-demo-note">
              Demo enquiry. Your details are not transmitted.
            </p>
            <button className="retail-button red-button" type="submit">
              Submit demo question
            </button>
          </form>
        )}
      </dialog>
    </div>
  );
}
