import { useState, useEffect, useCallback } from 'react';
import type { ApodEntry } from '../types/apod';
import { fetchApod } from '../services/apodService';
import { getTodayDate, isDateInRange } from '../utils/dateUtils';
import { getStoredDate, setStoredDate } from '../utils/storageUtils';

interface UseApodReturn {
  data: ApodEntry | null;
  loading: boolean;
  error: string | null;
  date: string;
  setDate: (date: string) => void;
  retry: () => void;
}

export function useApod(): UseApodReturn {
  const [date, setDateState] = useState<string>(() => {
    const stored = getStoredDate();
    if (stored && isDateInRange(stored)) return stored;
    return getTodayDate();
  });

  const [data, setData] = useState<ApodEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (targetDate: string) => {
    setLoading(true);
    setError(null);
    try {
      const entry = await fetchApod(targetDate);
      setData(entry);
    } catch (err) {
      if (axios_isAxiosError(err) && err.response?.status === 429) {
        setError('Rate limit reached. Please wait a moment and try again.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to load the astronomy picture. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(date);
  }, [date, load]);

  const setDate = useCallback((newDate: string) => {
    setDateState(newDate);
    setStoredDate(newDate);
  }, []);

  const retry = useCallback(() => {
    void load(date);
  }, [date, load]);

  return { data, loading, error, date, setDate, retry };
}

/** Narrows an unknown error to an Axios error shape without importing axios types. */
function axios_isAxiosError(err: unknown): err is { response?: { status?: number } } {
  return typeof err === 'object' && err !== null && 'response' in err;
}
