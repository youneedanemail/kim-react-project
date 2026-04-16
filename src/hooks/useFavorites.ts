import { createContext, useContext, useState, useCallback, createElement } from 'react';
import type { ReactNode } from 'react';
import type { ApodEntry } from '../types/apod';
import { getStoredFavorites, setStoredFavorites } from '../utils/storageUtils';

interface FavoritesContextValue {
  favorites: ApodEntry[];
  isFavorite: (date: string) => boolean;
  toggleFavorite: (entry: ApodEntry) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

interface FavoritesProviderProps {
  children: ReactNode;
}

/** Wraps the app to share favorites state across all pages. */
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<ApodEntry[]>(() => getStoredFavorites());

  const isFavorite = useCallback(
    (date: string): boolean => favorites.some((f) => f.date === date),
    [favorites],
  );

  const toggleFavorite = useCallback((entry: ApodEntry): void => {
    setFavorites((prev) => {
      const alreadySaved = prev.some((f) => f.date === entry.date);
      const updated = alreadySaved
        ? prev.filter((f) => f.date !== entry.date)
        : [entry, ...prev];
      setStoredFavorites(updated);
      return updated;
    });
  }, []);

  return createElement(
    FavoritesContext.Provider,
    { value: { favorites, isFavorite, toggleFavorite } },
    children,
  );
}

/** Hook that consumes the FavoritesContext. Must be used inside FavoritesProvider. */
export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return ctx;
}
