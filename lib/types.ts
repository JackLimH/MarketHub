export type UserProfile = {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  preferences: {
    budget?: number;
    location?: string;
    propertyType?: string;
  };
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  userId: string;
  isPremium: boolean;
};

export type ChatState = {
  user: {
    preferences: Record<string, string | number>;
    viewedListings: string[];
    isPremium: boolean;
  };
};
