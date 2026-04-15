"use client";

import { useMemo, useState } from "react";

const weekdayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

export function CalendarExplorer() {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(today);

  const monthLabel = viewDate.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = useMemo(() => buildCalendarDays(viewDate), [viewDate]);
  const selectedLabel = selectedDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const isWeekend = [0, 6].includes(selectedDate.getDay());
  const weekNumber = getWeekNumber(selectedDate);
  const quarter = Math.floor(selectedDate.getMonth() / 3) + 1;

  return (
    <section className="calculator-card calendar-card">
      <p className="page-kicker">Nova ferramenta</p>
      <h2>Calendario mensal</h2>
      <p className="calculator-intro">
        Uma leitura clara para navegar pelo mes, destacar o dia atual e abrir
        espaco para futuras camadas como feriados, dias uteis e contexto
        internacional.
      </p>

      <div className="calendar-shell">
        <div className="calendar-toolbar">
          <button
            type="button"
            className="calendar-nav-button"
            onClick={() => {
              const nextMonth = new Date(
                viewDate.getFullYear(),
                viewDate.getMonth() - 1,
                1,
              );
              setViewDate(nextMonth);
            }}
          >
            Mes anterior
          </button>

          <strong className="calendar-month-label">{monthLabel}</strong>

          <button
            type="button"
            className="calendar-nav-button"
            onClick={() => {
              const nextMonth = new Date(
                viewDate.getFullYear(),
                viewDate.getMonth() + 1,
                1,
              );
              setViewDate(nextMonth);
            }}
          >
            Proximo mes
          </button>
        </div>

        <div className="calendar-grid">
          {weekdayLabels.map((label) => (
            <span key={label} className="calendar-weekday">
              {label}
            </span>
          ))}

          {calendarDays.map((day) => {
            const isSelected = isSameDay(day.date, selectedDate);
            const isToday = isSameDay(day.date, today);
            const className = [
              "calendar-day",
              day.isCurrentMonth ? "is-current-month" : "is-outside-month",
              isSelected ? "is-selected" : "",
              isToday ? "is-today" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={day.key}
                type="button"
                className={className}
                onClick={() => setSelectedDate(day.date)}
              >
                <span>{day.date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="calendar-summary-grid">
        <article className="calendar-summary-card">
          <span>Data selecionada</span>
          <strong>{selectedLabel}</strong>
          <p>{isWeekend ? "Fim de semana" : "Dia util"} no contexto local.</p>
        </article>

        <article className="calendar-summary-card">
          <span>Semana</span>
          <strong>{weekNumber}</strong>
          <p>Leitura rapida para agenda, entregas e planejamento do periodo.</p>
        </article>

        <article className="calendar-summary-card">
          <span>Trimestre</span>
          <strong>T{quarter}</strong>
          <p>Visao de quarter para operacao, metas e checkpoints do ano.</p>
        </article>
      </div>

      <div className="calendar-roadmap-note">
        Proxima expansao anotada: lista de feriados de todos os paises.
      </div>
    </section>
  );
}

function buildCalendarDays(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - firstWeekday);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);

    return {
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date,
      isCurrentMonth: date.getMonth() === month,
    };
  });
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getWeekNumber(date: Date) {
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDayNumber = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDayNumber + 3);

  return (
    1 +
    Math.round(
      (target.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000),
    )
  );
}
