"use client";

import { useState } from "react";

type HolidayItem = {
  date: string;
  label: string;
  note: string;
};

const holidayCatalog: Record<string, { label: string; holidays: HolidayItem[] }> = {
  BR: {
    label: "Brasil",
    holidays: [
      { date: "01 jan 2026", label: "Confraternizacao Universal", note: "Feriado nacional." },
      { date: "03 abr 2026", label: "Paixao de Cristo", note: "Feriado nacional." },
      { date: "21 abr 2026", label: "Tiradentes", note: "Feriado nacional." },
      { date: "01 maio 2026", label: "Dia do Trabalho", note: "Feriado nacional." },
      { date: "07 set 2026", label: "Independencia do Brasil", note: "Feriado nacional." },
      { date: "12 out 2026", label: "Nossa Senhora Aparecida", note: "Feriado nacional." },
      { date: "02 nov 2026", label: "Finados", note: "Feriado nacional." },
      { date: "15 nov 2026", label: "Proclamacao da Republica", note: "Feriado nacional." },
      { date: "20 nov 2026", label: "Dia da Consciencia Negra", note: "Feriado nacional." },
      { date: "25 dez 2026", label: "Natal", note: "Feriado nacional." },
    ],
  },
  US: {
    label: "Estados Unidos",
    holidays: [
      { date: "01 jan 2026", label: "New Year's Day", note: "Feriado federal." },
      { date: "19 jan 2026", label: "Martin Luther King Jr. Day", note: "Terceira segunda de janeiro." },
      { date: "16 fev 2026", label: "Washington's Birthday", note: "Terceira segunda de fevereiro." },
      { date: "25 maio 2026", label: "Memorial Day", note: "Ultima segunda de maio." },
      { date: "19 jun 2026", label: "Juneteenth", note: "Feriado federal." },
      { date: "03 jul 2026", label: "Independence Day (observed)", note: "Observado na sexta, pois 4 de julho cai no sabado." },
      { date: "07 set 2026", label: "Labor Day", note: "Primeira segunda de setembro." },
      { date: "12 out 2026", label: "Columbus Day", note: "Segunda segunda de outubro." },
      { date: "11 nov 2026", label: "Veterans Day", note: "Feriado federal." },
      { date: "26 nov 2026", label: "Thanksgiving Day", note: "Quarta quinta-feira de novembro." },
      { date: "25 dez 2026", label: "Christmas Day", note: "Feriado federal." },
    ],
  },
  GB: {
    label: "Reino Unido (Inglaterra e Gales)",
    holidays: [
      { date: "01 jan 2026", label: "New Year's Day", note: "Bank holiday." },
      { date: "03 abr 2026", label: "Good Friday", note: "Bank holiday." },
      { date: "06 abr 2026", label: "Easter Monday", note: "Bank holiday." },
      { date: "04 maio 2026", label: "Early May bank holiday", note: "Primeira segunda de maio." },
      { date: "25 maio 2026", label: "Spring bank holiday", note: "Ultima segunda de maio." },
      { date: "31 ago 2026", label: "Summer bank holiday", note: "Ultima segunda de agosto." },
      { date: "25 dez 2026", label: "Christmas Day", note: "Bank holiday." },
      { date: "28 dez 2026", label: "Boxing Day (substitute day)", note: "Substituicao do feriado de 26 de dezembro." },
    ],
  },
  DE: {
    label: "Alemanha",
    holidays: [
      { date: "01 jan 2026", label: "Ano-Novo", note: "Feriado nacional." },
      { date: "03 abr 2026", label: "Sexta-feira Santa", note: "Feriado nacional." },
      { date: "06 abr 2026", label: "Segunda-feira de Pascoa", note: "Feriado nacional." },
      { date: "01 maio 2026", label: "Dia do Trabalho", note: "Feriado nacional." },
      { date: "14 maio 2026", label: "Ascensao", note: "Feriado nacional." },
      { date: "25 maio 2026", label: "Segunda-feira de Pentecostes", note: "Feriado nacional." },
      { date: "03 out 2026", label: "Dia da Unidade Alema", note: "Feriado nacional." },
      { date: "25 dez 2026", label: "Natal", note: "Feriado nacional." },
      { date: "26 dez 2026", label: "Segundo dia de Natal", note: "Feriado nacional." },
    ],
  },
  FR: {
    label: "Franca",
    holidays: [
      { date: "01 jan 2026", label: "Jour de l'An", note: "Feriado nacional." },
      { date: "06 abr 2026", label: "Lundi de Paques", note: "Feriado nacional." },
      { date: "01 maio 2026", label: "Fete du Travail", note: "Feriado nacional." },
      { date: "08 maio 2026", label: "Victoire 1945", note: "Feriado nacional." },
      { date: "14 maio 2026", label: "Ascension", note: "Feriado nacional." },
      { date: "25 maio 2026", label: "Lundi de Pentecote", note: "Feriado nacional." },
      { date: "14 jul 2026", label: "Fete Nationale", note: "Feriado nacional." },
      { date: "15 ago 2026", label: "Assomption", note: "Feriado nacional." },
      { date: "01 nov 2026", label: "Toussaint", note: "Feriado nacional." },
      { date: "11 nov 2026", label: "Armistice", note: "Feriado nacional." },
      { date: "25 dez 2026", label: "Noel", note: "Feriado nacional." },
    ],
  },
  ES: {
    label: "Espanha",
    holidays: [
      { date: "01 jan 2026", label: "Ano-Novo", note: "Feriado nacional." },
      { date: "06 jan 2026", label: "Epifania do Senhor", note: "Feriado nacional." },
      { date: "03 abr 2026", label: "Sexta-feira Santa", note: "Feriado nacional." },
      { date: "01 maio 2026", label: "Dia do Trabalhador", note: "Feriado nacional." },
      { date: "15 ago 2026", label: "Assuncao", note: "Feriado nacional." },
      { date: "12 out 2026", label: "Fiesta Nacional de Espana", note: "Feriado nacional." },
      { date: "01 nov 2026", label: "Todos os Santos", note: "Feriado nacional." },
      { date: "06 dez 2026", label: "Dia da Constituicao", note: "Feriado nacional." },
      { date: "08 dez 2026", label: "Imaculada Conceicao", note: "Feriado nacional." },
      { date: "25 dez 2026", label: "Natal", note: "Feriado nacional." },
    ],
  },
  IT: {
    label: "Italia",
    holidays: [
      { date: "01 jan 2026", label: "Capodanno", note: "Feriado nacional." },
      { date: "06 jan 2026", label: "Epifania", note: "Feriado nacional." },
      { date: "05 abr 2026", label: "Pasqua", note: "Feriado nacional." },
      { date: "06 abr 2026", label: "Lunedi dell'Angelo", note: "Feriado nacional." },
      { date: "25 abr 2026", label: "Festa della Liberazione", note: "Feriado nacional." },
      { date: "01 maio 2026", label: "Festa dei Lavoratori", note: "Feriado nacional." },
      { date: "02 jun 2026", label: "Festa della Repubblica", note: "Feriado nacional." },
      { date: "15 ago 2026", label: "Ferragosto", note: "Feriado nacional." },
      { date: "01 nov 2026", label: "Tutti i Santi", note: "Feriado nacional." },
      { date: "08 dez 2026", label: "Immacolata Concezione", note: "Feriado nacional." },
      { date: "25 dez 2026", label: "Natale", note: "Feriado nacional." },
      { date: "26 dez 2026", label: "Santo Stefano", note: "Feriado nacional." },
    ],
  },
  PT: {
    label: "Portugal",
    holidays: [
      { date: "01 jan 2026", label: "Ano-Novo", note: "Feriado nacional." },
      { date: "03 abr 2026", label: "Sexta-feira Santa", note: "Feriado nacional." },
      { date: "25 abr 2026", label: "Dia da Liberdade", note: "Feriado nacional." },
      { date: "01 maio 2026", label: "Dia do Trabalhador", note: "Feriado nacional." },
      { date: "10 jun 2026", label: "Dia de Portugal", note: "Feriado nacional." },
      { date: "15 ago 2026", label: "Assuncao de Nossa Senhora", note: "Feriado nacional." },
      { date: "05 out 2026", label: "Implantacao da Republica", note: "Feriado nacional." },
      { date: "01 nov 2026", label: "Dia de Todos os Santos", note: "Feriado nacional." },
      { date: "01 dez 2026", label: "Restauracao da Independencia", note: "Feriado nacional." },
      { date: "08 dez 2026", label: "Imaculada Conceicao", note: "Feriado nacional." },
      { date: "25 dez 2026", label: "Natal", note: "Feriado nacional." },
    ],
  },
  JP: {
    label: "Japao",
    holidays: [
      { date: "01 jan 2026", label: "New Year's Day", note: "Feriado nacional." },
      { date: "12 jan 2026", label: "Coming of Age Day", note: "Segunda segunda de janeiro." },
      { date: "11 fev 2026", label: "National Foundation Day", note: "Feriado nacional." },
      { date: "23 fev 2026", label: "Emperor's Birthday", note: "Feriado nacional." },
      { date: "29 abr 2026", label: "Showa Day", note: "Golden Week." },
      { date: "03 maio 2026", label: "Constitution Memorial Day", note: "Golden Week." },
      { date: "04 maio 2026", label: "Greenery Day", note: "Golden Week." },
      { date: "05 maio 2026", label: "Children's Day", note: "Golden Week." },
      { date: "20 jul 2026", label: "Marine Day", note: "Terceira segunda de julho." },
      { date: "21 set 2026", label: "Respect for the Aged Day", note: "Terceira segunda de setembro." },
      { date: "23 set 2026", label: "Autumnal Equinox Day", note: "Feriado nacional." },
      { date: "03 nov 2026", label: "Culture Day", note: "Feriado nacional." },
      { date: "23 nov 2026", label: "Labor Thanksgiving Day", note: "Feriado nacional." },
    ],
  },
  CA: {
    label: "Canada",
    holidays: [
      { date: "01 jan 2026", label: "New Year's Day", note: "Feriado nacional." },
      { date: "03 abr 2026", label: "Good Friday", note: "Feriado observado em varias provincias." },
      { date: "18 maio 2026", label: "Victoria Day", note: "Feriado observado em grande parte do pais." },
      { date: "01 jul 2026", label: "Canada Day", note: "Feriado nacional." },
      { date: "07 set 2026", label: "Labour Day", note: "Feriado nacional." },
      { date: "12 out 2026", label: "Thanksgiving", note: "Segunda segunda de outubro." },
      { date: "11 nov 2026", label: "Remembrance Day", note: "Feriado observado em varias provincias." },
      { date: "25 dez 2026", label: "Christmas Day", note: "Feriado nacional." },
      { date: "26 dez 2026", label: "Boxing Day", note: "Feriado comercial e provincial." },
    ],
  },
  MX: {
    label: "Mexico",
    holidays: [
      { date: "01 jan 2026", label: "Ano-Novo", note: "Feriado nacional." },
      { date: "02 fev 2026", label: "Dia da Constituicao (observado)", note: "Primeira segunda de fevereiro." },
      { date: "16 mar 2026", label: "Natalicio de Benito Juarez (observado)", note: "Terceira segunda de marco." },
      { date: "01 maio 2026", label: "Dia do Trabalho", note: "Feriado nacional." },
      { date: "16 set 2026", label: "Dia da Independencia", note: "Feriado nacional." },
      { date: "16 nov 2026", label: "Dia da Revolucao (observado)", note: "Terceira segunda de novembro." },
      { date: "25 dez 2026", label: "Natal", note: "Feriado nacional." },
    ],
  },
  AR: {
    label: "Argentina",
    holidays: [
      { date: "01 jan 2026", label: "Ano-Novo", note: "Feriado nacional." },
      { date: "16 fev 2026", label: "Carnaval", note: "Feriado nacional." },
      { date: "17 fev 2026", label: "Carnaval", note: "Feriado nacional." },
      { date: "24 mar 2026", label: "Dia da Memoria", note: "Feriado nacional." },
      { date: "02 abr 2026", label: "Dia do Veterano e dos Caidos", note: "Feriado nacional." },
      { date: "01 maio 2026", label: "Dia do Trabalhador", note: "Feriado nacional." },
      { date: "25 maio 2026", label: "Revolucao de Maio", note: "Feriado nacional." },
      { date: "20 jun 2026", label: "Dia da Bandeira", note: "Feriado nacional." },
      { date: "09 jul 2026", label: "Dia da Independencia", note: "Feriado nacional." },
      { date: "08 dez 2026", label: "Imaculada Conceicao", note: "Feriado nacional." },
      { date: "25 dez 2026", label: "Natal", note: "Feriado nacional." },
    ],
  },
  AU: {
    label: "Australia",
    holidays: [
      { date: "01 jan 2026", label: "New Year's Day", note: "Feriado nacional." },
      { date: "26 jan 2026", label: "Australia Day", note: "Feriado nacional." },
      { date: "03 abr 2026", label: "Good Friday", note: "Feriado nacional." },
      { date: "06 abr 2026", label: "Easter Monday", note: "Feriado nacional." },
      { date: "25 abr 2026", label: "ANZAC Day", note: "Feriado nacional." },
      { date: "08 jun 2026", label: "King's Birthday", note: "Observado na maior parte do pais." },
      { date: "25 dez 2026", label: "Christmas Day", note: "Feriado nacional." },
      { date: "28 dez 2026", label: "Boxing Day (observed)", note: "Segunda-feira observada em varios estados." },
    ],
  },
};

const countryOptions = Object.entries(holidayCatalog)
  .filter(([code]) => code !== "BR")
  .map(([code, value]) => ({
    code,
    label: value.label,
  }));

export function HolidayCountryPicker() {
  const [countryCode, setCountryCode] = useState("US");

  const selectedCountry = holidayCatalog[countryCode];

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
            {countryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="holiday-list">
        {selectedCountry.holidays.map((holiday) => (
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
