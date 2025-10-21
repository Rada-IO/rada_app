Rada — Personalized AI tool advisor landing page built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

- dev: start dev server
- build: production build
- start: run production server
- lint: run ESLint
- type-check: run TypeScript

## Environment variables

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional): your domain for Plausible analytics, e.g. `rada.example.com`.

## API routes

- `GET /api/health` → `{ status: "ok" }`
- `POST /api/lead` → accepts `{ email, useCase, budget, experience, vendor? }`
  - Server-side validation and basic rate limiting included (in-memory)
  - Logs payload to server console. Integrate later with MailerLite/ConvertKit or Sheets/Airtable.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import to Vercel and set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` if using analytics.
3. Deploy. Vercel will build automatically.

## A/B testing

All marketing components accept props for copy/links to facilitate simple experiments.
