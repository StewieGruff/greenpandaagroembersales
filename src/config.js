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

export const PACKAGES = [
  {
    id: 'starter',
    name: 'Christmas Starter',
    price: 250,
    tagline: 'For one person who just wants the real thing.',
    items: [
      'Ofada rice, 25kg bag',
      'Garri, half bag',
      'Crayfish, quarter bag',
      'Groundnut oil, 10 litres',
      'Palm oil, 10 litres',
      'Dried pepper, half paint',
      'Semolina, 10kg',
      'Spaghetti, 1 carton',
      'Super Pack noodles, 1 carton',
    ],
  },
  {
    id: 'feast',
    name: 'Festive Feast',
    price: 500,
    tagline: 'Enough to host Christmas lunch and still have leftovers.',
    featured: true,
    items: [
      'Ofada rice, 25kg bag',
      'Garri, 1 bag',
      'Crayfish, half bag',
      'Groundnut oil, 25 litres',
      'Palm oil, 25 litres',
      'Dried pepper, 1 paint',
      'Semolina, 25kg',
      'Spaghetti, 1 carton',
      'Super Pack noodles, 1 carton',
      'Egusi, 2 paints',
      'Ogbono, 2 paints',
      'Gino tomato paste, 1 carton',
      'Gino seasoning cubes, 1 carton',
      'Salt, half pack',
      'Gino curry, 1 carton',
      'Gino thyme, 1 carton',
      'Assorted seasoning powders, 1 pack',
    ],
  },
  {
    id: 'grand',
    name: 'Grand December',
    price: 1000,
    tagline: 'The full pantry restock. Family and friends sorted till March.',
    items: [
      'Ofada rice, 50kg bag',
      'Garri, 2 bags',
      'Groundnut oil, 25 litres + 10 litres',
      'Palm oil, 25 litres + 10 litres',
      'Crayfish, 2 bags',
      'Dried pepper, 2 paints',
      'Semolina, 3 bags (25kg each)',
      'Egusi, 3 paints',
      'Ogbono, 3 paints',
      'Gino tomato paste, 2 cartons',
      'Salt, 2 packs',
      'Thyme, 2 packs',
      'Curry, 2 packs',
      'Assorted seasoning powders, 2 packs',
      'Golden Morn, 3 cartons',
      'Corn flakes, 3 cartons',
      'Dried vegetables, 2 packs each of 3 types',
      'Dried fish, 2 family packs',
    ],
  },
];

// Shown as examples in the "Build Your Christmas Box" section. Custom boxes are arranged on WhatsApp.
export const CUSTOM_EXAMPLES = [
  'Ofada rice',
  'Garri',
  'Crayfish',
  'Groundnut oil',
  'Palm oil',
  'Dried pepper',
  'Semolina',
  'Egusi',
  'Ogbono',
  'Dried fish',
  'Dried vegetables',
  'Spaghetti',
  'Noodles',
  'Golden Morn',
  'Corn flakes',
  'Seasonings',
]

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
