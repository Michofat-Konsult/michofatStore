"use client";
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="newsletter">
      <div className="container">
        <div>
          <span className="eyebrow">STAY ONE UPGRADE AHEAD</span>
          <h2>A little tech in your inbox.</h2>
          <p>New arrivals, smart picks and offers worth opening.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div>
            <Mail size={18} />
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email address"
              disabled={done}
            />
            <button disabled={done} aria-label="Subscribe to newsletter">
              <ArrowRight size={20} />
            </button>
          </div>
          <small role="status">
            {done
              ? "You’re on the demo list! No email was sent."
              : "Demo signup. Your email is not sent or stored."}
          </small>
        </form>
      </div>
    </section>
  );
}
