"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  className?: string;
}

export function AdSlot({ slot, className }: AdSlotProps) {
  const adsEnabled =
    process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" &&
    Boolean(process.env.NEXT_PUBLIC_ADSENSE_ID);

  useEffect(() => {
    if (!adsEnabled) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Keep the page stable if the AdSense script has not loaded yet.
    }
  }, [adsEnabled]);

  if (!adsEnabled) {
    if (process.env.NODE_ENV === "development") {
      return <div className={`ad-placeholder ${className ?? ""}`}>Ad placeholder {slot}</div>;
    }

    return null;
  }

  return (
    <ins
      className={`adsbygoogle ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
