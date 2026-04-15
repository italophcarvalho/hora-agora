export type HolidayItem = {
  id: string;
  date: string;
  label: string;
  note: string;
  articleHref?: string;
};

const monthMap: Record<string, number> = {
  jan: 0,
  fev: 1,
  mar: 2,
  abr: 3,
  maio: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  set: 8,
  out: 9,
  nov: 10,
  dez: 11,
};

export function parseHolidayDate(value: string) {
  const [dayToken, monthToken, yearToken] = value
    .toLowerCase()
    .split(" ")
    .filter(Boolean);

  const day = Number(dayToken);
  const month = monthMap[monthToken];
  const year = Number(yearToken);

  return new Date(year, month, day);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDayDiff(target: Date, referenceDate: Date) {
  const dayInMs = 24 * 60 * 60 * 1000;

  return Math.round(
    (startOfDay(target).getTime() - startOfDay(referenceDate).getTime()) / dayInMs,
  );
}

export function getHolidayCountdownLabel(
  dateValue: string,
  referenceDate: Date,
) {
  const diff = getDayDiff(parseHolidayDate(dateValue), referenceDate);

  if (diff <= 0) {
    return diff === 0 ? "Hoje" : "Ja passou";
  }

  return diff === 1 ? "Falta 1 dia" : `Faltam ${diff} dias`;
}

export function getHolidayDayTypeLabel(dateValue: string) {
  const holidayDate = parseHolidayDate(dateValue);
  const weekday = holidayDate.toLocaleDateString("pt-BR", {
    weekday: "long",
  });
  const isWeekend = [0, 6].includes(holidayDate.getDay());

  return isWeekend ? `${weekday}, fim de semana` : `${weekday}, dia util`;
}

export function getUpcomingHolidays(
  holidays: HolidayItem[],
  referenceDate: Date,
  limit = 5,
) {
  const today = startOfDay(referenceDate);

  const sorted = [...holidays].sort(
    (left, right) =>
      parseHolidayDate(left.date).getTime() - parseHolidayDate(right.date).getTime(),
  );

  const upcoming = sorted.filter(
    (holiday) => parseHolidayDate(holiday.date).getTime() >= today.getTime(),
  );

  return (upcoming.length > 0 ? upcoming : sorted).slice(0, limit);
}
