import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CONTACT,
  ORDER_ENDPOINT,
  ORDER_DEADLINE,
  SHIPPING,
  PACKAGES,
  CUSTOM_ITEMS,
  CUSTOM_MINIMUM,
  FAQS,
} from './config.js';

const money = (n) => `$${n.toLocaleString('en-US')}`;

const deadlineText = () => {
  if (!ORDER_DEADLINE) return 'Limited December shipping slots';
  const d = new Date(ORDER_DEADLINE + 'T00:00:00');
  return `Order by ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} for Christmas delivery`;
};

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
  const [selection, setSelection] = useState(null); // { type: 'package', id } | { type: 'custom' }
  const [qty, setQty] = useState({});
  const [order, setOrder] = useState(null);

  const customLines = CUSTOM_ITEMS.filter((i) => qty[i.id] > 0).map((i) => ({ ...i, qty: qty[i.id] }));
  const customTotal = customLines.reduce((s, i) => s + i.price * i.qty, 0);

  const choosePackage = (id) => {
    setSelection({ type: 'package', id });
    scrollTo('order');
  };
  const useCustom = () => {
    setSelection({ type: 'custom' });
    scrollTo('order');
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Packages selection={selection} onChoose={choosePackage} />
        <BuildBox qty={qty} setQty={setQty} lines={customLines} total={customTotal} onUse={useCustom} />
        <HowItWorks />
        <OrderSection
          selection={selection}
          setSelection={setSelection}
          customLines={customLines}
          customTotal={customTotal}
          order={order}
          setOrder={setOrder}
        />
        <Faq />
      </main>
      <Footer />
      {!order && <MobileBar total={customTotal} onUse={useCustom} />}
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
            Nigerian rice, beans, garri, flours and spices. Sourced and packed by GreenPanda Agro in Nigeria, shipped
            straight to your door.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-gold" onClick={() => scrollTo('packages')}>
              Choose your package
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('build')}>
              Build your own box
            </button>
          </div>
          <p className="hero-note">Packages from $250. Shipping quoted on WhatsApp before you pay.</p>
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
                <span>Parboiled rice</span>
                <i>25kg</i>
              </li>
              <li>
                <span>Honey beans</span>
                <i>5kg</i>
              </li>
              <li>
                <span>Ijebu garri</span>
                <i>5kg</i>
              </li>
              <li>
                <span>Ground egusi</span>
                <i>2kg</i>
              </li>
              <li>
                <span>Pepper soup spice</span>
                <i>1 set</i>
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
    { t: 'CAC registered', d: 'A registered Nigerian agro company' },
    { t: `Shipped by ${SHIPPING.partner}`, d: `Door delivery in ${SHIPPING.eta}` },
    { t: 'Tracked delivery', d: 'Tracking number once your box ships' },
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

function Packages({ selection, onChoose }) {
  return (
    <section className="section packages" id="packages">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="kicker">The December boxes</p>
          <h2>
            Pick a box, we <em>handle the rest.</em>
          </h2>
          <p className="section-sub">Prices in US dollars. Shipping to the UK is quoted separately on WhatsApp.</p>
        </div>
        <div className="pkg-grid">
          {PACKAGES.map((p, idx) => {
            const active = selection?.type === 'package' && selection.id === p.id;
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
                <p className="pkg-price">
                  {money(p.price)}
                  <small> + shipping</small>
                </p>
                <ul className="pkg-items">
                  {p.items.map((it) => (
                    <li key={it}>
                      <Check small />
                      {it}
                    </li>
                  ))}
                </ul>
                <button className={`btn ${p.featured ? 'btn-gold' : 'btn-dark'} btn-block`} onClick={() => onChoose(p.id)}>
                  {active ? 'Selected' : `Choose ${p.name}`}
                </button>
              </article>
            );
          })}
        </div>
        <p className="fine">Package contents are being finalised with our suppliers and may change slightly.</p>
      </div>
    </section>
  );
}

