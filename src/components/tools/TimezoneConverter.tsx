"use client";

import { useEffect, useState } from "react";
import { timeZoneOptions } from "@/lib/site";

const fallbackOriginZone = "America/Sao_Paulo";
const fallbackTargetZone = "Europe/London";

export function TimezoneConverter() {
  const [originTimeZone, setOriginTimeZone] = useState(fallbackOriginZone);
  const [targetTimeZone, setTargetTimeZone] = useState(fallbackTargetZone);
  const [currentInstant, setCurrentInstant] = useState<Date | null>(null);

  useEffect(() => {
    const browserZone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || fallbackOriginZone;
    const originZone = hasTimeZone(browserZone) ? browserZone : fallbackOriginZone;
    const targetZone = getSuggestedTarget(originZone);

    setOriginTimeZone(originZone);
    setTargetTimeZone(targetZone);

    const syncClock = () => setCurrentInstant(new Date());

    syncClock();

    const intervalId = window.setInterval(syncClock, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const sourceDate = currentInstant ?? new Date("2026-04-14T12:00:00Z");
  const originTimeLabel = currentInstant
    ? formatTimeInZone(sourceDate, originTimeZone)
    : "--:--:--";
  const targetTimeLabel = currentInstant
    ? formatTimeInZone(sourceDate, targetTimeZone)
    : "--:--:--";
  const originDateLabel = currentInstant
    ? formatDateInZone(sourceDate, originTimeZone)
    : "Carregando horario local";
  const targetDateLabel = currentInstant
    ? formatDateInZone(sourceDate, targetTimeZone)
    : "Carregando horario local";
  const originOffset = getOffsetLabel(sourceDate, originTimeZone);
  const targetOffset = getOffsetLabel(sourceDate, targetTimeZone);
  const differenceLabel = getDifferenceLabel(
    sourceDate,
    originTimeZone,
    targetTimeZone,
  );

  return (
    <section className="calculator-card timezone-card timezone-card-hero">
      <div className="timezone-card-header">
        <p className="page-kicker">Agora entre fusos</p>
        <h2>Conversor de fuso</h2>
        <p className="calculator-intro">
          Compare o horario deste instante entre duas cidades relevantes e veja
          a diferenca real entre os fusos, incluindo ajustes sazonais quando
          existirem.
        </p>
      </div>

      <div className="timezone-grid timezone-grid-hero">
        <label className="timezone-field">
          Cidade ou fuso de origem
          <select
            value={originTimeZone}
            onChange={(event) => setOriginTimeZone(event.target.value)}
          >
            {timeZoneOptions.map((option) => (
              <option key={option.timeZone} value={option.timeZone}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="timezone-field">
          Cidade ou fuso de destino
          <select
            value={targetTimeZone}
            onChange={(event) => setTargetTimeZone(event.target.value)}
          >
            {timeZoneOptions.map((option) => (
              <option key={option.timeZone} value={option.timeZone}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="timezone-summary">
        <span>{differenceLabel}</span>
        <button
          type="button"
          className="timezone-swap"
          onClick={() => {
            const nextOrigin = targetTimeZone;
            const nextTarget = originTimeZone;

            setOriginTimeZone(nextOrigin);
            setTargetTimeZone(nextTarget);
          }}
        >
          Inverter fusos
        </button>
      </div>

      <div className="calculator-results timezone-results timezone-results-hero">
        <article className="calculator-result-card timezone-result-card">
          <span>Origem</span>
          <strong>{getZoneLabel(originTimeZone)}</strong>
          <p>{originTimeLabel}</p>
          <small>{originDateLabel}</small>
          <small>{originOffset}</small>
        </article>

        <article className="calculator-result-card timezone-result-card">
          <span>Destino</span>
          <strong>{getZoneLabel(targetTimeZone)}</strong>
          <p>{targetTimeLabel}</p>
          <small>{targetDateLabel}</small>
          <small>{targetOffset}</small>
        </article>

        <article className="calculator-result-card timezone-result-card">
          <span>Diferenca</span>
          <strong>{differenceLabel}</strong>
          <p>
            {getZoneLabel(targetTimeZone)} em relacao a{" "}
            {getZoneLabel(originTimeZone)} neste momento.
          </p>
          <small>Atualizacao automatica em tempo real.</small>
        </article>
      </div>
    </section>
  );
}

function hasTimeZone(timeZone: string) {
  return timeZoneOptions.some((option) => option.timeZone === timeZone);
}

function getSuggestedTarget(originTimeZone: string) {
  if (originTimeZone === fallbackTargetZone) {
    return fallbackOriginZone;
  }

  return fallbackTargetZone;
}

function getZoneLabel(timeZone: string) {
  const option = timeZoneOptions.find((item) => item.timeZone === timeZone);
  return option?.label ?? timeZone;
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
  })
    .format(date)
    .replace("-feira", "-feira");
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

  return `${sign}${hours}h${pad(minutes)}`;
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

function pad(value: number) {
  return String(value).padStart(2, "0");
}
