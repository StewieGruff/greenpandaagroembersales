// Meta Pixel (browser) + Conversions API (server, via /api/meta-event).
// The server part only sends once META_CAPI_TOKEN is set in Vercel.
import { META_PIXEL_ID } from './config.js';

const PIXEL_ID = META_PIXEL_ID;
let started = false;

const newEventId = () =>
  (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

export function initPixel() {
  if (!PIXEL_ID || started) return;
  started = true;
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', PIXEL_ID);
  track('PageView');
  // Any WhatsApp link on the page counts as a Contact.
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href^="https://wa.me"]');
    if (a) track('Contact', { content_name: a.dataset.track || 'WhatsApp' });
  });
}

// Sends the event from the browser and from the server with the same event_id,
// so Meta counts it once.
export function track(event, params = {}, user = {}) {
  if (!PIXEL_ID) return;
  const eventId = newEventId();
  try {
    window.fbq && window.fbq('track', event, params, { eventID: eventId });
  } catch {
    /* ignore */
  }
  try {
    const body = JSON.stringify({
      event,
      eventId,
      params,
      user,
      url: window.location.href,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/meta-event', new Blob([body], { type: 'application/json' }));
    } else {
      fetch('/api/meta-event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
    }
  } catch {
    /* ignore */
  }
}

// Fire an event once, the first time an element scrolls into view.
export function trackWhenSeen(selector, event, params) {
  if (!PIXEL_ID) return;
  const el = document.querySelector(selector);
  if (!el || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      track(event, params);
      io.disconnect();
    }
  }, { threshold: 0.3 });
  io.observe(el);
}
