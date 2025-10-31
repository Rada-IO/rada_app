# Survey Report Generator

Generate automated reports from PostHog quiz data.

## Setup

1. **Get PostHog API credentials:**
   - Go to https://us.posthog.com/settings/project
   - Copy your **Project ID**
   - Go to https://us.posthog.com/settings/user-api-keys
   - Create new API key with `event:read` permission

2. **Install dependencies:**
   ```bash
   npm install node-fetch
   ```

3. **Set environment variables:**
   ```bash
   export POSTHOG_PROJECT_ID="your_project_id"
   export POSTHOG_API_KEY="your_api_key"
   ```

   Or create a `.env` file:
   ```
   POSTHOG_PROJECT_ID=12345
   POSTHOG_API_KEY=phx_...
   ```

## Usage

Generate a report:

```bash
node scripts/generate-survey-report.js
```

This will:
- Fetch all `survey_completed` events from PostHog
- Analyze the data
- Print report to console
- Save JSON summary to `survey-report.json`

## Example Output

```
=== QUIZ SURVEY REPORT ===

Total Responses: 47

--- Top Goals ---
  Marketing content creation: 18 (38.3%)
  Coding / Development: 12 (25.5%)
  Writing / Copywriting: 8 (17.0%)
  Design / Visual assets: 5 (10.6%)
  Productivity & Workflow Automation: 4 (8.5%)

--- Budget Distribution ---
  <$20 / month — Small solo budget: 22 (46.8%)
  Free — I only want free tools: 15 (31.9%)
  $20–$100 / month — Willing to invest: 8 (17.0%)
  $100+ / month — Professional or team: 2 (4.3%)

--- Experience Levels ---
  Intermediate: 25 (53.2%)
  Beginner: 16 (34.0%)
  Advanced: 6 (12.8%)

--- User Roles ---
  Founder / Entrepreneur: 20 (42.6%)
  Marketer / Growth professional: 12 (25.5%)
  Developer / Engineer: 10 (21.3%)
  Designer / Creative: 3 (6.4%)
  Other: 2 (4.3%)

--- Responses Over Time ---
  2025-10-28: 5
  2025-10-29: 18
  2025-10-30: 24
=========================
```

## Customization

Edit `generate-survey-report.js` to:
- Add more analysis
- Export to CSV instead of JSON
- Send report via email
- Upload to Google Sheets
- Generate charts/graphs
