/** Earliest date the NASA APOD API has data for */
export const MIN_APOD_DATE = '1995-06-16';

/**
 * Returns today's date as a YYYY-MM-DD string in the local timezone.
 * Using local date avoids off-by-one errors from UTC conversion.
 */
export function getTodayDate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Formats a YYYY-MM-DD string for display, e.g. "April 15, 2026".
 * Parses parts manually to avoid timezone issues with new Date(string).
 */
export function formatDisplayDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, (month ?? 1) - 1, day ?? 1);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Shifts a YYYY-MM-DD date string by `days` (positive = forward, negative = backward).
 * Returns the new date clamped between MIN_APOD_DATE and today.
 */
export function shiftDate(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, (month ?? 1) - 1, day ?? 1);
  d.setDate(d.getDate() + days);

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const result = `${yyyy}-${mm}-${dd}`;

  if (result < MIN_APOD_DATE) return MIN_APOD_DATE;
  const today = getTodayDate();
  if (result > today) return today;
  return result;
}

/** Returns true if `dateStr` is within the valid APOD date range. */
export function isDateInRange(dateStr: string): boolean {
  const today = getTodayDate();
  return dateStr >= MIN_APOD_DATE && dateStr <= today;
}
