"use client";

import { useEffect, useState } from "react";

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
  time: "--:--:--",
  date: "",
  zone: "UTC",
};

export function GlobalClock({ variant = "bar" }: GlobalClockProps) {
  const [clock, setClock] = useState<ClockState>(initialState);

  useEffect(() => {
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

  if (variant === "inline") {
    return (
      <span suppressHydrationWarning className="clock-inline">
        {clock.time}
      </span>
    );
  }

  if (variant === "hero") {
    const [hours = "00", minutes = "00", seconds = "00"] =
      clock.time.split(":");

    return (
      <span suppressHydrationWarning className="clock-hero">
        <span className="clock-major">
          {hours}:{minutes}
        </span>
        <span className="clock-minor">{seconds}</span>
      </span>
    );
  }

  return (
    <div suppressHydrationWarning className="clock-bar" aria-live="polite">
      <div className="clock-meta">
        <span className="clock-dot" aria-hidden="true" />
        <strong className="clock-time">{clock.time}</strong>
        <span className="clock-zone">{clock.zone}</span>
      </div>
      <span className="clock-date">{clock.date || "Data local"}</span>
    </div>
  );
}
