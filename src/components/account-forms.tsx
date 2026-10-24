"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  Home,
  LogIn,
  UserPlus,
  KeyRound,
  UserRound,
  ContactRound,
  Heart,
  Bell,
  PackageOpen,
  Download,
  CreditCard,
  Medal,
  RotateCcw,
  ArrowLeftRight,
} from "lucide-react";

type Mode = "login" | "register" | "forgotten-password";
const accountLinks = [
  { label: "Login", href: "/login", icon: LogIn },
  { label: "Register", href: "/register", icon: UserPlus },
  { label: "Forgotten Password", href: "/forgotten-password", icon: KeyRound },
  { label: "My Account", href: "/account", icon: UserRound },
  { label: "Address Book", href: "/account/address", icon: ContactRound },
  { label: "Wish List", href: "/wishlist", icon: Heart },
  { label: "Notification", href: "/account/notifications", icon: Bell },
  { label: "Order History", href: "/account/orders", icon: PackageOpen },
  { label: "Downloads", href: "/account/downloads", icon: Download },
  { label: "Recurring payments", href: "/account/payments", icon: CreditCard },
  { label: "Reward Points", href: "/account/rewards", icon: Medal },
  { label: "Returns", href: "/return", icon: RotateCcw },
  {
    label: "Transactions",
    href: "/account/transactions",
    icon: ArrowLeftRight,
  },
];

export function AccountForms({ mode }: { mode: Mode }) {
  const [status, setStatus] = useState("");
  const [sidebarStatus, setSidebarStatus] = useState("");
  const title =
    mode === "login"
      ? "Login"
      : mode === "register"
        ? "Register"
        : "Forgotten Password";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const confirm = form.elements.namedItem(
      "confirm",
    ) as HTMLInputElement | null;
    if (confirm && fields.get("password") !== fields.get("confirm")) {
      confirm.setCustomValidity("Your passwords do not match.");
      confirm.reportValidity();
      return;
    }
    setStatus(
      mode === "login"
        ? "Demo login checked. Authentication is not connected; you have not been signed in."
        : mode === "register"
          ? "Demo registration validated. No account was created and your details were not saved or sent."
          : "Demo reset request checked. Email delivery is not connected; no reset link was sent.",
    );
    form.reset();
  }
  return (
    <div className="container account-page">
      <nav className="account-breadcrumb" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home">
          <Home size={20} fill="currentColor" />
        </Link>
        <span>/</span>
        <Link href="/login">Account</Link>
        <span>/</span>
        <span aria-current="page">{title}</span>
      </nav>
      <div className="account-layout">
        <section className="account-content" aria-label={title}>
          {mode === "login" ? (
            <div className="account-login-columns">
              <section className="account-card">
                <h1>New Customer</h1>
                <h2>Register Account</h2>
                <p>
                  By creating an account you will be able to shop faster, be up
                  to date on an order’s status, and keep track of the orders you
                  have previously made.
                </p>
                <Link className="account-button account-red" href="/register">
                  Continue
                </Link>
              </section>
              <section className="account-card">
                <h1>Returning Customer</h1>
                <h2>I am a returning customer</h2>
                <form onSubmit={submit}>
                  <label className="account-field">
                    E-Mail Address
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="E-Mail Address"
                      required
                    />
                  </label>
                  <label className="account-field">
                    Password
                    <input
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      required
                    />
                  </label>
                  <Link
                    className="account-text-link"
                    href="/forgotten-password"
                  >
                    Forgotten Password
                  </Link>
                  <button className="account-button" type="submit">
                    Login
                  </button>
                </form>
              </section>
            </div>
          ) : mode === "register" ? (
            <>
              <h1>Register Account</h1>
              <p className="account-intro">
                If you already have an account with us, please login at the{" "}
                <Link className="account-text-link" href="/login">
                  login page
                </Link>
                .
              </p>
              <form onSubmit={submit} className="account-register-form">
                <div className="account-name-row">
                  <FloatingField
                    label="First Name"
                    name="firstName"
                    autoComplete="given-name"
                  />
                  <FloatingField
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </div>
                <FloatingField
                  label="E-Mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
                <FloatingField
                  label="Telephone"
                  name="telephone"
                  type="tel"
                  autoComplete="tel"
                />
                <FloatingField
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                />
                <FloatingField
                  label="Password Confirm"
                  name="confirm"
                  type="password"
                  autoComplete="new-password"
                />
                <fieldset className="account-newsletter">
                  <legend>Newsletter</legend>
                  <div>
                    <span>Subscribe</span>
                    <label>
                      <input type="radio" name="newsletter" value="yes" /> Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="newsletter"
                        value="no"
                        defaultChecked
                      />{" "}
                      No
                    </label>
                  </div>
                </fieldset>
                <div className="account-register-bottom">
                  <label>
                    <input type="checkbox" required /> I have read and agree to
                    the{" "}
                    <Link className="account-text-link" href="/privacy">
                      Privacy Policy
                    </Link>
                  </label>
                  <button className="account-button" type="submit">
                    Continue
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1>Forgot Your Password?</h1>
              <p className="account-intro">
                Enter the e-mail address associated with your account. Click
                submit to have a password reset link e-mailed to you.
              </p>
              <form onSubmit={submit}>
                <FloatingField
                  label="E-Mail Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
                <div className="account-form-actions">
                  <Link href="/login" className="account-button account-red">
                    ‹ Back
                  </Link>
                  <button className="account-button" type="submit">
                    Continue
                  </button>
                </div>
              </form>
            </>
          )}
          {status && (
            <p className="account-status" role="status">
              {status}
            </p>
          )}
          <p className="account-demo-note">
            Demo forms only. Account authentication and email delivery are not
            connected. Use sample details; nothing entered here is saved or
            sent.
          </p>
        </section>
        <aside className="account-sidebar" aria-label="Account navigation">
          {accountLinks.map(({ label, href, icon: Icon }) =>
            href ? (
              <Link
                href={href}
                key={label}
                className={label === title ? "active" : ""}
                aria-current={label === title ? "page" : undefined}
              >
                <Icon size={21} />
                <span>{label}</span>
              </Link>
            ) : (
              <button
                key={label}
                onClick={() =>
                  setSidebarStatus(
                    `${label} will be available when customer accounts are connected.`,
                  )
                }
              >
                <Icon size={21} />
                <span>{label}</span>
              </button>
            ),
          )}
          {sidebarStatus && <p role="status">{sidebarStatus}</p>}
        </aside>
      </div>
    </div>
  );
}

function FloatingField({
  label,
  name,
  type = "text",
  autoComplete,
  minLength,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  minLength?: number;
}) {
  return (
    <div className="account-floating">
      <input
        id={`account-${name}`}
        name={name}
        type={type}
        placeholder=" "
        autoComplete={autoComplete}
        minLength={minLength}
        required
        onInput={(event) => event.currentTarget.setCustomValidity("")}
      />
      <label htmlFor={`account-${name}`}>
        {label} <span>*</span>
      </label>
    </div>
  );
}
