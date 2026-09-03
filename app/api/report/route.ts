import { NextResponse } from 'next/server';
import { generateDailyReport } from '@/lib/report-service';

export async function GET() {
  const report = await generateDailyReport();
  return NextResponse.json(report);
}
