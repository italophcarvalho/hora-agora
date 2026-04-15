"use client";

import { useEffect, useState } from "react";

const worldHubs = [
  {
    rank: "01",
    city: "Nova York",
    timeZone: "America/New_York",
    note: "Mercado financeiro, midia global e decisao corporativa.",
  },
  {
    rank: "02",
    city: "Londres",
    timeZone: "Europe/London",
    note: "Ponte entre America e Europa em financas e diplomacia.",
  },
  {
    rank: "03",
    city: "Pequim",
    timeZone: "Asia/Shanghai",
    note: "Centro politico da China e eixo industrial estrategico.",
  },
  {
    rank: "04",
    city: "Bruxelas",
    timeZone: "Europe/Brussels",
    note: "Capital politica da Uniao Europeia e da OTAN.",
  },
  {
    rank: "05",
    city: "Toquio",
    timeZone: "Asia/Tokyo",
    note: "Polo tecnologico e financeiro central do leste asiatico.",
  },
  {
    rank: "06",
    city: "Dubai",
    timeZone: "Asia/Dubai",
    note: "Hub logistico, energetico e financeiro entre regioes.",
  },
];

export function WorldHubTimes() {
  const [currentInstant, setCurrentInstant] = useState<Date | null>(null);

  useEffect(() => {
    const syncClock = () => setCurrentInstant(new Date());

    syncClock();

    const intervalId = window.setInterval(syncClock, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="hub-grid">
      {worldHubs.map((hub) => (
        <article key={hub.timeZone} className="hub-card">
          <span className="hub-rank">{hub.rank}</span>
          <h3>{hub.city}</h3>
          <strong className="hub-time">
            {currentInstant ? formatHubTime(currentInstant, hub.timeZone) : "--:--"}
          </strong>
          <p>{hub.note}</p>
        </article>
      ))}
    </div>
  );
}

function formatHubTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}
