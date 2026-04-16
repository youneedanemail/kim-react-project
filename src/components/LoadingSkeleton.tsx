/** Pulsing placeholder that mirrors the layout of the ApodCard. */
export function LoadingSkeleton() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto px-4 pb-12 space-y-4">
      {/* Media placeholder */}
      <div className="w-full bg-slate-800 rounded-2xl" style={{ height: '480px' }} />

      {/* Date selector placeholder */}
      <div className="flex justify-center mt-4">
        <div className="h-10 w-72 bg-slate-800 rounded-xl" />
      </div>

      {/* Title + meta */}
      <div className="space-y-3 mt-6">
        <div className="h-8 bg-slate-800 rounded-lg w-2/3" />
        <div className="h-4 bg-slate-800 rounded w-1/3" />
      </div>

      {/* Description lines */}
      <div className="space-y-2 mt-4">
        <div className="h-4 bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-800 rounded w-5/6" />
        <div className="h-4 bg-slate-800 rounded w-4/6" />
      </div>
    </div>
  );
}
