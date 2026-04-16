import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ApodDescriptionProps {
  text: string;
}

const CHAR_LIMIT = 350;

/** Shows a truncated description with a "Read more / Read less" toggle. */
export function ApodDescription({ text }: ApodDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > CHAR_LIMIT;

  const displayed = !isLong || expanded ? text : `${text.slice(0, CHAR_LIMIT).trimEnd()}…`;

  return (
    <div className="space-y-3">
      <p className="text-slate-300 leading-relaxed text-sm sm:text-base transition-all duration-300">
        {displayed}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Read less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Read more
            </>
          )}
        </button>
      )}
    </div>
  );
}
