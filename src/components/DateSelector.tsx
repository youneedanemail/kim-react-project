import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { getTodayDate, shiftDate, MIN_APOD_DATE, formatDisplayDate } from '../utils/dateUtils';

interface DateSelectorProps {
  date: string;
  onDateChange: (date: string) => void;
}

export function DateSelector({ date, onDateChange }: DateSelectorProps) {
  const today = getTodayDate();
  const isToday = date === today;
  const isMinDate = date === MIN_APOD_DATE;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val >= MIN_APOD_DATE && val <= today) {
      onDateChange(val);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {/* Previous Day */}
        <button
          onClick={() => onDateChange(shiftDate(date, -1))}
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
            value={date}
            min={MIN_APOD_DATE}
            max={today}
            onChange={handleInputChange}
            className="bg-transparent text-slate-100 text-sm font-medium outline-none cursor-pointer [color-scheme:dark]"
          />
        </label>

        {/* Next Day */}
        <button
          onClick={() => onDateChange(shiftDate(date, 1))}
          disabled={isToday}
          title="Next day"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Today button + display date */}
      <div className="flex items-center gap-3">
        <p className="text-slate-400 text-sm">{formatDisplayDate(date)}</p>
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
