"use client";

import { useEffect, useState } from "react";

const timeZoneCountryMap: Record<string, string> = {
  "America/Sao_Paulo": "BR",
  "America/Rio_Branco": "BR",
  "America/Manaus": "BR",
  "America/Recife": "BR",
  "Europe/Lisbon": "PT",
  "Europe/London": "GB",
  "Europe/Madrid": "ES",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Rome": "IT",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Mexico_City": "MX",
  "America/Buenos_Aires": "AR",
  "America/Santiago": "CL",
  "America/Bogota": "CO",
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Asia/Shanghai": "CN",
};

function resolveRegionFromBrowser() {
  const [primaryLanguage] = navigator.languages ?? [navigator.language];

  if (primaryLanguage) {
    try {
      const region = new Intl.Locale(primaryLanguage).maximize().region;

      if (region) {
        return region;
      }
    } catch {}
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timeZone && timeZoneCountryMap[timeZone]) {
    return timeZoneCountryMap[timeZone];
  }

  return "BR";
}

export function BrowserCountry() {
  const [country, setCountry] = useState("");

  useEffect(() => {
    const region = resolveRegionFromBrowser();

    try {
      const display = new Intl.DisplayNames(["pt-BR"], { type: "region" });
      setCountry(display.of(region) ?? "Brasil");
    } catch {
      setCountry("Brasil");
    }
  }, []);

  return (
    <span suppressHydrationWarning className="precision-country">
      {country || "Pais"}
    </span>
  );
}

export function BrowserDate() {
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      const formatted = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone,
      });

      setDateLabel(formatted.replaceAll(".", ""));
    };

    updateDate();
    const intervalId = window.setInterval(updateDate, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <span suppressHydrationWarning className="precision-date">
      {dateLabel || "Data local"}
    </span>
  );
}
