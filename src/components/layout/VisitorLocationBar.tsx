"use client";

import { useEffect, useMemo, useState } from "react";
import { timeZoneOptions } from "@/lib/site";

type VisitorContext = {
  city: string;
  country: string;
  timeZone: string;
  isPrecise?: boolean;
};

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
  "Europe/Brussels": "BE",
  "Europe/Rome": "IT",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Mexico_City": "MX",
  "America/Bogota": "CO",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Santiago": "CL",
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Asia/Shanghai": "CN",
  "Asia/Dubai": "AE",
  "Australia/Sydney": "AU",
};

const defaultContext: VisitorContext = {
  city: "Sua regiao",
  country: "Brasil",
  timeZone: "America/Sao_Paulo",
};
const storageKey = "hora-agora-visitor-context";

export function VisitorLocationBar() {
  const [context, setContext] = useState<VisitorContext>(defaultContext);
  const [clock, setClock] = useState({
    time: "--:--:--",
    date: "Data local",
  });
  const [locationState, setLocationState] = useState<
    "idle" | "loading" | "unavailable"
  >("idle");

  useEffect(() => {
    let cancelled = false;

    const fallback = resolveContextFromBrowser();
    setContext(fallback);

    const loadContext = async () => {
      try {
        const response = await fetch("/api/visitor-context", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as {
          city?: string;
          countryCode?: string;
          timeZone?: string;
        };

        if (cancelled) {
          return;
        }

        const resolvedTimeZone = payload.timeZone || fallback.timeZone;
        const resolvedCountryCode =
          payload.countryCode || getCountryCodeFromTimeZone(resolvedTimeZone);

        setContext({
          city: payload.city || getCityFromTimeZone(resolvedTimeZone),
          country: getCountryName(resolvedCountryCode),
          timeZone: resolvedTimeZone,
          isPrecise: false,
        });
      } catch {}
    };

    void loadContext();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationState("unavailable");
      return;
    }

    const permissionsApi = navigator.permissions;

    if (!permissionsApi?.query) {
      void requestPreciseLocation();
      return;
    }

    permissionsApi
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "denied") {
          setLocationState("unavailable");
          return;
        }

        if (result.state === "granted" || result.state === "prompt") {
          void requestPreciseLocation();
          return;
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock({
        time: now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: context.timeZone,
        }),
        date: now
          .toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: context.timeZone,
          })
          .replaceAll(".", ""),
      });
    };

    updateClock();
    const intervalId = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(intervalId);
  }, [context.timeZone]);

  useEffect(() => {
    if (!context.city) {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(context));
      window.dispatchEvent(new CustomEvent("visitor-context-updated"));
    } catch {}
  }, [context]);

  const locationLabel = useMemo(() => {
    if (context.city && context.country) {
      return `${context.city}, ${context.country}`;
    }

    if (context.city) {
      return context.city;
    }

    return context.country || "Sua regiao";
  }, [context.city, context.country]);

  async function requestPreciseLocation() {
    if (!("geolocation" in navigator)) {
      setLocationState("unavailable");
      return;
    }

    setLocationState("loading");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const params = new URLSearchParams({
            lat: String(position.coords.latitude),
            lon: String(position.coords.longitude),
          });

          const response = await fetch(`/api/reverse-geocode?${params}`, {
            cache: "no-store",
          });

          if (!response.ok) {
            setLocationState("idle");
            return;
          }

          const payload = (await response.json()) as {
            city?: string;
            stateCode?: string;
            country?: string;
          };

          const timeZone =
            Intl.DateTimeFormat().resolvedOptions().timeZone ||
            context.timeZone ||
            defaultContext.timeZone;

          setContext((current) => ({
            city:
              formatPreciseCityLabel(payload.city ?? "", payload.stateCode ?? "") ||
              current.city,
            country: payload.country || current.country,
            timeZone,
            isPrecise: true,
          }));
          setLocationState("idle");
        } catch {
          setLocationState("idle");
        }
      },
      () => {
        setLocationState("unavailable");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }

  return (
    <div className="precision-meta" aria-live="polite">
      <span suppressHydrationWarning className="precision-country">
        {locationLabel}
      </span>
      <span suppressHydrationWarning className="precision-date">
        {clock.date}
      </span>
      <span suppressHydrationWarning className="clock-inline">
        {clock.time}
      </span>
    </div>
  );
}

function resolveContextFromBrowser(): VisitorContext {
  const timeZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone ||
    defaultContext.timeZone;
  const countryCode = resolveRegionFromBrowser(timeZone);

  return {
    city: getCityFromTimeZone(timeZone),
    country: getCountryName(countryCode),
    timeZone,
  };
}

function resolveRegionFromBrowser(timeZone: string) {
  const [primaryLanguage] = navigator.languages ?? [navigator.language];

  if (primaryLanguage) {
    try {
      const region = new Intl.Locale(primaryLanguage).maximize().region;

      if (region) {
        return region;
      }
    } catch {}
  }

  return getCountryCodeFromTimeZone(timeZone);
}

function getCountryCodeFromTimeZone(timeZone: string) {
  return timeZoneCountryMap[timeZone] ?? "BR";
}

function getCountryName(countryCode: string) {
  try {
    const display = new Intl.DisplayNames(["pt-BR"], { type: "region" });
    return display.of(countryCode) ?? "Brasil";
  } catch {
    return "Brasil";
  }
}

function getCityFromTimeZone(timeZone: string) {
  const option = timeZoneOptions.find((item) => item.timeZone === timeZone);

  if (option) {
    return option.label;
  }

  const zoneParts = timeZone.split("/");
  const rawCity = zoneParts[zoneParts.length - 1] ?? "Sua regiao";

  return rawCity.replaceAll("_", " ");
}

function formatPreciseCityLabel(city: string, stateCode: string) {
  if (!city) {
    return "";
  }

  if (!stateCode) {
    return city;
  }

  return `${city} - ${stateCode}`;
}
