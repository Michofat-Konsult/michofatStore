"use client";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import {
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
export function RetailContact() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  }
  return (
    <div className="retail-contact-page">
      <section
        className="retail-contact-cards-band"
        aria-label="Contact information"
      >
        <div className="container retail-contact-cards">
          <article>
            <PhoneCall size={44} />
            <h2>Contact Phone Number</h2>
            <a href="tel:+2348000000000">+234 (800) 000 0000</a>
            <p>Mon–Fri · 9:00 AM–6:00 PM WAT</p>
            <small>Demo number — replace before launch.</small>
          </article>
          <article>
            <Mail size={44} />
            <h2>Our Email Address</h2>
            <a href="mailto:hello@michofat.example">hello@michofat.example</a>
            <p>Product advice &amp; business enquiries</p>
            <small>Placeholder email address.</small>
          </article>
          <article>
            <MapPin size={44} />
            <h2>Our Location</h2>
            <p>Serving customers across Nigeria</p>
            <p>Store address to be confirmed.</p>
            <small>The map below shows our demo delivery area.</small>
          </article>
        </div>
      </section>
      <section className="container retail-contact-main">
        <div className="retail-contact-form">
          <h1>Contact Us</h1>
          {sent ? (
            <div className="retail-contact-confirmation" role="status">
              <CheckCircle2 size={40} />
              <h2>Your demo enquiry is complete.</h2>
              <p>
                No message was sent. Connect a support service to receive
                enquiries.
              </p>
              <button className="account-button" onClick={() => setSent(false)}>
                Write another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label className="sr-only" htmlFor="contact-name">
                Your full name
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                minLength={2}
                maxLength={100}
                required
              />
              <label className="sr-only" htmlFor="contact-email">
                E-mail Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="E-mail Address"
                maxLength={254}
                required
              />
              <label className="sr-only" htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                placeholder="Subject"
                minLength={2}
                maxLength={150}
                required
              />
              <label className="sr-only" htmlFor="contact-enquiry">
                Enquiry
              </label>
              <textarea
                id="contact-enquiry"
                name="enquiry"
                placeholder="Enquiry"
                minLength={10}
                maxLength={3000}
                rows={5}
                required
              />
              <button className="account-button" type="submit">
                Send Enquiry
              </button>
              <p className="retail-contact-demo">
                Demo form. Your details are not stored or transmitted.
              </p>
            </form>
          )}
        </div>
        <figure className="retail-contact-photo">
          <Image
            unoptimized
            src="/reference/contact-store.webp"
            alt="Illustrative photo shop storefront from the design reference"
            width={570}
            height={550}
          />
          <figcaption>
            Illustrative reference photograph · Not a Michofat store location.
          </figcaption>
        </figure>
      </section>
      <section
        className="retail-contact-map"
        aria-label="Nigeria delivery area map"
      >
        <iframe
          title="Nigeria — illustrative delivery area"
          src="https://maps.google.com/maps?q=Nigeria&t=&z=6&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="retail-contact-map-note">
          <h2>Nigeria delivery area</h2>
          <p>Demo map · Store location to be confirmed.</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Nigeria"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Maps <ExternalLink size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
