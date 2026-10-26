# GreenPanda Agro, December UK Campaign

Landing page for Nigerian foodstuff boxes shipped to the UK.

## Edit content
Everything (packages, prices, shipping times, certificates, WhatsApp number, deadline, FAQs) is in `src/config.js`.

## Order flow
1. Customer picks a package and air or sea shipping. Custom boxes go straight to WhatsApp.
2. Submits the order form (saved to Google Sheets, email sent to greenpandaagro@gmail.com).
3. Taps "Confirm on WhatsApp", which opens a chat with the full order pre-typed.

## Google Sheets + email
Follow the steps at the top of `apps-script/Code.gs`, then paste the Web app URL into `ORDER_ENDPOINT` in `src/config.js`.

## Meta Pixel and Conversions API
The Pixel (ID in `src/config.js`) is live. Events: PageView, ViewContent (packages seen), InitiateCheckout (package chosen), Lead (order submitted, with value), Contact (any WhatsApp tap).

The Conversions API function is at `api/meta-event.js`. It stays idle until you add `META_CAPI_TOKEN` in Vercel (Project > Settings > Environment Variables) and redeploy. Browser and server events share an event ID, so Meta counts each once.

## Run locally
```
npm install
npm run dev
```

## Deploy
Import this repo into Vercel. Framework preset: Vite. No environment variables needed.
