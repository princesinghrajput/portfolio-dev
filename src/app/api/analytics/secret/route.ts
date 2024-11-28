import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { analyticsStore } from '@/lib/analytics';

const SECRET_TOKEN = process.env.ANALYTICS_SECRET_TOKEN || 'default_secret_token';

export async function GET(req: Request) {
  const headersList = headers();
  const token = headersList.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No authorization token provided' }, { status: 401 });
  }

  if (token !== SECRET_TOKEN) {
    return NextResponse.json({ error: 'Invalid authorization token' }, { status: 401 });
  }

  try {
    const stats = analyticsStore.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
} 