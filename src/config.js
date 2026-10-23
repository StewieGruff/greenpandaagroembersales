// ─────────────────────────────────────────────────────────────
// Everything the team may need to change lives in this file.
// Items marked PLACEHOLDER should be confirmed before launch.
// ─────────────────────────────────────────────────────────────

export const CONTACT = {
  whatsapp: '2347064444585', // international format, no + or spaces
  whatsappDisplay: '+234 706 444 4585',
  email: 'greenpandaagro@gmail.com',
};

// Google Apps Script web app URL (see apps-script/Code.gs).
// Leave empty to skip saving to Google Sheets.
export const ORDER_ENDPOINT = '';

// Last order date for Christmas delivery. Set to null until confirmed.
// Example: '2026-11-25'
export const ORDER_DEADLINE = null;

export const SHIPPING = {
  country: 'United Kingdom',
  air: '7 to 10 days',
  sea: '4 to 5 weeks',
};

export const CERTIFICATES = ['CAC', 'NEPC', 'SCUML'];

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

// Shown as examples in the "Build Your Christmas Box" section. Custom boxes are arranged on WhatsApp.
export const CUSTOM_EXAMPLES = [
  'Parboiled rice',
  'Ofada rice',
  'Honey beans',
  'Brown beans',
  'Ijebu garri',
  'Yellow garri',
  'Yam flour (elubo)',
  'Plantain flour',
  'Ground egusi',
  'Ground ogbono',
  'Cashew nuts',
  'Spices',
];

export const FAQS = [
  {
    q: 'Is shipping included in the package price?',
    a: 'No. The package price covers the food box only. Shipping is charged separately based on the weight of your order and whether you choose air or sea. We confirm the exact cost on WhatsApp before you pay.',
  },
  {
    q: 'How long does delivery take?',
    a: `By air, ${SHIPPING.air}. By sea, ${SHIPPING.sea}. Sea is cheaper, air is faster. Pick what works for you when you order.`,
  },
  {
    q: 'Do you deliver to my door?',
    a: 'Yes. Doorstep delivery is available anywhere in the UK.',
  },
  {
    q: 'Will my box clear UK customs?',
    a: 'Every box is packed, sealed and labelled to meet UK food import rules. Items that are not permitted are simply not on our list.',
  },
  {
    q: 'Can I choose my own items?',
    a: 'Yes. Message us on WhatsApp with what you want and we will put a custom box together and send you a quote.',
  },
  {
    q: 'Is GreenPanda Agro a registered company?',
    a: 'Yes. We are registered with the CAC, NEPC (Nigerian Export Promotion Council) and SCUML.',
  },
  {
    q: 'How do I pay?',
    a: 'Submit your order here, then tap the WhatsApp button. Our team confirms your order, shipping cost and payment details in that chat.',
  },
];
