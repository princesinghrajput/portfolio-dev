import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { analyticsStore } from '@/lib/analytics';

export async function POST(req: Request) {
  try {
    const { type, path } = await req.json();
    const cookieStore = cookies();
    const visitorId = cookieStore.get('visitor_id')?.value || crypto.randomUUID();

    analyticsStore.addViewer(visitorId);
    analyticsStore.incrementPageView(path);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track analytics' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stats = analyticsStore.getStats();
    return NextResponse.json({ 
      activeViewers: stats.activeViewers 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
} 