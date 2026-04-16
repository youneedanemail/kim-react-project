import axios from 'axios';
import type { ApodEntry } from '../types/apod';

const BASE_URL = 'https://api.nasa.gov/planetary/apod';

/**
 * Uses the DEMO_KEY for development (30 requests/hour, 50/day per IP).
 * Set VITE_NASA_API_KEY in a .env file for a higher-rate production key.
 * Get a free key at: https://api.nasa.gov/
 */
const API_KEY = (import.meta.env['VITE_NASA_API_KEY'] as string | undefined) ?? 'DEMO_KEY';

/**
 * Fetches the Astronomy Picture of the Day for a given date.
 * If `date` is omitted, the API returns today's entry.
 */
export async function fetchApod(date?: string): Promise<ApodEntry> {
  const params: Record<string, string> = {
    api_key: API_KEY,
    thumbs: 'true', // Request thumbnail URLs for video entries
  };

  if (date) {
    params['date'] = date;
  }

  const response = await axios.get<ApodEntry>(BASE_URL, { params });
  return response.data;
}
