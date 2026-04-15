"use client";

import { useState } from "react";
import {
  holidayCatalog,
  holidayCountryOptions,
} from "@/lib/holiday-data";
import { getUpcomingHolidays } from "@/lib/holiday-utils";

type HolidayCountryPickerProps = {
  referenceDateIso: string;
};

export function HolidayCountryPicker({
  referenceDateIso,
}: HolidayCountryPickerProps) {
  const [countryCode, setCountryCode] = useState("US");
  const referenceDate = new Date(referenceDateIso);
  const selectedCountry = holidayCatalog[countryCode];
  const upcomingHolidays = getUpcomingHolidays(
    selectedCountry.holidays,
    referenceDate,
  );

  return (
    <section className="holiday-country-card">
      <div className="holiday-country-header">
        <h2>Feriados de outro pais em 2026.</h2>
        <label className="holiday-country-select">
          <span>Pais</span>
          <select
            value={countryCode}
            onChange={(event) => setCountryCode(event.target.value)}
          >
            {holidayCountryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="holiday-list">
        {upcomingHolidays.map((holiday) => (
          <article key={`${countryCode}-${holiday.date}-${holiday.label}`} className="holiday-item">
            <strong>{holiday.date}</strong>
            <div>
              <h3>{holiday.label}</h3>
              <p>{holiday.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
