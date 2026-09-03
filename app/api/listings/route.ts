import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    listings: [
      {
        id: 'listing-1',
        title: 'Modern Apartment',
        price: 350000,
        location: 'Kuala Lumpur',
        isPremium: false,
      },
      {
        id: 'listing-2',
        title: 'Premium City Villa',
        price: 920000,
        location: 'Johor Bahru',
        isPremium: true,
      },
    ],
  });
}
