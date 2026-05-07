type FbqFn = (
  command: "track" | "trackCustom" | "init",
  eventOrPixelId: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

export const generateEventId = (prefix = "evt"): string => {
  const rand = Math.random().toString(36).slice(2, 9);
  return `${prefix}_${Date.now()}_${rand}`;
};

const isFbqReady = (): boolean =>
  typeof window !== "undefined" && typeof window.fbq === "function";

export const trackPageView = (): void => {
  if (!isFbqReady()) return;
  window.fbq!("track", "PageView");
};

export const trackStandardEvent = (
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
): void => {
  if (!isFbqReady()) return;
  const eventID = options?.eventID ?? generateEventId(eventName);
  window.fbq!("track", eventName, params ?? {}, { eventID });
};

export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
): void => {
  if (!isFbqReady()) return;
  const eventID = options?.eventID ?? generateEventId(eventName);
  window.fbq!("trackCustom", eventName, params ?? {}, { eventID });
};