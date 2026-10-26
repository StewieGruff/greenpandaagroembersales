// Vercel serverless function: forwards page events to Meta's Conversions API.
// Needs two environment variables in Vercel:
//   META_CAPI_TOKEN     a Conversions API access token from Events Manager
// The Pixel ID defaults to GreenPanda's; META_PIXEL_ID overrides it.
// Optional: META_TEST_EVENT_CODE to see events in Events Manager > Test events.

import crypto from 'node:crypto';

const ALLOWED = new Set(['PageView', 'ViewContent', 'InitiateCheckout', 'Lead', 'Contact']);
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v23.0';

const sha256 = (v) => crypto.createHash('sha256').update(v).digest('hex');
const norm = (v) => (typeof v === 'string' ? v.trim().toLowerCase() : '');

function cookie(req, name) {
  const m = (req.headers.cookie || '').match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const pixelId = process.env.META_PIXEL_ID || '1096022216672824';
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return res.status(204).end(); // tracking not configured yet

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).end();
    }
  }
  const { event, eventId, params = {}, user = {}, url } = body || {};
  if (!ALLOWED.has(event) || typeof eventId !== 'string') return res.status(400).end();

  const userData = {
    client_ip_address: (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || undefined,
    client_user_agent: req.headers['user-agent'],
    fbp: cookie(req, '_fbp'),
    fbc: cookie(req, '_fbc'),
  };
  if (user.email) userData.em = [sha256(norm(user.email))];
  if (user.phone) {
    const digits = String(user.phone).replace(/\D/g, '');
    if (digits) userData.ph = [sha256(digits)];
  }
  if (user.firstName) userData.fn = [sha256(norm(user.firstName))];
  if (user.city) userData.ct = [sha256(norm(user.city).replace(/\s/g, ''))];
  if (user.postcode) userData.zp = [sha256(norm(user.postcode).replace(/\s/g, ''))];
  userData.country = [sha256('gb')];

  const customData = {};
  if (typeof params.value === 'number') customData.value = params.value;
  if (params.currency) customData.currency = String(params.currency);
  if (params.content_name) customData.content_name = String(params.content_name).slice(0, 100);

  const payload = {
    data: [
      {
        event_name: event,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: typeof url === 'string' ? url.slice(0, 500) : undefined,
        user_data: userData,
        custom_data: customData,
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const r = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error('Meta CAPI error', r.status, await r.text());
  } catch (err) {
    console.error('Meta CAPI request failed', err);
  }
  return res.status(204).end();
}
