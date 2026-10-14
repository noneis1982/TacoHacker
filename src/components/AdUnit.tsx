"use client";

import { useEffect } from "react";

// Your AdSense publisher ID, e.g. "ca-pub-1234567890123456".
// Set as an environment variable on Replit once your AdSense account is approved.
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

type AdUnitProps = {
  /** AdSense ad slot ID (created in your AdSense dashboard per ad placement). */
  slot?: string;
  /** Ad format. Defaults to responsive "auto". */
  format?: string;
  className?: string;
};

/**
 * Renders a Google AdSense ad unit.
 *
 * Renders nothing until BOTH the publisher client ID
 * (NEXT_PUBLIC_ADSENSE_CLIENT) and a slot ID are configured — so the app shows
 * no empty ad boxes or errors before AdSense is approved and set up.
 */
export function AdUnit({ slot, format = "auto", className }: AdUnitProps) {
  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot) return;
    try {
      // adsbygoogle is injected by the AdSense script loaded in layout.tsx.
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle ||
        []).push({});
    } catch {
      // Script not ready yet or blocked by an ad blocker — safe to ignore.
    }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) return null;

  return (
    <ins
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
