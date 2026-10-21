// ─────────────────────────────────────────────────────────────
// Everything the team may need to change lives in this file.
// Items marked PLACEHOLDER should be confirmed before launch.
// ─────────────────────────────────────────────────────────────

export const CONTACT = {
  whatsapp: '2347064444585', // international format, no + or spaces
  whatsappDisplay: '+234 706 444 4585',
  email: 'greenpandaagro@gmail.com',
  cac: 'RC 0000000', // PLACEHOLDER: CAC registration number
};

// Google Apps Script web app URL (see apps-script/Code.gs).
// Leave empty to skip saving to Google Sheets.
export const ORDER_ENDPOINT = '';

// Last order date for Christmas delivery. Set to null until confirmed.
// Example: '2026-11-25'
export const ORDER_DEADLINE = null;

export const SHIPPING = {
  partner: 'Chimert Logistics',
  country: 'United Kingdom',
  eta: 'about 3 weeks', // PLACEHOLDER: confirm with Chimert
};

export const CURRENCY = 'USD';

// PLACEHOLDER: contents and weights pending supplier confirmation.
export const PACKAGES = [
  {
    id: 'starter',
    name: 'Christmas Starter',
    price: 250,
    tagline: 'For one person who just wants the real thing.',
    items: [
      'Parboiled long grain rice, 10kg',
      'Honey beans (oloyin), 3kg',
      'Ijebu garri, 3kg',
      'Ground egusi, 1kg',
      'Pepper soup spice mix',
    ],
  },
  {
    id: 'feast',
    name: 'Festive Feast',
    price: 500,
    tagline: 'Enough to host Christmas lunch and still have leftovers.',
    featured: true,
    items: [
      'Parboiled long grain rice, 25kg',
      'Ofada rice, 5kg',
      'Honey beans (oloyin), 5kg',
      'Ijebu and yellow garri, 5kg each',
      'Yam flour (elubo), 3kg',
      'Ground egusi and ogbono, 2kg',
      'Spice pack: suya, pepper soup, dried pepper',
    ],
  },
  {
    id: 'grand',
    name: 'Grand December',
    price: 1000,
    tagline: 'The full pantry restock. Family and friends sorted till March.',
    items: [
      'Parboiled long grain rice, 50kg',
      'Ofada rice, 10kg',
      'Honey beans and brown beans, 10kg',
      'Ijebu and yellow garri, 10kg each',
      'Yam flour and plantain flour, 5kg each',
      'Ground egusi and ogbono, 4kg',
      'Roasted cashew nuts, 2kg',
      'Full spice pack',
    ],
  },
];

// PLACEHOLDER: item list and unit prices for "Build Your Christmas Box".
export const CUSTOM_ITEMS = [
  { id: 'rice-lg', name: 'Parboiled long grain rice', unit: '5kg bag', price: 22 },
  { id: 'rice-ofada', name: 'Ofada rice', unit: '2kg bag', price: 18 },
  { id: 'beans-honey', name: 'Honey beans (oloyin)', unit: '2kg bag', price: 16 },
  { id: 'beans-brown', name: 'Brown beans', unit: '2kg bag', price: 14 },
  { id: 'garri-ijebu', name: 'Ijebu garri', unit: '2kg bag', price: 10 },
  { id: 'garri-yellow', name: 'Yellow garri', unit: '2kg bag', price: 11 },
  { id: 'elubo', name: 'Yam flour (elubo)', unit: '2kg bag', price: 15 },
  { id: 'plantain-flour', name: 'Plantain flour', unit: '1kg bag', price: 12 },
  { id: 'egusi', name: 'Ground egusi', unit: '1kg pack', price: 20 },
  { id: 'ogbono', name: 'Ground ogbono', unit: '500g pack', price: 18 },
  { id: 'cashew', name: 'Roasted cashew nuts', unit: '500g pack', price: 14 },
  { id: 'spices', name: 'Spice pack (suya, pepper soup, dried pepper)', unit: 'set', price: 12 },
];

export const CUSTOM_MINIMUM = 100; // minimum value of a custom box, in USD

export const FAQS = [
  {
    q: 'How much is shipping?',
    a: 'Shipping is charged separately and depends on the weight of your order. We confirm the exact cost on WhatsApp before you pay, so there are no surprises.',
  },
  {
    q: 'How long does delivery take?',
    a: `Delivery to the UK takes ${SHIPPING.eta} through our logistics partner, ${SHIPPING.partner}. You get a tracking number once your box ships.`,
  },
  {
    q: 'Will my box clear UK customs?',
    a: 'Every item we offer is checked against UK import rules for food, and each box is packed, sealed and labelled for export. Items that are not permitted are simply not on our list.',
  },
  {
    q: 'How do I pay?',
    a: 'Submit your order here, then tap the WhatsApp button. Our team confirms your order, shipping cost and payment details in that chat.',
  },
  {
    q: 'What if something goes wrong?',
    a: 'Message us on WhatsApp or email us any time. Our team will work with you and our logistics partner to sort it out.',
  },
];
