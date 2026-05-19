import { FormEvent, useState } from "react";

const serviceCards = [
  {
    title: "Find likely-fit businesses",
    copy: "Identify companies that may have a practical reason to use the space.",
  },
  {
    title: "Draft tailored outreach",
    copy: "Write a short message around the property and likely business need.",
  },
  {
    title: "Get approval before sending",
    copy: "You approve the target profile and message before outreach starts.",
  },
  {
    title: "Follow up and track responses",
    copy: "Follow-ups, replies, and activity are tracked in a simple report.",
  },
];

const included = [
  "Tenant profile definition",
  "Prospect research",
  "Contact finding",
  "Tailored outreach draft",
  "Approved outreach",
  "Follow-ups",
  "Reply tracking",
  "Weekly progress report",
];

const faqs = [
  {
    question: "Do you replace my leasing agent?",
    answer: "No. TenantReach adds an outbound layer alongside the existing listing campaign.",
  },
  {
    question: "Do you guarantee a tenant?",
    answer: "No. The goal is to create more relevant tenant conversations, not guarantee a lease.",
  },
  {
    question: "Will anything be sent without approval?",
    answer: "No. You approve the target profile and outreach message before anything is sent.",
  },
];

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim();

    setSubmitted(false);
    setSubmitError("");

    if (!formEndpoint) {
      setSubmitError("The form is not configured yet. Please add VITE_FORM_ENDPOINT before launch.");
      return;
    }

    const formData = new FormData(form);
    formData.append("source", "TenantReach landing page");

    try {
      setIsSubmitting(true);
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      form.reset();
      setSubmitted(true);
    } catch (error) {
      console.error("TenantReach form submission failed", error);
      setSubmitError("Something went wrong and the form was not sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="brand-name">TenantReach</p>
            <h1>Find tenant leads beyond listing enquiries</h1>
            <p className="hero-subtitle">
              Targeted outbound tenant sourcing for vacant commercial and industrial properties.
            </p>
            <a className="button primary" href="#early-access">
              Submit your property
            </a>
            <p className="reassurance">
              No payment required to submit. If it&apos;s a fit, I&apos;ll send a campaign proposal
              first.
            </p>
          </div>

          <aside className="price-card" aria-label="TenantReach pricing">
            <p className="eyebrow">MVP campaign</p>
            <div className="price-line">
              <strong>$199</strong>
              <span>/week</span>
            </div>
            <ul className="plain-list">
              <li>Minimum 2 weeks</li>
              <li>No success fee</li>
              <li>Campaign starts only after review and approval</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What TenantReach does</p>
            <h2>A simple outbound layer for slow listings</h2>
          </div>
          <div className="card-grid four">
            {serviceCards.map((card) => (
              <article className="card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container note-card">
          <p className="eyebrow">Built from a real leasing problem</p>
          <p>
            I first built this while trying to lease one of my own commercial properties. Instead of
            relying only on listing enquiries, I used public business signals and
            technology-assisted research to identify likely-fit businesses, reach out directly,
            follow up, and track the pipeline. That outbound layer helped create more tenant
            conversations.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Example campaign</p>
            <h2>What a targeted tenant search can look like</h2>
          </div>

          <div className="example-grid">
            <article className="card example-card">
              <span className="example-label">Property</span>
              <div className="warehouse-icon" aria-hidden="true">
                <span></span>
              </div>
              <h3>Example: 380 sqm industrial unit in Brisbane</h3>
              <p>
                High-clearance warehouse, roller door access, 3-phase power, small office, and good
                access to major arterial roads.
              </p>
            </article>

            <article className="card example-card">
              <span className="example-label">Potential tenant logic</span>
              <h3>Trade or service businesses needing operational space</h3>
              <p>
                A growing building maintenance business may be relevant if it is hiring field
                staff, servicing the local area, and needs storage, parking, or warehouse space near
                customers.
              </p>
            </article>

            <article className="email-preview" aria-label="Fictional example outreach email">
              <div className="email-preview-header">
                <span className="example-label">Example outreach</span>
                <p>Fictional email preview</p>
              </div>
              <div className="email-subject">
                <span>Subject:</span> Industrial space in Brisbane
              </div>
              <div className="email-body">
                <p>Hi [Name],</p>
                <p>
                  I came across [Business Name] and noticed you service customers across
                  Brisbane&apos;s inner north.
                </p>
                <p>
                  I&apos;m helping with a high-clearance industrial unit in Brisbane that may suit a
                  trade or service business needing more warehouse, storage, or operational space.
                </p>
                <p>
                  It is around 380 sqm, with roller door access, 3-phase power, and good access to
                  major arterial roads.
                </p>
                <p>
                  Would it be worth sending through the listing in case it&apos;s relevant now or
                  later this year?
                </p>
                <p>
                  Regards,
                  <br />
                  [Name]
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container included-layout">
          <div>
            <p className="eyebrow">What&apos;s included</p>
            <h2>$199/week. Minimum 2 weeks. No success fee.</h2>
            <p className="expectation">
              A typical 2-week early campaign usually covers 25-50 researched businesses, depending
              on the property and market.
            </p>
          </div>
          <ul className="check-list">
            {included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-layout">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>Quick answers</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <article className="faq-item" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section form-section" id="early-access">
        <div className="container form-layout">
          <div>
            <p className="eyebrow">Submit your property</p>
            <h2>Submit your property</h2>
            <p className="large-copy">
              No payment is required to submit. If the property looks like a fit, I&apos;ll send you
              a proposed 2-week campaign plan before anything starts.
            </p>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <label>
              Email address
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Name, optional
              <input name="name" autoComplete="name" />
            </label>
            <label>
              Are you a landlord or agent?
              <select name="role" defaultValue="">
                <option value="">Select one</option>
                <option>Landlord</option>
                <option>Agent</option>
                <option>Owner representative</option>
              </select>
            </label>
            <label>
              Property suburb, optional
              <input name="propertySuburb" />
            </label>
            <label>
              Listing link, optional
              <input name="listingLink" type="url" placeholder="https://" />
            </label>
            <button className="button primary full-span" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit property"}
            </button>
            {submitted && (
              <p className="confirmation full-span" role="status">
                Thanks - I&apos;ll review this and come back to you if it looks like a good fit for
                TenantReach.
              </p>
            )}
            {submitError && (
              <p className="form-error full-span" role="alert">
                {submitError}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default App;
