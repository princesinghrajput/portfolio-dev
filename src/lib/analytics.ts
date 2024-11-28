// Create a simple in-memory store
class AnalyticsStore {
  private static instance: AnalyticsStore;
  private activeViewers: Map<string, number>;
  private pageViews: Map<string, number>;
  private lastCleanup: number;

  private constructor() {
    this.activeViewers = new Map();
    this.pageViews = new Map();
    this.lastCleanup = Date.now();
  }

  public static getInstance(): AnalyticsStore {
    if (!AnalyticsStore.instance) {
      AnalyticsStore.instance = new AnalyticsStore();
    }
    return AnalyticsStore.instance;
  }

  public addViewer(id: string): void {
    this.activeViewers.set(id, Date.now());
    this.cleanup();
  }

  public incrementPageView(path: string): void {
    const currentViews = this.pageViews.get(path) || 0;
    this.pageViews.set(path, currentViews + 1);
  }

  public getActiveViewerCount(): number {
    this.cleanup();
    return this.activeViewers.size;
  }

  public getStats() {
    return {
      activeViewers: this.getActiveViewerCount(),
      pageViews: Object.fromEntries(this.pageViews),
    };
  }

  private cleanup(): void {
    const now = Date.now();
    // Only cleanup every 30 seconds
    if (now - this.lastCleanup < 30000) return;

    const fiveMinutesAgo = now - 5 * 60 * 1000;
    for (const [id, timestamp] of this.activeViewers) {
      if (timestamp < fiveMinutesAgo) {
        this.activeViewers.delete(id);
      }
    }
    this.lastCleanup = now;
  }
}

export const analyticsStore = AnalyticsStore.getInstance(); 