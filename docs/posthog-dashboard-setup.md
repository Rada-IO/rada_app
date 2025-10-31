# PostHog Quiz Dashboard Setup Guide

## Dashboard Name: "Quiz Results Report"

### Insight 1: Total Responses
- **Type:** Trends
- **Event:** `survey_completed`
- **Visualization:** Number
- **Name:** "Total Quiz Completions"

### Insight 2: Completion Rate
- **Type:** Funnel
- **Steps:**
  1. `survey_started`
  2. `survey_completed`
- **Name:** "Quiz Completion Rate"

### Insight 3: Goals Breakdown
- **Type:** Trends
- **Event:** `survey_completed`
- **Breakdown by:** `main_goal`
- **Visualization:** Bar chart
- **Name:** "Popular Use Cases"

### Insight 4: Budget Distribution
- **Type:** Trends
- **Event:** `survey_completed`
- **Breakdown by:** `budget`
- **Visualization:** Pie chart
- **Name:** "Budget Tiers"

### Insight 5: Experience Levels
- **Type:** Trends
- **Event:** `survey_completed`
- **Breakdown by:** `experience`
- **Visualization:** Bar chart
- **Name:** "AI Experience Levels"

### Insight 6: Roles Distribution
- **Type:** Trends
- **Event:** `survey_completed`
- **Breakdown by:** `role`
- **Visualization:** Pie chart
- **Name:** "User Roles"

### Insight 7: Top Frustrations
- **Type:** Trends
- **Event:** `survey_completed`
- **Breakdown by:** `frustrations`
- **Visualization:** Bar chart
- **Name:** "Common Pain Points"

### Insight 8: Responses Over Time
- **Type:** Trends
- **Event:** `survey_completed`
- **Visualization:** Line graph
- **Interval:** Daily
- **Name:** "Quiz Submissions Timeline"

### Insight 9: Step-by-Step Drop-off
- **Type:** Trends
- **Event:** `survey_step_completed`
- **Breakdown by:** `step_name`
- **Visualization:** Bar chart
- **Name:** "Question Completion Rates"

## Sharing the Dashboard

1. Click **Share** button in top right
2. Options:
   - **View-only link** - Share with team members
   - **Embed** - Embed in another app
   - **Export PDF** - Download as PDF report

## Scheduling Reports

1. Click **Subscriptions** in dashboard
2. Set frequency: Daily, Weekly, Monthly
3. Add email recipients
4. PostHog will email the dashboard automatically
