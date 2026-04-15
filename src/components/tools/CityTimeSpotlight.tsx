"use client";

import { useEffect, useState } from "react";

type CityTimeSpotlightProps = {
  city: string;
  country: string;
  timeZone: string;
  marketRole: string;
};

const referenceZone = "America/Sao_Paulo";

export function CityTimeSpotlight({
  city,
  country,
  timeZone,
  marketRole,
}: CityTimeSpotlightProps) {
  const [currentInstant, setCurrentInstant] = useState<Date | null>(null);

  useEffect(() => {
    const syncClock = () => setCurrentInstant(new Date());

    syncClock();

    const intervalId = window.setInterval(syncClock, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const sourceDate = currentInstant ?? new Date("2026-04-15T12:00:00Z");
  const currentTime = currentInstant
    ? formatTimeInZone(sourceDate, timeZone)
    : "--:--:--";
  const currentDate = currentInstant
    ? formatDateInZone(sourceDate, timeZone)
    : "Carregando horario local";
  const offsetLabel = getOffsetLabel(sourceDate, timeZone);
  const brazilComparison = getDifferenceLabel(
    sourceDate,
    referenceZone,
    timeZone,
  );
  const utcComparison = getDifferenceLabel(sourceDate, "UTC", timeZone);

  return (
    <section className="city-time-hero">
      <div className="shell-width city-time-shell">
        <div className="city-time-stage">
          <p className="page-kicker">Hora em {city}</p>
          <h1>{city}</h1>
          <p className="city-time-subtitle">
            {country} · {marketRole}
          </p>

          <div className="city-clock-card">
            <strong className="city-clock-time">{currentTime}</strong>
            <p className="city-clock-date">{currentDate}</p>
            <div className="city-clock-meta">
              <span>{offsetLabel}</span>
              <span>{country}</span>
            </div>
          </div>
        </div>

        <div className="city-info-panel">
          <article className="city-info-card">
            <span className="tool-card-meta">Comparativo Brasil</span>
            <strong>{brazilComparison}</strong>
            <p>{city} em relacao a Sao Paulo neste momento.</p>
          </article>

          <article className="city-info-card">
            <span className="tool-card-meta">Comparativo UTC</span>
            <strong>{utcComparison}</strong>
            <p>Diferenca atual em relacao ao horario universal coordenado.</p>
          </article>

          <article className="city-info-card">
            <span className="tool-card-meta">Leitura operacional</span>
            <p>{marketRole}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function formatTimeInZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

function formatDateInZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getOffsetLabel(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT";
}

function getDifferenceLabel(date: Date, originTimeZone: string, targetTimeZone: string) {
  const originOffset = parseOffsetMinutes(getOffsetLabel(date, originTimeZone));
  const targetOffset = parseOffsetMinutes(getOffsetLabel(date, targetTimeZone));
  const diffMinutes = targetOffset - originOffset;

  if (diffMinutes === 0) {
    return "Mesmo horario";
  }

  const sign = diffMinutes > 0 ? "+" : "-";
  const absoluteMinutes = Math.abs(diffMinutes);
  const hours = Math.floor(absoluteMinutes / 60);
  const minutes = absoluteMinutes % 60;

  if (minutes === 0) {
    return `${sign}${hours}h`;
  }

  return `${sign}${hours}h${String(minutes).padStart(2, "0")}`;
}

function parseOffsetMinutes(offsetLabel: string) {
  const normalized = offsetLabel.replace("UTC", "GMT");

  if (normalized === "GMT") {
    return 0;
  }

  const match = normalized.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);

  if (!match) {
    return 0;
  }

  const [, sign, hours, minutes = "00"] = match;
  const total = Number(hours) * 60 + Number(minutes);

  return sign === "-" ? -total : total;
}
