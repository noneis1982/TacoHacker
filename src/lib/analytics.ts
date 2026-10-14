type AnalyticsData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: {
      track(name: string, data?: AnalyticsData): void | Promise<unknown>;
    };
  }
}

export function trackEvent(name: string, data?: AnalyticsData): void {
  if (typeof window === "undefined") return;

  try {
    const pending = window.umami?.track(name, data);
    if (pending) void Promise.resolve(pending).catch(() => {});
  } catch {
    // Analytics must never interrupt the user's workflow.
  }
}
