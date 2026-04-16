import type { ApodEntry } from '../types/apod';

const LAST_DATE_KEY = 'apod:last_date';
const FAVORITES_KEY = 'apod:favorites';

export function getStoredDate(): string | null {
  try {
    return localStorage.getItem(LAST_DATE_KEY);
  } catch {
    return null;
  }
}

export function setStoredDate(date: string): void {
  try {
    localStorage.setItem(LAST_DATE_KEY, date);
  } catch {
    // Storage may be unavailable in private browsing — fail silently
  }
}

export function getStoredFavorites(): ApodEntry[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ApodEntry[];
  } catch {
    return [];
  }
}

export function setStoredFavorites(favorites: ApodEntry[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // Storage may be unavailable — fail silently
  }
}
