Rada — Personalized AI tool advisor landing page built with Next.js 15 App Router, TypeScript, and Tailwind CSS.

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

Create a `.env.local` file in the project root with the following variables:

- `RESEND_API_KEY` (required): Your Resend API key for sending emails. Get it from [resend.com/api-keys](https://resend.com/api-keys)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional): your domain for Plausible analytics, e.g. `rada-ai.com`

Example `.env.local`:
```
RESEND_API_KEY=re_...
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rada-ai.com
```

## Features

### Quiz & Email Confirmation

The quiz/recommendation flow collects user preferences and sends confirmation emails.

**How it works:**
1. User clicks "Take the quiz" → navigates to `/get-recommendation`
2. User completes 6-step survey (goal, budget, experience, role, email, frustrations)
3. Survey data is:
   - Tracked in PostHog for analytics
   - User identified in PostHog by email
   - Confirmation email sent via Resend
4. Thank you page displays success message

**Email Functionality:**
- Uses [Resend](https://resend.com) for transactional emails
- React Email components for email templates
- Confirmation email includes survey responses summary
- Email template: `emails/SurveyConfirmation.tsx`
- API endpoint: `/api/send-survey-email`

**PostHog Analytics:**
- Survey ID: `019a2d07-fc22-0000-7161-744841e9b51c`
- Events tracked: `survey_started`, `survey_step_completed`, `survey_completed`
- User identification by email with profile properties
- PostHog project: `phc_N624DTPyp5Ugye6laWib2QZYIKXtkEE7bvvow52alMU`
- Host: `https://us.i.posthog.com`

## API routes

- `GET /api/health` → `{ status: "ok" }`
- `POST /api/send-survey-email` → Sends confirmation email via Resend

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import to Vercel.
3. Set environment variables in Vercel dashboard:
   - `RESEND_API_KEY` (required) - Get from [resend.com/api-keys](https://resend.com/api-keys)
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional) - Your domain for analytics
4. Deploy. Vercel will build automatically.

**Important for Resend:**
- Free tier: 3,000 emails/month, 100/day
- **Without domain verification:** Can only send test emails to your Resend account email
- **After domain verification:** Can send to any email address

**To verify your domain:**
1. Go to [resend.com/domains](https://resend.com/domains)
2. Click "Add Domain" and enter `rada-ai.com`
3. Add the provided DNS records to GoDaddy:
   - SPF record
   - DKIM records (usually 2-3 records)
4. Wait for verification (usually 5-15 minutes)
5. Update `.env.local`:
   ```
   RESEND_FROM_EMAIL=Rada <hello@rada-ai.com>
   ```
6. Restart dev server

After verification, emails will send from `hello@rada-ai.com` instead of `onboarding@resend.dev`

## A/B testing

All marketing components accept props for copy/links to facilitate simple experiments.
