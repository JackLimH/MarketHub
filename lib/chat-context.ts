export type ChatContextState = {
  user: {
    preferences: Record<string, string | number>;
    viewedListings: string[];
    isPremium: boolean;
  };
};

export const chatContextDefaultState: ChatContextState = {
  user: {
    preferences: { propertyType: 'apartment', budget: 350000 },
    viewedListings: ['listing-1', 'listing-2', 'listing-3'],
    isPremium: false,
  },
};

export async function getChatRecommendations(): Promise<{
  summary: string;
  recommendations: string[];
  upsell?: string;
}> {
  const state = chatContextDefaultState;

  if (state.user.viewedListings.length >= 5) {
    return {
      summary: 'You viewed 5+ listings in this session. Premium unlocks AI-enhanced photos and higher placement.',
      recommendations: ['Luxury condo with city view', 'Premium family villa', 'Smart investment starter home'],
      upsell: 'Upgrade to Premium to see sharper images and better property discovery.',
    };
  }

  return {
    summary: 'You viewed 3 modern apartments, here are some similar premium listings.',
    recommendations: ['Modern loft apartment', 'Premium city condo', 'Waterfront apartment'],
  };
}
