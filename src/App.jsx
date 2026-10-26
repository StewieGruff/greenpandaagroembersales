import { useEffect, useRef, useState } from 'react';
import {
  CONTACT,
  ORDER_ENDPOINT,
  ORDER_DEADLINE,
  SHIPPING,
  CERTIFICATES,
  PACKAGES,
  CUSTOM_EXAMPLES,
  FAQS,
} from './config.js';

const money = (n) => `$${n.toLocaleString('en-US')}`;

const deadlineText = () => {
  if (!ORDER_DEADLINE) return 'Limited December shipping slots';
  const d = new Date(ORDER_DEADLINE + 'T00:00:00');
  return `Order by ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} for Christmas delivery`;
};

const waLink = (text) => `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
const CUSTOM_WA_TEXT =
  "Hello GreenPanda Agro, I'd like to build a custom Christmas box for delivery to the UK. Here's what I want:\n\n";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  useReveal();
  const [selection, setSelection] = useState(null); // package id
  const [order, setOrder] = useState(null);

  const choosePackage = (id) => {
    setSelection(id);
    scrollTo('order');
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Packages selection={selection} onChoose={choosePackage} />
        <BuildBox />
        <HowItWorks />
        <OrderSection selection={selection} setSelection={setSelection} order={order} setOrder={setOrder} />
        <Faq />
      </main>
      <Footer />
      {!order && <MobileBar />}
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a href="#top" className="brand" aria-label="GreenPanda Agro home">
          <img src="/logo-white.png" alt="GreenPanda Agro" width="900" height="505" />
        </a>
        <nav className="header-nav" aria-label="Main">
          <a href="#packages">Packages</a>
          <a href="#build">Build your box</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="btn btn-gold btn-sm" onClick={() => scrollTo('packages')}>
          Order now
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grain" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="dot" /> {deadlineText()}
          </p>
          <h1>
            Taste of <em>home,</em>
            <br />
            delivered to the&nbsp;UK
            <br />
            for Christmas.
          </h1>
          <p className="lede">
            Ofada rice, garri, crayfish, palm oil, egusi and more. Sourced and packed by GreenPanda Agro in Nigeria,
            shipped straight to your door.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-gold" onClick={() => scrollTo('packages')}>
              Choose your package
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('build')}>
              Build your own box
            </button>
          </div>
          <p className="hero-note">
            Packages from $250. Shipping is separate: air {SHIPPING.air} or sea {SHIPPING.sea}.
          </p>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="label-card">
            <div className="label-top">
              <span className="label-kicker">Export parcel</span>
              <span className="label-stamp">UK</span>
            </div>
            <div className="label-route">
              <div>
                <small>From</small>
                <strong>GreenPanda Agro</strong>
                <span>Nigeria</span>
              </div>
              <svg viewBox="0 0 60 12" className="route-line">
                <path d="M0 6 H52" />
                <path d="M48 1 L56 6 L48 11" />
              </svg>
              <div>
                <small>To</small>
                <strong>Your door</strong>
                <span>United Kingdom</span>
              </div>
            </div>
            <ul className="label-list">
              <li>
                <span>Ofada rice</span>
                <i>25kg</i>
              </li>
              <li>
                <span>Groundnut oil</span>
                <i>25L</i>
              </li>
              <li>
                <span>Palm oil</span>
                <i>25L</i>
              </li>
              <li>
                <span>Semolina</span>
                <i>25kg</i>
              </li>
              <li>
                <span>Egusi</span>
                <i>2 paints</i>
              </li>
            </ul>
            <div className="label-foot">
              <span>Packed &amp; sealed for export</span>
              <span className="barcode" />
            </div>
          </div>
          <div className="sticker">
            <span>Festive</span>
            <span>Feast</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { t: `${CERTIFICATES.join(', ')} certified`, d: 'A registered Nigerian agro exporter' },
    { t: 'Air or sea shipping', d: `Air ${SHIPPING.air}, sea ${SHIPPING.sea}` },
    { t: 'Doorstep delivery', d: 'Delivered to your door anywhere in the UK' },
    { t: 'Packed for UK customs', d: 'Sealed, labelled, export ready' },
  ];
  return (
    <section className="trust">
      <div className="wrap trust-grid">
        {items.map((i) => (
          <div className="trust-item" key={i.t} data-reveal>
            <Check />
            <div>
              <strong>{i.t}</strong>
              <span>{i.d}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const SHOW_ITEMS = 7;

function Packages({ selection, onChoose }) {
  const [open, setOpen] = useState({});
  return (
    <section className="section packages" id="packages">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="kicker">The December boxes</p>
          <h2>
            Pick a box, we <em>handle the rest.</em>
          </h2>
          <p className="section-sub">Prices in US dollars, for the food box only.</p>
        </div>
        <div className="ship-note" data-reveal>
          <TruckIcon />
          <p>
            <strong>Shipping is not included in the package price.</strong> It is charged separately, based on weight and
            how you want it sent: <b>air, {SHIPPING.air}</b> or <b>sea, {SHIPPING.sea}</b>. We confirm the exact cost on
            WhatsApp before you pay.
          </p>
        </div>
        <div className="pkg-grid">
          {PACKAGES.map((p, idx) => {
            const active = selection === p.id;
            return (
              <article
                key={p.id}
                className={`pkg ${p.featured ? 'pkg-featured' : ''} ${active ? 'pkg-active' : ''}`}
                data-reveal
                style={{ '--d': `${idx * 80}ms` }}
              >
                {p.featured && <span className="pkg-badge">Most popular</span>}
                <h3>{p.name}</h3>
                <p className="pkg-tag">{p.tagline}</p>
                <p className="pkg-price">{money(p.price)}</p>
                <p className="pkg-ship">Shipping not included</p>
                <p className="pkg-count">{p.items.length} items</p>
                <ul className="pkg-items">
                  {(open[p.id] ? p.items : p.items.slice(0, SHOW_ITEMS)).map((it) => (
                    <li key={it}>
                      <Check small />
                      {it}
                    </li>
                  ))}
                  {p.items.length > SHOW_ITEMS && (
                    <li className="pkg-more">
                      <button type="button" onClick={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))}>
                        {open[p.id] ? 'Show less' : `See all ${p.items.length} items`}
                      </button>
                    </li>
                  )}
                </ul>
                <button className={`btn ${p.featured ? 'btn-gold' : 'btn-dark'} btn-block`} onClick={() => onChoose(p.id)}>
                  {active ? 'Selected' : `Choose ${p.name}`}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BuildBox() {
  return (
    <section className="section build" id="build">
      <div className="wrap build-cta">
        <div className="section-head" data-reveal>
          <p className="kicker">Build Your Christmas Box</p>
          <h2>
            Only want <em>what you want?</em>
          </h2>
          <p className="section-sub">
            Tell us what you miss most on WhatsApp. We'll put your box together and send you a quote, with shipping by
            air or sea.
          </p>
          <a className="btn btn-whatsapp btn-lg" href={waLink(CUSTOM_WA_TEXT)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Build my box on WhatsApp
          </a>
        </div>
        <div className="build-examples" data-reveal>
          <p className="kicker">Pick from items like</p>
          <ul>
            {CUSTOM_EXAMPLES.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <p className="fine">and more. Just ask.</p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { t: 'Choose your box', d: 'Pick a package, or build your own with us on WhatsApp.' },
    { t: 'Submit your order', d: 'Tell us where to deliver in the UK and how you want it shipped.' },
    { t: 'Confirm on WhatsApp', d: 'We confirm your order, shipping cost and payment details.' },
    { t: 'Delivered to your door', d: `By air in ${SHIPPING.air}, or by sea in ${SHIPPING.sea}.` },
  ];
  return (
    <section className="section how">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="kicker">How it works</p>
          <h2>
            Four steps from <em>our farm to your pot.</em>
          </h2>
        </div>
        <ol className="how-grid">
          {steps.map((s, i) => (
            <li key={s.t} data-reveal style={{ '--d': `${i * 80}ms` }}>
              <span className="how-num">0{i + 1}</span>
              <strong>{s.t}</strong>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const emptyForm = { name: '', email: '', phone: '', address: '', city: '', postcode: '', shipping: '', notes: '' };
const SHIP_OPTIONS = [
  { id: 'Air', label: 'Air', d: SHIPPING.air },
  { id: 'Sea', label: 'Sea', d: SHIPPING.sea },
  { id: 'Not sure', label: 'Not sure', d: 'Advise me' },
];

function OrderSection({ selection, setSelection, order, setOrder }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const topRef = useRef(null);

  const pkg = PACKAGES.find((p) => p.id === selection) || null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!pkg) e.selection = 'Choose a package first.';
    if (form.name.trim().length < 2) e.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter your WhatsApp number with country code.';
    if (form.address.trim().length < 5) e.address = 'Enter your street address.';
    if (form.city.trim().length < 2) e.city = 'Enter your town or city.';
    if (!/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(form.postcode.trim())) e.postcode = 'Enter a valid UK postcode.';
    if (!form.shipping) e.shipping = 'Choose air or sea shipping.';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.querySelector('.field-error, .sel-error');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSending(true);
    const id = `GPA-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`;
    const payload = {
      orderId: id,
      createdAt: new Date().toISOString(),
      package: pkg.name,
      subtotalUSD: pkg.price,
      shipping: form.shipping,
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      postcode: form.postcode.trim().toUpperCase(),
      notes: form.notes.trim(),
    };

    if (ORDER_ENDPOINT) {
      try {
        await fetch(ORDER_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      } catch {
        // The WhatsApp step still carries the full order, so we never block the customer here.
      }
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', { value: pkg.price, currency: 'USD', content_name: pkg.name });
    }
    setSending(false);
    setOrder(payload);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  if (order) return <Success order={order} topRef={topRef} />;

  return (
    <section className="section order" id="order" ref={topRef}>
      <div className="wrap order-layout">
        <div className="order-intro" data-reveal>
          <p className="kicker">Place your order</p>
          <h2>
            Almost <em>there.</em>
          </h2>
          <p className="section-sub">
            Fill this in, then confirm on WhatsApp. You only pay after we confirm your order and shipping cost.
          </p>

          <div className={`sel-card ${errors.selection ? 'sel-error' : ''}`}>
            <p className="sel-label">Your selection</p>
            {pkg ? (
              <>
                <div className="sel-row">
                  <strong>{pkg.name}</strong>
                  <strong>{money(pkg.price)}</strong>
                </div>
                <p className="sel-ship">Shipping not included. Confirmed on WhatsApp.</p>
              </>
            ) : (
              <p className="sel-empty">Nothing selected yet.</p>
            )}
            <div className="sel-switch">
              {PACKAGES.map((p) => (
                <button key={p.id} type="button" className={pkg?.id === p.id ? 'on' : ''} onClick={() => setSelection(p.id)}>
                  {p.name}
                </button>
              ))}
            </div>
            <p className="sel-custom">
              Want a custom box?{' '}
              <a href={waLink(CUSTOM_WA_TEXT)} target="_blank" rel="noopener noreferrer">
                Build it on WhatsApp
              </a>
            </p>
            {errors.selection && <p className="err">{errors.selection}</p>}
          </div>
        </div>

        <form className="order-form" onSubmit={submit} noValidate data-reveal>
          <Field label="Full name" error={errors.name}>
            <input value={form.name} onChange={set('name')} autoComplete="name" />
          </Field>
          <div className="two">
            <Field label="Email" error={errors.email}>
              <input type="email" value={form.email} onChange={set('email')} autoComplete="email" />
            </Field>
            <Field label="WhatsApp number" error={errors.phone} hint="Include country code, e.g. +44">
              <input type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+44 7..." />
            </Field>
          </div>
          <Field label="UK delivery address" error={errors.address}>
            <input value={form.address} onChange={set('address')} autoComplete="street-address" />
          </Field>
          <div className="two">
            <Field label="Town or city" error={errors.city}>
              <input value={form.city} onChange={set('city')} autoComplete="address-level2" />
            </Field>
            <Field label="Postcode" error={errors.postcode}>
              <input value={form.postcode} onChange={set('postcode')} autoComplete="postal-code" />
            </Field>
          </div>
          <fieldset className={`field ship-field ${errors.shipping ? 'field-error' : ''}`}>
            <legend className="field-label">How should we ship it?</legend>
            <div className="ship-options">
              {SHIP_OPTIONS.map((o) => (
                <label key={o.id} className={`ship-opt ${form.shipping === o.id ? 'on' : ''}`}>
                  <input
                    type="radio"
                    name="shipping"
                    value={o.id}
                    checked={form.shipping === o.id}
                    onChange={set('shipping')}
                  />
                  <strong>{o.label}</strong>
                  <span>{o.d}</span>
                </label>
              ))}
            </div>
            {errors.shipping ? (
              <span className="err">{errors.shipping}</span>
            ) : (
              <span className="hint">Shipping cost is separate and confirmed on WhatsApp.</span>
            )}
          </fieldset>
          <Field label="Anything we should know?" optional>
            <textarea rows="3" value={form.notes} onChange={set('notes')} />
          </Field>
          <button className="btn btn-gold btn-block btn-lg" disabled={sending}>
            {sending ? 'Sending…' : 'Submit order'}
          </button>
          <p className="fine">No payment is taken on this page.</p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, error, hint, optional, children }) {
  return (
    <label className={`field ${error ? 'field-error' : ''}`}>
      <span className="field-label">
        {label} {optional && <small>(optional)</small>}
      </span>
      {children}
      {error ? <span className="err">{error}</span> : hint ? <span className="hint">{hint}</span> : null}
    </label>
  );
}

function Success({ order, topRef }) {
  const text = [
    'Hello GreenPanda Agro, I just placed a December order.',
    '',
    `Order ID: ${order.orderId}`,
    `Package: ${order.package} (${money(order.subtotalUSD)})`,
    `Shipping: ${order.shipping}`,
    '',
    `Name: ${order.name}`,
    `Delivery: ${order.address}, ${order.city}, ${order.postcode}`,
    order.notes ? `Notes: ${order.notes}` : null,
    '',
    'Please confirm my shipping cost and payment details.',
  ]
    .filter((l) => l !== null)
    .join('\n');
  const href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

  return (
    <section className="section success" id="order" ref={topRef}>
      <div className="wrap success-card">
        <div className="success-icon">
          <Check />
        </div>
        <p className="kicker">Order received</p>
        <h2>
          One last step, <em>{order.name.split(' ')[0]}.</em>
        </h2>
        <p className="section-sub">
          Tap the button to send your order to us on WhatsApp. We'll confirm your shipping cost and payment details
          there.
        </p>
        <a className="btn btn-whatsapp btn-lg" href={href} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> Confirm on WhatsApp
        </a>
        <dl className="receipt">
          <div>
            <dt>Order ID</dt>
            <dd>{order.orderId}</dd>
          </div>
          <div>
            <dt>Order</dt>
            <dd>{order.package}</dd>
          </div>
          <div>
            <dt>Package price</dt>
            <dd>{money(order.subtotalUSD)}, shipping separate</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>
              {order.shipping}, to {order.postcode}
            </dd>
          </div>
        </dl>
        <p className="fine">
          WhatsApp not opening? Message us on {CONTACT.whatsappDisplay} or email {CONTACT.email} with your order ID.
        </p>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq-layout">
        <div className="section-head" data-reveal>
          <p className="kicker">Questions</p>
          <h2>
            Good to <em>know.</em>
          </h2>
          <p className="section-sub">
            Still unsure? Chat with us on{' '}
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            .
          </p>
        </div>
        <div className="faq-list">
          {FAQS.map((f) => (
            <details key={f.q} data-reveal>
              <summary>
                {f.q}
                <span className="plus" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <img src="/logo-white.png" alt="GreenPanda Agro" className="footer-logo" width="900" height="505" />
        <div className="footer-cols">
          <div>
            <strong>Contact</strong>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp {CONTACT.whatsappDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
          <div>
            <strong>Company</strong>
            <span>GreenPanda Agro, Nigeria</span>
            <span>{CERTIFICATES.join(', ')} certified</span>
          </div>
          <div>
            <strong>Shipping</strong>
            <span>Air: {SHIPPING.air}</span>
            <span>Sea: {SHIPPING.sea}</span>
            <span>Doorstep delivery across the UK</span>
          </div>
        </div>
      </div>
      <div className="wrap footer-base">© {new Date().getFullYear()} GreenPanda Agro. All rights reserved.</div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="mobile-bar">
      <span>
        From <strong>$250</strong> <small>excl. shipping</small>
      </span>
      <button className="btn btn-gold btn-sm" onClick={() => scrollTo('packages')}>
        Order now
      </button>
    </div>
  );
}

function Check({ small }) {
  return (
    <svg className={`check ${small ? 'check-sm' : ''}`} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      <path d="M5.5 10.5 L8.5 13.5 L14.5 7" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="truck" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 6h11v9H2zM13 9h4l3 3.5V15h-7z" />
      <circle cx="6" cy="17" r="1.8" />
      <circle cx="16.5" cy="17" r="1.8" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}