function BuildBox({ qty, setQty, lines, total, onUse }) {
  const change = (id, d) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(20, (q[id] || 0) + d)) }));
  const remaining = Math.max(0, CUSTOM_MINIMUM - total);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <section className="section build" id="build">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="kicker">Build Your Christmas Box</p>
          <h2>
            Only want <em>what you want?</em>
          </h2>
          <p className="section-sub">
            Add the items you miss most. Minimum box value is {money(CUSTOM_MINIMUM)}.
          </p>
        </div>

        <div className="build-layout">
          <ul className="build-list">
            {CUSTOM_ITEMS.map((i) => {
              const n = qty[i.id] || 0;
              return (
                <li key={i.id} className={`build-row ${n ? 'has' : ''}`}>
                  <div className="build-info">
                    <strong>{i.name}</strong>
                    <span>
                      {i.unit} · {money(i.price)}
                    </span>
                  </div>
                  <div className="stepper" role="group" aria-label={`Quantity of ${i.name}`}>
                    <button onClick={() => change(i.id, -1)} disabled={!n} aria-label={`Remove one ${i.name}`}>
                      −
                    </button>
                    <output aria-live="polite">{n}</output>
                    <button onClick={() => change(i.id, 1)} aria-label={`Add one ${i.name}`}>
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="build-summary">
            <p className="kicker">Your box</p>
            {lines.length === 0 ? (
              <p className="empty">Nothing in your box yet. Tap + to add items.</p>
            ) : (
              <ul className="sum-lines">
                {lines.map((l) => (
                  <li key={l.id}>
                    <span>
                      {l.qty} × {l.name}
                    </span>
                    <span>{money(l.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="sum-total">
              <span>
                Subtotal <small>({count} {count === 1 ? 'item' : 'items'})</small>
              </span>
              <strong>{money(total)}</strong>
            </div>
            <div className="meter" aria-hidden="true">
              <span style={{ width: `${Math.min(100, (total / CUSTOM_MINIMUM) * 100)}%` }} />
            </div>
            <p className="sum-note">
              {remaining > 0 ? `Add ${money(remaining)} more to reach the minimum.` : 'Your box is ready. Shipping quoted on WhatsApp.'}
            </p>
            <button className="btn btn-gold btn-block" disabled={remaining > 0} onClick={onUse}>
              Order this box
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { t: 'Choose your box', d: 'Pick a package or build your own from our list.' },
    { t: 'Submit your order', d: 'Tell us where to deliver in the UK. Takes a minute.' },
    { t: 'Confirm on WhatsApp', d: 'We confirm your order, shipping cost and payment details.' },
    { t: 'Track it home', d: `Your box ships with ${SHIPPING.partner} and arrives in ${SHIPPING.eta}.` },
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

const emptyForm = { name: '', email: '', phone: '', address: '', city: '', postcode: '', notes: '' };

function OrderSection({ selection, setSelection, customLines, customTotal, order, setOrder }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const topRef = useRef(null);

  const pkg = selection?.type === 'package' ? PACKAGES.find((p) => p.id === selection.id) : null;
  const isCustom = selection?.type === 'custom';
  const customValid = customTotal >= CUSTOM_MINIMUM;

  const summary = useMemo(() => {
    if (pkg) return { label: pkg.name, total: pkg.price, lines: [`${pkg.name} package (${money(pkg.price)})`] };
    if (isCustom)
      return {
        label: 'Custom Christmas Box',
        total: customTotal,
        lines: customLines.map((l) => `${l.qty} × ${l.name}, ${l.unit} (${money(l.price * l.qty)})`),
      };
    return null;
  }, [pkg, isCustom, customLines, customTotal]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!summary) e.selection = 'Choose a package or build your box first.';
    if (isCustom && !customValid) e.selection = `Your custom box needs to be at least ${money(CUSTOM_MINIMUM)}.`;
    if (form.name.trim().length < 2) e.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter your WhatsApp number with country code.';
    if (form.address.trim().length < 5) e.address = 'Enter your street address.';
    if (form.city.trim().length < 2) e.city = 'Enter your town or city.';
    if (!/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(form.postcode.trim())) e.postcode = 'Enter a valid UK postcode.';
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
      package: summary.label,
      items: summary.lines.join('\n'),
      subtotalUSD: summary.total,
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
      window.fbq('track', 'Lead', { value: summary.total, currency: 'USD', content_name: summary.label });
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
            {summary ? (
              <>
                <div className="sel-row">
                  <strong>{summary.label}</strong>
                  <strong>{money(summary.total)}</strong>
                </div>
                {isCustom && (
                  <ul className="sel-lines">
                    {customLines.map((l) => (
                      <li key={l.id}>
                        {l.qty} × {l.name}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="sel-ship">+ shipping to the UK, confirmed on WhatsApp</p>
              </>
            ) : (
              <p className="sel-empty">Nothing selected yet.</p>
            )}
            <div className="sel-switch">
              {PACKAGES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={pkg?.id === p.id ? 'on' : ''}
                  onClick={() => setSelection({ type: 'package', id: p.id })}
                >
                  {p.name}
                </button>
              ))}
              <button
                type="button"
                className={isCustom ? 'on' : ''}
                onClick={() => (customLines.length ? setSelection({ type: 'custom' }) : scrollTo('build'))}
              >
                Custom box
              </button>
            </div>
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
    `Order: ${order.package}`,
    order.items,
    `Subtotal: ${money(order.subtotalUSD)} + shipping`,
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
            <dt>Subtotal</dt>
            <dd>{money(order.subtotalUSD)} + shipping</dd>
          </div>
          <div>
            <dt>Deliver to</dt>
            <dd>
              {order.city}, {order.postcode}
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
            <span>CAC {CONTACT.cac}</span>
          </div>
          <div>
            <strong>Shipping</strong>
            <span>UK delivery by {SHIPPING.partner}</span>
            <span>Shipping quoted per order</span>
          </div>
        </div>
      </div>
      <div className="wrap footer-base">© {new Date().getFullYear()} GreenPanda Agro. All rights reserved.</div>
    </footer>
  );
}

function MobileBar({ total, onUse }) {
  if (total > 0) {
    const ready = total >= CUSTOM_MINIMUM;
    return (
      <div className="mobile-bar">
        <span>
          Your box <strong>{money(total)}</strong>
          {!ready && <small> · {money(CUSTOM_MINIMUM - total)} to minimum</small>}
        </span>
        <button className="btn btn-gold btn-sm" disabled={!ready} onClick={onUse}>
          Order box
        </button>
      </div>
    );
  }
  return (
    <div className="mobile-bar">
      <span>
        From <strong>$250</strong> + shipping
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}
