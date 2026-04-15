"use client";

import { useEffect, useState } from "react";

const tickerCities = [
  { name: "Sao Paulo", timeZone: "America/Sao_Paulo", market: "B3" },
  { name: "Nova York", timeZone: "America/New_York", market: "NYSE" },
  { name: "Londres", timeZone: "Europe/London", market: "LSE" },
  { name: "Frankfurt", timeZone: "Europe/Berlin", market: "XETRA" },
  { name: "Dubai", timeZone: "Asia/Dubai", market: "DFM" },
  { name: "Mumbai", timeZone: "Asia/Kolkata", market: "NSE" },
  { name: "Singapura", timeZone: "Asia/Singapore", market: "SGX" },
  { name: "Hong Kong", timeZone: "Asia/Hong_Kong", market: "HKEX" },
  { name: "Toquio", timeZone: "Asia/Tokyo", market: "JPX" },
  { name: "Sydney", timeZone: "Australia/Sydney", market: "ASX" },
];

type TickerItem = {
  name: string;
  market: string;
  time: string;
};

export function GlobalHoursTicker() {
  const [items, setItems] = useState<TickerItem[]>(() => getTickerItems());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setItems(getTickerItems());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const duplicatedItems = [...items, ...items];

  return (
    <section className="global-hours-band" aria-label="Horas globais em destaque">
      <div className="global-hours-marquee">
        <div className="global-hours-track">
          {duplicatedItems.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="global-hours-chip"
              aria-hidden={index >= items.length}
            >
              <span className="global-hours-market">{item.market}</span>
              <strong>{item.name}</strong>
              <span className="global-hours-time">{item.time}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function getTickerItems() {
  return tickerCities.map((city) => ({
    name: city.name,
    market: city.market,
    time: new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: city.timeZone,
    }).format(new Date()),
  }));
}
