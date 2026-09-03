const fs = require('fs');
const path = require('path');

function generateDailyReport() {
  const payload = {
    totalUsers: 284,
    totalListings: 122,
    premiumConversions: 36,
    summary:
      'Today’s report shows 284 new users, 122 listings created, and 36 premium conversions. Traffic remains strong, but conversion rates are lower than expected. Listings with stronger photos and clearer descriptions continue to outperform. We recommend highlighting the Premium plan to improve image quality and adding a time-sensitive discount prompt during first visits.',
    recommendations: [
      'Traffic is high but conversions are low; consider adding a discount popup.',
      'Users are uploading blurry images; push AI enhancement more aggressively.',
      'Focus on premium placement and better listing photography to lift conversion quality.',
    ],
  };

  const text = [
    'Daily Summary Report',
    '====================',
    `Total new users: ${payload.totalUsers}`,
    `Total listings created: ${payload.totalListings}`,
    `Premium conversions: ${payload.premiumConversions}`,
    '',
    payload.summary,
    '',
    'Recommendations:',
    ...payload.recommendations.map((item) => `- ${item}`),
  ].join('\n');

  const filePath = path.join(process.cwd(), 'daily-report.log');
  fs.writeFileSync(filePath, `${text}\n`, 'utf8');
  console.log(`Daily report written to ${filePath}`);
}

generateDailyReport();
