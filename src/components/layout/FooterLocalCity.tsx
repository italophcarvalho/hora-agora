"use client";

import { useEffect, useState } from "react";
import { timeZoneOptions } from "@/lib/site";

const storageKey = "hora-agora-visitor-context";

type StoredVisitorContext = {
  city?: string;
  country?: string;
  timeZone?: string;
  isPrecise?: boolean;
};

const timeZoneCityMap = new Map(
  timeZoneOptions.map((option) => [option.timeZone, option.label]),
);

export function FooterLocalCity() {
  const [city, setCity] = useState("Sua regiao");

  useEffect(() => {
    const applyStoredContext = () => {
      const stored = readStoredContext();

      if (stored?.city) {
        setCity(stored.city);
        return;
      }

      const browserZone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Sao_Paulo";
      setCity(getCityFromTimeZone(browserZone));
    };

    applyStoredContext();

    const handleContextUpdate = () => {
      applyStoredContext();
    };

    window.addEventListener("visitor-context-updated", handleContextUpdate);

    return () => {
      window.removeEventListener("visitor-context-updated", handleContextUpdate);
    };
  }, []);

  return (
    <span suppressHydrationWarning className="footer-clock-label">
      {city.toUpperCase()} AO VIVO
    </span>
  );
}

function readStoredContext() {
  try {
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as StoredVisitorContext;
  } catch {
    return null;
  }
}

function getCityFromTimeZone(timeZone: string) {
  const mapped = timeZoneCityMap.get(timeZone);

  if (mapped) {
    return mapped;
  }

  const zoneParts = timeZone.split("/");
  const rawCity = zoneParts[zoneParts.length - 1] ?? "Sua regiao";

  return rawCity.replaceAll("_", " ");
}
