import { useApod } from '../hooks/useApod';
import { DateSelector } from '../components/DateSelector';
import { MediaDisplay } from '../components/MediaDisplay';
import { ApodDescription } from '../components/ApodDescription';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorMessage } from '../components/ErrorMessage';
import { FavoriteButton } from '../components/FavoriteButton';
import { formatDisplayDate } from '../utils/dateUtils';
import { Copyright } from 'lucide-react';

export function HomePage() {
  const { data, loading, error, date, setDate, retry } = useApod();

  return (
    <main className="pt-16 min-h-screen">
      {/* Date Selector — always visible */}
      <div className="sticky top-16 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 py-4">
        <DateSelector date={date} onDateChange={setDate} />
      </div>

      {loading && (
        <div className="pt-10">
          <LoadingSkeleton />
        </div>
      )}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={retry} />
      )}

      {!loading && !error && data && (
        <article className="max-w-4xl mx-auto pb-16">
          {/* Full-bleed media */}
          <div className="rounded-b-none overflow-hidden">
            <MediaDisplay
              mediaType={data.media_type}
              url={data.url}
              hdurl={data.hdurl}
              thumbnailUrl={data.thumbnail_url}
              title={data.title}
            />
          </div>

          {/* Content card */}
          <div className="mx-4 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-b-2xl rounded-t-none px-6 py-6 space-y-5 -mt-px">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {data.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
                  <time dateTime={data.date}>{formatDisplayDate(data.date)}</time>
                  {data.copyright && (
                    <span className="flex items-center gap-1">
                      <Copyright className="w-3.5 h-3.5 flex-shrink-0" />
                      {data.copyright.trim()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                <FavoriteButton entry={data} />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-800" />

            {/* Description */}
            <ApodDescription text={data.explanation} />

            {/* HD link for images */}
            {data.media_type === 'image' && data.hdurl && (
              <a
                href={data.hdurl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                View full-resolution image →
              </a>
            )}
          </div>
        </article>
      )}
    </main>
  );
}
