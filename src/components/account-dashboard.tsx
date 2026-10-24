"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  Home,
  UserRound,
  UserPen,
  KeyRound,
  ContactRound,
  Heart,
  MailOpen,
  Bell,
  PackageOpen,
  Download,
  Medal,
  RotateCcw,
  ArrowLeftRight,
  CreditCard,
  LogIn,
  type LucideIcon,
} from "lucide-react";

const links: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "My Account", href: "/account", icon: UserRound },
  { label: "Edit Account", href: "/account/edit", icon: UserPen },
  { label: "Password", href: "/account/password", icon: KeyRound },
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
  { label: "Newsletter", href: "/account/newsletter", icon: MailOpen },
  { label: "Login", href: "/login", icon: LogIn },
];
export function CustomerNavigation({
  active = "/account",
}: {
  active?: string;
}) {
  return (
    <aside className="account-sidebar" aria-label="Account navigation">
      {links.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={active === href ? "active" : ""}
          aria-current={active === href ? "page" : undefined}
        >
          <Icon size={21} />
          <span>{label}</span>
        </Link>
      ))}
    </aside>
  );
}

export const accountSections: Record<string, string> = {
  edit: "Edit Account",
  password: "Change Password",
  address: "Address Book",
  notifications: "Notifications",
  orders: "Order History",
  downloads: "Downloads",
  payments: "Recurring payments",
  rewards: "Reward Points",
  returns: "Return Requests",
  transactions: "Transactions",
  newsletter: "Newsletter",
};
const tiles = [
  [
    {
      text: "Edit your account information",
      href: "/account/edit",
      icon: UserPen,
    },
    { text: "Change your password", href: "/account/password", icon: KeyRound },
    {
      text: "Modify your address book entries",
      href: "/account/address",
      icon: ContactRound,
    },
    { text: "Modify your wish list", href: "/wishlist", icon: Heart },
    {
      text: "Subscribe / unsubscribe to newsletter",
      href: "/account/newsletter",
      icon: MailOpen,
    },
  ],
  [
    {
      text: "View your order history",
      href: "/account/orders",
      icon: PackageOpen,
    },
    { text: "Downloads", href: "/account/downloads", icon: Download },
    { text: "Your Reward Points", href: "/account/rewards", icon: Medal },
    {
      text: "View your return requests",
      href: "/account/returns",
      icon: RotateCcw,
    },
    {
      text: "Your Transactions",
      href: "/account/transactions",
      icon: ArrowLeftRight,
    },
    { text: "Recurring payments", href: "/account/payments", icon: CreditCard },
  ],
];
export function AccountDashboard({
  section,
  addAddress = false,
}: {
  section?: string;
  addAddress?: boolean;
}) {
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const title = addAddress
    ? "Add Address"
    : section
      ? accountSections[section]
      : "Account";
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const confirm = form.elements.namedItem(
      "confirm",
    ) as HTMLInputElement | null;
    if (confirm && data.get("password") !== data.get("confirm")) {
      confirm.setCustomValidity("Your passwords do not match.");
      confirm.reportValidity();
      return;
    }
    setStatus(
      addAddress
        ? "Demo address validated. Your address was not saved or sent."
        : "Demo changes validated. No account details or preferences were saved or sent.",
    );
    form.reset();
    setCountry("Nigeria");
  }
  const isForm =
    addAddress ||
    ["edit", "password", "newsletter", "notifications"].includes(section ?? "");
  return (
    <div className="container account-page">
      <nav className="account-breadcrumb" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home">
          <Home size={20} fill="currentColor" />
        </Link>
        <span>/</span>
        {section || addAddress ? (
          <>
            <Link href="/account">Account</Link>
            <span>/</span>
            <span aria-current="page">{title}</span>
          </>
        ) : (
          <span aria-current="page">Account</span>
        )}
      </nav>
      <div className="account-layout">
        <section className="account-content">
          {!section && !addAddress ? (
            <>
              {tiles.map((group, index) => (
                <section className="account-dashboard-panel" key={index}>
                  <h1>{index === 0 ? "My Account" : "My Orders"}</h1>
                  <div
                    className={`account-tile-grid ${index === 1 ? "orders" : ""}`}
                  >
                    {group.map(({ text, href, icon: Icon }) => (
                      <Link href={href} key={href}>
                        <Icon size={40} strokeWidth={2.6} />
                        <span>{text}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </>
          ) : (
            <>
              <h1>{title}</h1>
              {isForm ? (
                <form
                  onSubmit={submit}
                  onInput={(e) => {
                    const confirm = e.currentTarget.elements.namedItem(
                      "confirm",
                    ) as HTMLInputElement | null;
                    confirm?.setCustomValidity("");
                  }}
                >
                  {(addAddress || section === "edit") && (
                    <>
                      <div className="account-name-row">
                        <Field
                          label="First Name"
                          name="firstName"
                          autoComplete="given-name"
                        />
                        <Field
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                        />
                      </div>
                      {section === "edit" && (
                        <>
                          <Field
                            label="E-Mail"
                            name="email"
                            type="email"
                            autoComplete="email"
                          />
                          <Field
                            label="Telephone"
                            name="telephone"
                            type="tel"
                            autoComplete="tel"
                          />
                        </>
                      )}
                    </>
                  )}
                  {addAddress && (
                    <>
                      <Field
                        label="Company"
                        name="company"
                        required={false}
                        autoComplete="organization"
                      />
                      <Field
                        label="Address 1"
                        name="address1"
                        autoComplete="address-line1"
                      />
                      <Field
                        label="Address 2"
                        name="address2"
                        required={false}
                        autoComplete="address-line2"
                      />
                      <div className="account-name-row">
                        <Field
                          label="City"
                          name="city"
                          autoComplete="address-level2"
                        />
                        <Field
                          label="Post Code"
                          name="postcode"
                          autoComplete="postal-code"
                        />
                      </div>
                      <div className="account-name-row">
                        <label className="account-select">
                          Country <span>*</span>
                          <select
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            autoComplete="country-name"
                            required
                          >
                            <option>Nigeria</option>
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>Ghana</option>
                          </select>
                        </label>
                        <label className="account-select">
                          Region / State <span>*</span>
                          <select
                            key={country}
                            name="region"
                            defaultValue=""
                            autoComplete="address-level1"
                            required
                          >
                            <option value="">--- Please Select ---</option>
                            {(country === "Nigeria"
                              ? [
                                  "Abia",
                                  "Adamawa",
                                  "Akwa Ibom",
                                  "Anambra",
                                  "Bauchi",
                                  "Bayelsa",
                                  "Benue",
                                  "Borno",
                                  "Cross River",
                                  "Delta",
                                  "Ebonyi",
                                  "Edo",
                                  "Ekiti",
                                  "Enugu",
                                  "Federal Capital Territory",
                                  "Gombe",
                                  "Imo",
                                  "Jigawa",
                                  "Kaduna",
                                  "Kano",
                                  "Katsina",
                                  "Kebbi",
                                  "Kogi",
                                  "Kwara",
                                  "Lagos",
                                  "Nasarawa",
                                  "Niger",
                                  "Ogun",
                                  "Ondo",
                                  "Osun",
                                  "Oyo",
                                  "Plateau",
                                  "Rivers",
                                  "Sokoto",
                                  "Taraba",
                                  "Yobe",
                                  "Zamfara",
                                ]
                              : country === "United Kingdom"
                                ? [
                                    "England",
                                    "Northern Ireland",
                                    "Scotland",
                                    "Wales",
                                  ]
                                : country === "Ghana"
                                  ? [
                                      "Greater Accra",
                                      "Ashanti",
                                      "Central",
                                      "Eastern",
                                      "Northern",
                                      "Western",
                                      "Volta",
                                      "Other region",
                                    ]
                                  : [
                                      "California",
                                      "Florida",
                                      "New York",
                                      "Texas",
                                      "Other state",
                                    ]
                            ).map((state) => (
                              <option key={state}>{state}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <fieldset className="account-newsletter">
                        <legend className="sr-only">Default Address</legend>
                        <div>
                          <span>
                            Default
                            <br />
                            Address
                          </span>
                          <label>
                            <input
                              type="radio"
                              name="defaultAddress"
                              value="yes"
                            />{" "}
                            Yes
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="defaultAddress"
                              value="no"
                              defaultChecked
                            />{" "}
                            No
                          </label>
                        </div>
                      </fieldset>
                    </>
                  )}
                  {section === "password" && (
                    <>
                      <Field
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        minLength={8}
                      />
                      <Field
                        label="Password Confirm"
                        name="confirm"
                        type="password"
                        autoComplete="new-password"
                        minLength={8}
                      />
                    </>
                  )}
                  {(section === "newsletter" ||
                    section === "notifications") && (
                    <fieldset className="account-newsletter">
                      <legend>
                        {section === "newsletter"
                          ? "Subscribe to newsletter"
                          : "Email notifications"}
                      </legend>
                      <div>
                        <label>
                          <input name="subscribe" type="radio" value="yes" />{" "}
                          Yes
                        </label>
                        <label>
                          <input
                            name="subscribe"
                            type="radio"
                            value="no"
                            defaultChecked
                          />{" "}
                          No
                        </label>
                      </div>
                    </fieldset>
                  )}
                  <div className="account-form-actions">
                    <Link
                      className="account-button account-red"
                      href={addAddress ? "/account/address" : "/account"}
                    >
                      ‹ Back
                    </Link>
                    <button className="account-button" type="submit">
                      Continue
                    </button>
                  </div>
                </form>
              ) : section === "address" ? (
                <div className="account-empty">
                  <p>Your demo address book is empty.</p>
                  <Link href="/account/address/add" className="account-button">
                    New Address
                  </Link>
                </div>
              ) : (
                <div className="account-empty">
                  <p>
                    {section === "rewards"
                      ? "Your demo reward points balance is 0."
                      : `There are no ${title?.toLowerCase()} in this demo account.`}
                  </p>
                  <Link href="/account" className="account-button">
                    Continue
                  </Link>
                </div>
              )}
            </>
          )}
          {status && (
            <p role="status" className="account-status">
              {status}
            </p>
          )}
          <p className="account-demo-note">
            Demo account preview. Authentication is not connected. Use sample
            details; personal information and passwords are not stored or sent.
          </p>
        </section>
        <CustomerNavigation
          active={
            addAddress
              ? "/account/address"
              : section
                ? `/account/${section}`
                : "/account"
          }
        />
      </div>
    </div>
  );
}
function Field({
  label,
  name,
  type = "text",
  required = true,
  autoComplete,
  minLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
}) {
  return (
    <div className="account-floating">
      <input
        id={`customer-${name}`}
        name={name}
        type={type}
        placeholder=" "
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
      />
      <label htmlFor={`customer-${name}`}>
        {label} {required && <span>*</span>}
      </label>
    </div>
  );
}
