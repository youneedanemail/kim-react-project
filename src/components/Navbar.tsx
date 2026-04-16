import { NavLink } from 'react-router-dom';
import { Telescope, Heart, Star } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

export function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-white font-semibold text-lg hover:text-indigo-400 transition-colors"
        >
          <Telescope className="w-6 h-6 text-indigo-400" />
          <span className="hidden sm:inline">Space Image Explorer</span>
          <span className="sm:hidden">Space Explorer</span>
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-300'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Star className="w-4 h-4" />
            <span>Explore</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-rose-500/20 text-rose-300'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Heart className="w-4 h-4" />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="ml-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {favorites.length > 9 ? '9+' : favorites.length}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
