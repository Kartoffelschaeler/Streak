export const STREAK_TIME_ZONE = "Europe/Berlin";

// Change this date to the first day of your streak. Format: YYYY-MM-DD.
export const STREAK_START_DATE = "2026-04-23";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: STREAK_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function getCurrentStreak(now = new Date()) {
  const today = getDatePartsInBerlin(now);
  const start = parseDateParts(STREAK_START_DATE);
  const diff = daysFromCivilDate(today) - daysFromCivilDate(start);

  return Math.max(0, diff + 1);
}

function getDatePartsInBerlin(date: Date) {
  return parseDateParts(DATE_FORMATTER.format(date));
}

function parseDateParts(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    throw new Error("Date must use YYYY-MM-DD format.");
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

function daysFromCivilDate(date: { year: number; month: number; day: number }) {
  const shiftedYear = date.year - (date.month <= 2 ? 1 : 0);
  const era = Math.floor(shiftedYear / 400);
  const yearOfEra = shiftedYear - era * 400;
  const month = date.month + (date.month > 2 ? -3 : 9);
  const dayOfYear = Math.floor((153 * month + 2) / 5) + date.day - 1;
  const dayOfEra =
    yearOfEra * 365 +
    Math.floor(yearOfEra / 4) -
    Math.floor(yearOfEra / 100) +
    dayOfYear;

  return era * 146097 + dayOfEra;
}
