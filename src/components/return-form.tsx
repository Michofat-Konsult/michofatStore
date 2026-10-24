"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Home, LogIn, UserPlus, KeyRound } from "lucide-react";
import { CustomerNavigation } from "./account-dashboard";
const reasons = [
  "Dead On Arrival",
  "Faulty, please supply details",
  "Order Error",
  "Other, please supply details",
  "Received Wrong Item",
];
export function ReturnForm({ today }: { today: string }) {
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const needsDetails = reason === reasons[1] || reason === reasons[3];
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
    setReason("");
  }
  return (
    <div className="container account-page return-page">
      <nav className="account-breadcrumb" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home">
          <Home size={20} fill="currentColor" />
        </Link>
        <span>/</span>
        <Link href="/account">Account</Link>
        <span>/</span>
        <span aria-current="page">Product Returns</span>
      </nav>
      <div className="account-layout">
        <section className="account-content">
          <h1>Product Returns</h1>
          <p className="return-intro">
            Please complete the form below to request an RMA number.
          </p>
          {submitted && (
            <div className="account-status" role="status">
              <strong>Your demo return form is complete.</strong>
              <p>
                No return request was sent and no RMA number was issued. Connect
                a returns service to process requests.
              </p>
            </div>
          )}
          <form className="return-form" onSubmit={submit}>
            <fieldset>
              <legend>Order Information</legend>
              <ReturnField
                label="First Name"
                name="firstName"
                autoComplete="given-name"
              />
              <ReturnField
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
              <ReturnField
                label="E-Mail"
                name="email"
                type="email"
                autoComplete="email"
              />
              <ReturnField
                label="Telephone"
                name="telephone"
                type="tel"
                autoComplete="tel"
              />
              <ReturnField label="Order ID" name="orderId" />
              <div className="return-field">
                <label htmlFor="return-orderDate">Order Date</label>
                <input
                  className="return-date"
                  id="return-orderDate"
                  name="orderDate"
                  type="date"
                  defaultValue={today}
                  max={today}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Product Information</legend>
              <ReturnField label="Product Name" name="productName" />
              <ReturnField label="Product Code" name="productCode" />
              <div className="return-field">
                <label htmlFor="return-quantity">Quantity</label>
                <input
                  id="return-quantity"
                  name="quantity"
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={999}
                  step={1}
                  required
                />
              </div>
              <fieldset className="return-radio-field">
                <legend>
                  Reason for
                  <br /> Return <span>*</span>
                </legend>
                <div>
                  {reasons.map((r) => (
                    <label key={r}>
                      <input
                        type="radio"
                        name="reason"
                        value={r}
                        checked={reason === r}
                        onChange={() => setReason(r)}
                        required
                      />
                      {r}
                      <span aria-hidden="true">*</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="return-radio-field return-opened">
                <legend>
                  Product is
                  <br /> opened <span>*</span>
                </legend>
                <div>
                  <label>
                    <input type="radio" name="opened" value="yes" required />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="opened"
                      value="no"
                      defaultChecked
                      required
                    />
                    No
                  </label>
                </div>
              </fieldset>
              <div className="return-field return-details">
                <label htmlFor="return-details">
                  Faulty or other details {needsDetails && <span>*</span>}
                </label>
                <textarea
                  id="return-details"
                  name="details"
                  placeholder="Faulty or other details"
                  rows={9}
                  maxLength={3000}
                  minLength={needsDetails ? 10 : undefined}
                  required={needsDetails}
                  aria-describedby={
                    needsDetails ? "return-details-hint" : undefined
                  }
                />
                {needsDetails && (
                  <small id="return-details-hint">
                    Please describe the issue in at least 10 characters.
                  </small>
                )}
              </div>
            </fieldset>
            <div className="account-form-actions">
              <Link className="account-button account-red" href="/account">
                ‹ Back
              </Link>
              <button className="account-button" type="submit">
                Submit
              </button>
            </div>
            <p className="account-demo-note">
              Demo returns form. Use sample details; nothing entered here is
              saved or transmitted.
            </p>
          </form>
        </section>
        <div className="return-sidebar">
          <nav className="return-guest-links" aria-label="Sign in options">
            <Link href="/login">
              <LogIn size={21} />
              Login
            </Link>
            <Link href="/register">
              <UserPlus size={21} />
              Register
            </Link>
            <Link href="/forgotten-password">
              <KeyRound size={21} />
              Forgotten Password
            </Link>
          </nav>
          <CustomerNavigation active="/return" />
        </div>
      </div>
    </div>
  );
}
function ReturnField({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="return-field">
      <label htmlFor={`return-${name}`}>
        {label} <span>*</span>
      </label>
      <input
        id={`return-${name}`}
        name={name}
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        maxLength={name === "email" ? 254 : 150}
        required
      />
    </div>
  );
}
