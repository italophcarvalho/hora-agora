"use client";

import { useState } from "react";
import {
  brazilNationalHolidays,
  holidayCatalog,
  holidayCountryOptions,
} from "@/lib/holiday-data";
import {
  getHolidayCountdownLabel,
  getHolidayDayTypeLabel,
  getUpcomingHolidays,
} from "@/lib/holiday-utils";

type HolidayGuideExplorerProps = {
  referenceDateIso: string;
};

export function HolidayGuideExplorer({
  referenceDateIso,
}: HolidayGuideExplorerProps) {
  const [countryCode, setCountryCode] = useState("US");
  const referenceDate = new Date(referenceDateIso);
  const selectedCountry = holidayCatalog[countryCode];
  const upcomingBrazilHolidays = getUpcomingHolidays(
    brazilNationalHolidays,
    referenceDate,
  );
  const upcomingSelectedHolidays = getUpcomingHolidays(
    selectedCountry.holidays,
    referenceDate,
  );
  const nextBrazilHoliday = upcomingBrazilHolidays[0];
  const nextSelectedHoliday = upcomingSelectedHolidays[0];

  return (
    <section className="calculator-card holiday-guide-card">
      <p className="page-kicker">Ferramenta de feriados</p>
      <h2>Guia de feriados</h2>
      <p className="calculator-intro">
        Consulte os proximos feriados do Brasil e compare com outro pais em uma
        mesma leitura. Abaixo, a ferramenta tambem abre a lista anual completa
        do pais escolhido.
      </p>

      <section className="holiday-highlight-grid" aria-label="Feriados em foco">
        <article className="holiday-highlight-card">
          <span className="holiday-highlight-label">Brasil em foco</span>
          <h3>{nextBrazilHoliday.label}</h3>
          <strong>{nextBrazilHoliday.date}</strong>
          <p>{nextBrazilHoliday.note}</p>
          <div className="holiday-badge-row">
            <span className="holiday-badge">
              {getHolidayCountdownLabel(nextBrazilHoliday.date, referenceDate)}
            </span>
            <span className="holiday-badge">
              {getHolidayDayTypeLabel(nextBrazilHoliday.date)}
            </span>
          </div>
        </article>

        <article className="holiday-highlight-card">
          <span className="holiday-highlight-label">
            {selectedCountry.label} em foco
          </span>
          <h3>{nextSelectedHoliday.label}</h3>
          <strong>{nextSelectedHoliday.date}</strong>
          <p>{nextSelectedHoliday.note}</p>
          <div className="holiday-badge-row">
            <span className="holiday-badge">
              {getHolidayCountdownLabel(nextSelectedHoliday.date, referenceDate)}
            </span>
            <span className="holiday-badge">
              {getHolidayDayTypeLabel(nextSelectedHoliday.date)}
            </span>
          </div>
        </article>
      </section>

      <section className="holiday-columns" aria-label="Comparacao de feriados">
        <section className="holiday-section-card">
          <div className="holiday-section-heading">
            <h2>Brasil: proximos 5 feriados.</h2>
          </div>

          <div className="holiday-list">
            {upcomingBrazilHolidays.map((holiday) => (
              <article key={holiday.date} className="holiday-item">
                <strong>{holiday.date}</strong>
                <div>
                  <h3>{holiday.label}</h3>
                  <div className="holiday-badge-row">
                    <span className="holiday-badge">
                      {getHolidayCountdownLabel(holiday.date, referenceDate)}
                    </span>
                    <span className="holiday-badge">
                      {getHolidayDayTypeLabel(holiday.date)}
                    </span>
                  </div>
                  <p>{holiday.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="holiday-country-card">
          <div className="holiday-country-header">
            <h2>Outro pais: proximos 5 feriados.</h2>
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
            {upcomingSelectedHolidays.map((holiday) => (
              <article
                key={`${countryCode}-${holiday.date}-${holiday.label}`}
                className="holiday-item"
              >
                <strong>{holiday.date}</strong>
                <div>
                  <h3>{holiday.label}</h3>
                  <div className="holiday-badge-row">
                    <span className="holiday-badge">
                      {getHolidayCountdownLabel(holiday.date, referenceDate)}
                    </span>
                    <span className="holiday-badge">
                      {getHolidayDayTypeLabel(holiday.date)}
                    </span>
                  </div>
                  <p>{holiday.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="holiday-annual-card">
        <div className="holiday-annual-header">
          <div>
            <p className="page-kicker">Calendario anual</p>
            <h3>{selectedCountry.label} em 2026.</h3>
          </div>
          <p>
            Lista anual completa para planejamento, agenda, operacao e
            producao editorial em torno dos feriados do pais selecionado.
          </p>
        </div>

        <div className="holiday-list">
          {selectedCountry.holidays.map((holiday) => (
            <article
              key={`annual-${countryCode}-${holiday.date}-${holiday.label}`}
              className="holiday-item"
            >
              <strong>{holiday.date}</strong>
              <div>
                <h3>{holiday.label}</h3>
                <div className="holiday-badge-row">
                  <span className="holiday-badge">
                    {getHolidayCountdownLabel(holiday.date, referenceDate)}
                  </span>
                  <span className="holiday-badge">
                    {getHolidayDayTypeLabel(holiday.date)}
                  </span>
                </div>
                <p>{holiday.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
