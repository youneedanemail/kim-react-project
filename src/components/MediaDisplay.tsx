interface MediaDisplayProps {
  mediaType: 'image' | 'video';
  url: string;
  hdurl?: string;
  thumbnailUrl?: string;
  title: string;
}

/**
 * Renders either a full-resolution image or a YouTube/video iframe.
 * For images, prefers the HD URL when available.
 * For videos, shows a 16:9 responsive iframe.
 */
export function MediaDisplay({ mediaType, url, hdurl, thumbnailUrl, title }: MediaDisplayProps) {
  if (mediaType === 'image') {
    const src = hdurl ?? url;
    return (
      <div className="relative w-full bg-slate-900 overflow-hidden">
        <img
          src={src}
          alt={title}
          className="w-full max-h-[80vh] object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  // Video — prefer actual thumbnail from API, otherwise use a dark placeholder
  const posterSrc = thumbnailUrl;

  return (
    <div className="relative w-full bg-slate-900">
      {/* 16:9 aspect-ratio container */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          {...(posterSrc ? { poster: posterSrc } : {})}
          className="absolute inset-0 w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        />
      </div>
    </div>
  );
}
