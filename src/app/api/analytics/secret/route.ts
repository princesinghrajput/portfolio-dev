import { NextResponse } from 'next/server';
import { analyticsStore } from '@/lib/analytics';

export async function GET() {
  try {
    const stats = analyticsStore.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
} 