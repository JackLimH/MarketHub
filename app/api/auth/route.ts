import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    message: 'Auth stub ready. Replace with real OAuth flow later.',
    providers: ['Google', 'Facebook', 'Microsoft'],
  });
}
