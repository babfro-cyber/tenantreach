import { FormEvent, useState } from "react";

const campaignSummary = [
  "Targeted weekday outreach to relevant businesses",
  "Follow-ups included",
  "Weekly progress report",
  "No success fee",
];

const bestFit = [
  "Warehouses",
  "Industrial units",
  "Trade / showroom spaces",
  "Logistics and depot-style properties",
  "Light industrial properties",
];

const notIdeal = [
  "Residential property",
  "Premium CBD office towers",
  "Major institutional assets",
  "Retail shops relying mainly on foot traffic",
];

const steps = [
  {
    title: "Property brief",
    copy: "You share the listing, location, property type, and the kind of tenant you want.",
  },
  {
    title: "Market-led tenant research",
    copy: "TenantReach looks for businesses that may have a real reason to move, expand, open locally, improve logistics, or need space like yours. Research can include public business news, local updates, hiring signals, online ads, directories, Google keyword searches, and other public indicators of activity or growth.",
  },
  {
    title: "Tailored outreach",
    copy: "Each message is written around the property and the likely business need, not a generic leasing blast.",
  },
  {
    title: "Follow-up and tracking",
    copy: "Replies, follow-ups, and interested leads are tracked clearly. You get visibility of the outreach activity and responses.",
  },
];

const faqs = [
  {
    question: "Do you replace my leasing agent?",
    answer: "No. TenantReach is an additional outbound layer. Agents still play an important role.",
  },
  {
    question: "Do you guarantee a tenant?",
    answer: "No. The goal is to create additional tenant conversations, not guarantee a lease.",
  },
  {
    question: "Will you contact businesses without approval?",
    answer: "No. You approve the target profile and outreach message before anything is sent.",
  },
  {
    question: "How many businesses do you contact?",
    answer:
      "We prioritise relevance over volume. Early campaigns start with a small daily batch of targeted prospects so outreach stays property-specific and easy to track.",
  },
  {
    question: "Who sends the emails?",
    answer:
      "For early campaigns, the setup is agreed before launch. Outreach can be sent from a dedicated campaign inbox or an approved client email setup. You’ll have visibility of messages, replies, and follow-ups.",
  },
  {
    question: "What properties work best?",
    answer: "Industrial, warehouse, logistics, trade/showroom and light industrial properties.",
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
            <p className="eyebrow">
              Targeted outbound tenant sourcing for vacant commercial and industrial properties.
            </p>
            <h1>Find tenant leads beyond listing enquiries</h1>
            <p className="hero-subtitle">
              TenantReach identifies likely-fit businesses, contacts them directly, follows up,
              and tracks the pipeline.
            </p>
            <a className="button primary" href="#early-access">
              Join the early access list
            </a>
            <p className="trust-line">
              You approve the target profile and outreach message before anything is sent.
            </p>
          </div>

          <aside className="hero-panel" aria-label="Early access campaign summary">
            <div className="panel-header">
              <p className="panel-label">Early access campaign</p>
              <div className="panel-price">
                <strong>$199</strong>
                <span>per week</span>
              </div>
              <p className="panel-note">Minimum 2 weeks. Cancel anytime after that.</p>
            </div>
            <ul className="summary-list">
              {campaignSummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section muted">
        <div className="container credibility-card">
          <div>
            <p className="eyebrow">Why TenantReach exists</p>
            <h2>Built from a real leasing problem</h2>
          </div>
          <div className="credibility-copy">
            <p>
              Vacant commercial property becomes expensive quickly when enquiry slows down. Listing
              portals and agent networks are useful, but in slower markets they can leave landlords
              waiting.
            </p>
            <p>
              I first built this while trying to lease one of my own commercial properties. Instead
              of waiting only for inbound enquiries, I researched relevant businesses, contacted
              them directly, followed up, and tracked the pipeline. I recently secured a tenant,
              and this outbound layer helped create more activity around the property.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2>A focused outbound campaign alongside your existing leasing activity</h2>
          </div>
          <div className="step-grid">
            {steps.map((step, index) => (
              <article className="card step-card" key={step.title}>
                <span className="step-number">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Example campaign</p>
            <h2>What a targeted tenant search can look like.</h2>
            <p className="example-note">
              Example only &mdash; target selection and outreach are tailored to each property and
              approved before anything is sent. The business example below is fictional.
            </p>
          </div>

          <div className="example-grid">
            <article className="card example-card">
              <span className="example-label">Property</span>
              <div className="warehouse-icon" aria-hidden="true">
                <span></span>
              </div>
              <h3>Example: 380 sqm industrial unit in Brisbane</h3>
              <p>
                High-clearance warehouse, roller door access, 3-phase power, small office, and
                good access to major arterial roads.
              </p>
            </article>

            <article className="card example-card">
              <span className="example-label">Potential tenant logic</span>
              <h3>Potential tenant profile</h3>
              <p>
                Trade services, equipment hire, logistics support, building supplies, light
                manufacturing, or businesses needing storage plus local distribution.
              </p>
              <h3>Example target</h3>
              <p>
                A growing building maintenance business servicing Brisbane&apos;s inner north and
                trade customers across nearby suburbs.
              </p>
              <p>
                <strong>Why they may be relevant:</strong> They recently advertised for two field
                staff, operate across the local area, and appear to need storage, parking, or
                operational space close to their customer base.
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
                  I&apos;m helping with a high-clearance industrial unit in Brisbane that may
                  suit a trade or service business needing more warehouse, storage, or operational
                  space.
                </p>
                <p>
                  It is around 380 sqm, with roller door access, 3-phase power, and good access to
                  major arterial roads.
                </p>
                <p>
                  Would it be worth sending through the listing in case it&apos;s relevant now or
                  later this year?
                </p>
                <p>Regards,<br />[Name]</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Who it is for</p>
            <h2>Best for properties with a clear business use</h2>
          </div>
          <div className="fit-grid">
            <div className="fit-card positive">
              <h3>Best suited to</h3>
              <ul>
                {bestFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="fit-card">
              <h3>Not ideal for</h3>
              <ul>
                {notIdeal.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>Common questions</h2>
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
            <p className="eyebrow">Early access</p>
            <h2>Join the early access list</h2>
            <p className="large-copy">
              Leave your email and I&apos;ll come back to you if the property looks like a good fit
              for an early campaign.
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
                <option value="">
                  Select one
                </option>
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
              {isSubmitting ? "Sending..." : "Join early access"}
            </button>
            {submitted && (
              <p className="confirmation full-span" role="status">
                Thanks &mdash; I&apos;ll review this and come back to you if it looks like a good fit
                for TenantReach.
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
