"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page-space empty-state">
      <h1>Something interrupted your visit.</h1>
      <p>Give it another try. Your saved cart will still be here.</p>
      <button className="primary-link" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
