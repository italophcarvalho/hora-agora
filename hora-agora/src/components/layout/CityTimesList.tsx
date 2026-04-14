"use client";

import { useEffect, useState } from "react";
import { mainCities } from "@/lib/site";

export function CityTimesList() {
  const [label, setLabel] = useState(() => getFormattedTimes());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLabel(getFormattedTimes());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="city-list">
      {label.map((city) => (
        <div key={city.name} className="city-row">
          <span>{city.name}</span>
          <span className="city-time">{city.time}</span>
        </div>
      ))}
    </div>
  );
}

function getFormattedTimes() {
  return mainCities.map((city) => ({
    ...city,
    time: new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: city.timeZone,
    }).format(new Date()),
  }));
}
