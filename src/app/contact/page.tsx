"use client";
import { useState } from "react";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container page-space">
      <div className="page-title">
        <span className="eyebrow">REAL PEOPLE. HELPFUL ANSWERS.</span>
        <h1>Let’s talk tech.</h1>
        <p>
          Finding the right laptop? Connecting a whole office?
          <br />
          We’re here for your next step.
        </p>
      </div>
      <div className="contact-layout">
        <div>
          <div className="contact-card">
            <Phone />
            <div>
              <h3>Give us a call</h3>
              <a href="tel:+2348000000000">+234 (800) 000 0000</a>
              <p>Demo number — replace before launch.</p>
            </div>
          </div>
          <div className="contact-card">
            <Mail />
            <div>
              <h3>Drop us a line</h3>
              <a href="mailto:hello@michofat.example">hello@michofat.example</a>
              <p>Placeholder address for this demo.</p>
            </div>
          </div>
          <div className="contact-card">
            <Clock />
            <div>
              <h3>We’re around</h3>
              <p>
                Monday – Friday, 9am – 6pm WAT
                <br />
                Saturday, 10am – 4pm WAT
              </p>
            </div>
          </div>
          <div className="contact-card">
            <MapPin />
            <div>
              <h3>Made for Nigeria</h3>
              <p>
                Nationwide delivery.
                <br />
                Store address coming before launch.
              </p>
            </div>
          </div>
          <div className="contact-note">
            <MessageCircle />
            <h3>A bigger idea in mind?</h3>
            <p>
              Ask about bulk purchases, office setups, networking and software
              licensing.
            </p>
          </div>
        </div>
        <div className="form-panel">
          {sent ? (
            <div className="empty-state" role="status">
              <CheckCircle2 size={44} />
              <h2>Your demo message is complete.</h2>
              <p>
                No message was sent. This form is ready to connect to your
                support service.
              </p>
              <Button onClick={() => setSent(false)}>
                Write another message
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <h2>How can we help?</h2>
              <p className="muted">Tell us a little about what you need.</p>
              <div className="form-grid">
                <label className="full">
                  Your name
                  <input required autoComplete="name" maxLength={100} />
                </label>
                <label className="full">
                  Email address
                  <input type="email" required autoComplete="email" />
                </label>
                <label className="full">
                  What’s on your mind?
                  <select defaultValue="Product advice">
                    <option>Product advice</option>
                    <option>Order support</option>
                    <option>Business & bulk purchases</option>
                    <option>Software licensing</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="full">
                  Your message
                  <textarea
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={5}
                    placeholder="Let’s hear your idea…"
                  />
                </label>
              </div>
              <Button type="submit">
                Submit demo message <ArrowRight size={17} />
              </Button>
              <p className="fine-print">
                Demo form. Your details are not transmitted or stored.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
