export type ReportSummary = {
  totalUsers: number;
  totalListings: number;
  premiumConversions: number;
  summary: string;
  recommendations: string[];
};

export async function generateDailyReport(): Promise<ReportSummary> {
  const data = {
    totalUsers: 284,
    totalListings: 122,
    premiumConversions: 36,
  };

  const summary = `Today’s report shows ${data.totalUsers} new users, ${data.totalListings} listings created, and ${data.premiumConversions} premium conversions. Traffic is healthy overall, but conversion rates are below target compared to engagement. Listings with clearer photography and better property descriptions are receiving stronger interest. We recommend promoting AI-enhanced images and reducing friction in the listing creation flow.`;

  return {
    totalUsers: data.totalUsers,
    totalListings: data.totalListings,
    premiumConversions: data.premiumConversions,
    summary,
    recommendations: [
      'Traffic is high but conversions are low; consider a discount popup for first-time buyers.',
      'Users are uploading blurry images; push the AI enhancement feature more aggressively.',
      'Highlight premium listings in the dashboard to improve conversion quality.',
    ],
  };
}
