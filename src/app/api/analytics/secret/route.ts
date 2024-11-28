import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { analyticsStore } from '@/lib/analytics';

const SECRET_TOKEN = process.env.ANALYTICS_SECRET_TOKEN;

export async function GET(req: Request) {
  const headersList = headers();
  const token = headersList.get('authorization')?.split(' ')[1];

  if (token !== SECRET_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stats = analyticsStore.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
} 