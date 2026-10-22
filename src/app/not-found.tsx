import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page-space empty-state">
      <span className="eyebrow">404 · A LITTLE OFF TRACK</span>
      <h1>Let’s find your next possibility.</h1>
      <p>This page or product isn’t here.</p>
      <Link href="/shop" className="primary-link">
        Back to the store →
      </Link>
    </div>
  );
}
