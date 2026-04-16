import { Heart } from 'lucide-react';
import type { ApodEntry } from '../types/apod';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  entry: ApodEntry;
}

export function FavoriteButton({ entry }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(entry.date);

  return (
    <button
      onClick={() => toggleFavorite(entry)}
      title={saved ? 'Remove from favorites' : 'Add to favorites'}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        saved
          ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
          : 'bg-slate-800 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300'
      }`}
    >
      <Heart
        className={`w-4 h-4 transition-transform duration-200 ${saved ? 'fill-rose-400 text-rose-400 scale-110' : ''}`}
      />
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}
