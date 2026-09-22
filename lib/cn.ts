export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatHours(hours: number) {
  return hours.toLocaleString("en-GB", {
    minimumFractionDigits: Number.isInteger(hours) ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

export function formatDays(days: number) {
  return days.toLocaleString("en-GB", {
    minimumFractionDigits: Number.isInteger(days) ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

export function investmentSharePercent(part: number, whole: number) {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) {
    return 0;
  }

  return Math.round((part / whole) * 100);
}
