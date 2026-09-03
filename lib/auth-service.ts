export type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    isPremium: boolean;
  };
};

export async function mockGoogleLogin(): Promise<AuthResponse> {
  return {
    token: 'mock-google-jwt-token',
    user: {
      id: 'user-google-1',
      email: 'user@gmail.com',
      name: 'Google User',
      isPremium: false,
    },
  };
}

export async function mockFacebookLogin(): Promise<AuthResponse> {
  return {
    token: 'mock-facebook-jwt-token',
    user: {
      id: 'user-facebook-1',
      email: 'user@facebook.com',
      name: 'Facebook User',
      isPremium: false,
    },
  };
}

export async function mockMicrosoftLogin(): Promise<AuthResponse> {
  return {
    token: 'mock-microsoft-jwt-token',
    user: {
      id: 'user-microsoft-1',
      email: 'user@microsoft.com',
      name: 'Microsoft User',
      isPremium: false,
    },
  };
}
