import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Premium subscription stub created. Replace with real billing logic later.',
  });
}
