# THRIFTEE Storefront

Premium dark-theme e-commerce frontend for **THRIFTEE** (Curated Vintage & Boxy Streetwear).

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Environment variables

Create `.env.local` if you want live email notifications:

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=orders@yourdomain.com
```

If `RESEND_API_KEY` is missing, order email sending is simulated so checkout flow still works.
