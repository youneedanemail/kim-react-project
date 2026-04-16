import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { getTodayDate, shiftDate, MIN_APOD_DATE, formatDisplayDate } from '../utils/dateUtils';

interface DateSelectorProps {
  date: string;
  onDateChange: (date: string) => void;
}

const NAV_DEBOUNCE_MS = 400;

export function DateSelector({ date, onDateChange }: DateSelectorProps) {
  const today = getTodayDate();
  // Local display state — updates immediately for responsive UI but commits to
  // onDateChange (which triggers the API) only when the user is done selecting.
  const [localDate, setLocalDate] = useState(date);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local display when the committed date changes externally
  // (e.g. navigating here from the Favorites page with a stored date).
  useEffect(() => {
    setLocalDate(date);
  }, [date]);

  // Clean up any pending debounce timer on unmount.
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const isToday = localDate === today;
  const isMinDate = localDate === MIN_APOD_DATE;

  // Updates the local display immediately and debounces the API-triggering commit
  // so rapid prev/next clicks only fire one request for the final destination.
  function handleNavigation(newDate: string) {
    setLocalDate(newDate);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onDateChange(newDate);
    }, NAV_DEBOUNCE_MS);
  }

  // Update local display only — the native date input fires onChange as the user
  // changes individual segments (year, month) with the previously-selected day
  // still active, so we defer the commit until blur.
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalDate(e.target.value);
  }

  // Commit the selected date to the API only when the user finishes with the input.
  function handleInputBlur() {
    if (localDate >= MIN_APOD_DATE && localDate <= today) {
      if (localDate !== date) {
        onDateChange(localDate);
      }
    } else {
      // Out-of-range or incomplete — revert to the last committed date.
      setLocalDate(date);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {/* Previous Day */}
        <button
          onClick={() => handleNavigation(shiftDate(localDate, -1))}
          disabled={isMinDate}
          title="Previous day"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Date Input */}
        <label className="relative flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-indigo-500 rounded-xl px-4 py-2.5 cursor-pointer transition-colors group">
          <CalendarDays className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          <input
            type="date"
            value={localDate}
            min={MIN_APOD_DATE}
            max={today}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="bg-transparent text-slate-100 text-sm font-medium outline-none cursor-pointer [color-scheme:dark]"
          />
        </label>

        {/* Next Day */}
        <button
          onClick={() => handleNavigation(shiftDate(localDate, 1))}
          disabled={isToday}
          title="Next day"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Today button + display date */}
      <div className="flex items-center gap-3">
        <p className="text-slate-400 text-sm">{formatDisplayDate(localDate)}</p>
        {!isToday && (
          <button
            onClick={() => onDateChange(today)}
            className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors font-medium"
          >
            Jump to Today
          </button>
        )}
      </div>
    </div>
  );
}
