import { NextResponse } from 'next/server';
import { getChatRecommendations } from '@/lib/chat-context';

export async function POST(request: Request) {
  const body = await request.json();
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  const result = await getChatRecommendations();

  return NextResponse.json({
    message: `You asked: ${message}`,
    data: result,
    status: 'stubbed',
  });
}
