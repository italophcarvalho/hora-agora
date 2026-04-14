"use client";

import { useEffect, useMemo, useState } from "react";

type GlobalClockVariant = "bar" | "inline" | "hero";

interface GlobalClockProps {
  variant?: GlobalClockVariant;
}

interface ClockState {
  time: string;
  date: string;
  zone: string;
}

const initialState: ClockState = {
  time: "00:00:00",
  date: "",
  zone: "UTC",
};

export function GlobalClock({ variant = "bar" }: GlobalClockProps) {
  const [clock, setClock] = useState<ClockState>(initialState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

    const updateClock = () => {
      const now = new Date();
      setClock({
        time: now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone,
        }),
        date: now.toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone,
        }),
        zone: timeZone.replaceAll("_", " "),
      });
    };

    updateClock();
    const intervalId = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const content = useMemo(() => {
    if (!mounted) {
      return initialState;
    }

    return clock;
  }, [clock, mounted]);

  if (variant === "inline") {
    return (
      <span suppressHydrationWarning className="clock-inline">
        {content.time}
      </span>
    );
  }

  if (variant === "hero") {
    return (
      <span suppressHydrationWarning className="clock-hero">
        {content.time}
      </span>
    );
  }

  return (
    <div suppressHydrationWarning className="clock-bar" aria-live="polite">
      <div className="clock-meta">
        <span className="clock-dot" aria-hidden="true" />
        <strong className="clock-time">{content.time}</strong>
        <span className="clock-zone">{content.zone}</span>
      </div>
      <span className="clock-date">{content.date}</span>
    </div>
  );
}
