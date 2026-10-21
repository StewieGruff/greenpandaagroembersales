# GreenPanda Agro, December UK Campaign

Landing page for Nigerian foodstuff boxes shipped to the UK.

## Edit content
Everything (packages, prices, item list, WhatsApp number, deadline, FAQs) is in `src/config.js`.

## Order flow
1. Customer picks a package or builds a custom box.
2. Submits the order form (saved to Google Sheets, email sent to greenpandaagro@gmail.com).
3. Taps "Confirm on WhatsApp", which opens a chat with the full order pre-typed.

## Google Sheets + email
Follow the steps at the top of `apps-script/Code.gs`, then paste the Web app URL into `ORDER_ENDPOINT` in `src/config.js`.

## Meta Pixel
Uncomment the pixel block in `index.html` and add the pixel ID. A `Lead` event fires on every order.

## Run locally
```
npm install
npm run dev
```

## Deploy
Import this repo into Vercel. Framework preset: Vite. No environment variables needed.
