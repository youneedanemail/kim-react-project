import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, Star } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { setStoredDate } from '../utils/storageUtils';
import { formatDisplayDate } from '../utils/dateUtils';
import type { ApodEntry } from '../types/apod';

function FavoriteCard({ entry, onRemove }: { entry: ApodEntry; onRemove: () => void }) {
  const navigate = useNavigate();

  function handleView() {
    setStoredDate(entry.date);
    void navigate('/');
  }

  const thumbSrc =
    entry.media_type === 'image'
      ? (entry.hdurl ?? entry.url)
      : (entry.thumbnail_url ?? null);

  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5">
      {/* Thumbnail */}
      <button
        onClick={handleView}
        className="block w-full text-left"
        title={`View ${entry.title}`}
      >
        <div className="relative w-full bg-slate-800" style={{ paddingBottom: '60%' }}>
          {thumbSrc ? (
            <img
              src={thumbSrc}
              alt={entry.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Star className="w-10 h-10 text-slate-600" />
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </button>

      {/* Info */}
      <div className="p-4 space-y-1">
        <button
          onClick={handleView}
          className="text-left w-full"
        >
          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 hover:text-indigo-300 transition-colors">
            {entry.title}
          </h3>
        </button>
        <p className="text-slate-500 text-xs">{formatDisplayDate(entry.date)}</p>
      </div>

      {/* Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        title="Remove from favorites"
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100 duration-200"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

function EmptyState() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-28 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
        <Heart className="w-10 h-10 text-slate-600" />
      </div>
      <div className="space-y-2">
        <p className="text-white font-semibold text-xl">No favorites yet</p>
        <p className="text-slate-400 text-sm max-w-xs">
          Explore the Astronomy Picture of the Day and save the ones you love.
        </p>
      </div>
      <button
        onClick={() => void navigate('/')}
        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
      >
        Start Exploring
      </button>
    </div>
  );
}

export function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
          <h1 className="text-2xl font-bold text-white">My Favorites</h1>
          {favorites.length > 0 && (
            <span className="text-slate-500 text-sm font-normal">
              ({favorites.length})
            </span>
          )}
        </div>

        {favorites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map((entry) => (
              <FavoriteCard
                key={entry.date}
                entry={entry}
                onRemove={() => toggleFavorite(entry)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
