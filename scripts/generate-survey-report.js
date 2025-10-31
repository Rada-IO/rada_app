/**
 * Generate Survey Report from PostHog
 *
 * Prerequisites:
 * 1. Get your PostHog Project ID and API key from https://us.posthog.com/settings/project
 * 2. Install dependencies: npm install node-fetch
 * 3. Set environment variables: POSTHOG_PROJECT_ID and POSTHOG_API_KEY
 * 4. Run: node scripts/generate-survey-report.js
 */

const fetch = require('node-fetch');

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_HOST = 'https://us.i.posthog.com';

async function fetchSurveyResults() {
  const response = await fetch(
    `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/events?event=survey_completed`,
    {
      headers: {
        'Authorization': `Bearer ${POSTHOG_API_KEY}`,
      },
    }
  );

  const data = await response.json();
  return data.results;
}

function analyzeSurveyData(events) {
  const report = {
    totalResponses: events.length,
    goals: {},
    budgets: {},
    experienceLevels: {},
    roles: {},
    frustrations: {},
    responsesByDate: {},
  };

  events.forEach(event => {
    const props = event.properties;

    // Count goals
    const goal = props.main_goal;
    report.goals[goal] = (report.goals[goal] || 0) + 1;

    // Count budgets
    const budget = props.budget;
    report.budgets[budget] = (report.budgets[budget] || 0) + 1;

    // Count experience levels
    const exp = props.experience;
    report.experienceLevels[exp] = (report.experienceLevels[exp] || 0) + 1;

    // Count roles
    const role = props.role;
    report.roles[role] = (report.roles[role] || 0) + 1;

    // Count frustrations
    if (props.frustrations && Array.isArray(props.frustrations)) {
      props.frustrations.forEach(f => {
        report.frustrations[f] = (report.frustrations[f] || 0) + 1;
      });
    }

    // Group by date
    const date = event.timestamp.split('T')[0];
    report.responsesByDate[date] = (report.responsesByDate[date] || 0) + 1;
  });

  return report;
}

function printReport(report) {
  console.log('\n=== QUIZ SURVEY REPORT ===\n');

  console.log(`Total Responses: ${report.totalResponses}\n`);

  console.log('--- Top Goals ---');
  Object.entries(report.goals)
    .sort(([,a], [,b]) => b - a)
    .forEach(([goal, count]) => {
      const percentage = ((count / report.totalResponses) * 100).toFixed(1);
      console.log(`  ${goal}: ${count} (${percentage}%)`);
    });

  console.log('\n--- Budget Distribution ---');
  Object.entries(report.budgets)
    .sort(([,a], [,b]) => b - a)
    .forEach(([budget, count]) => {
      const percentage = ((count / report.totalResponses) * 100).toFixed(1);
      console.log(`  ${budget}: ${count} (${percentage}%)`);
    });

  console.log('\n--- Experience Levels ---');
  Object.entries(report.experienceLevels)
    .sort(([,a], [,b]) => b - a)
    .forEach(([exp, count]) => {
      const percentage = ((count / report.totalResponses) * 100).toFixed(1);
      console.log(`  ${exp}: ${count} (${percentage}%)`);
    });

  console.log('\n--- User Roles ---');
  Object.entries(report.roles)
    .sort(([,a], [,b]) => b - a)
    .forEach(([role, count]) => {
      const percentage = ((count / report.totalResponses) * 100).toFixed(1);
      console.log(`  ${role}: ${count} (${percentage}%)`);
    });

  console.log('\n--- Top Frustrations ---');
  Object.entries(report.frustrations)
    .sort(([,a], [,b]) => b - a)
    .forEach(([frustration, count]) => {
      console.log(`  ${frustration}: ${count}`);
    });

  console.log('\n--- Responses Over Time ---');
  Object.entries(report.responsesByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([date, count]) => {
      console.log(`  ${date}: ${count}`);
    });

  console.log('\n=========================\n');
}

async function generateReport() {
  try {
    console.log('Fetching survey results from PostHog...');
    const events = await fetchSurveyResults();

    console.log('Analyzing data...');
    const report = analyzeSurveyData(events);

    printReport(report);

    // Optionally save to JSON file
    const fs = require('fs');
    fs.writeFileSync(
      'survey-report.json',
      JSON.stringify(report, null, 2)
    );
    console.log('Report saved to survey-report.json');

  } catch (error) {
    console.error('Error generating report:', error);
    process.exit(1);
  }
}

// Run the report
generateReport();
