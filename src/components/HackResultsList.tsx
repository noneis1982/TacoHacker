"use client";

import type { OptimizeResponse } from "@/types/optimizer";
import { HackResultCard } from "./HackResultCard";

interface HackResultsListProps {
  results: OptimizeResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function HackResultsList({
  results,
  isLoading,
  error,
}: HackResultsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-200/60 bg-white p-4 animate-pulse"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-zinc-100" />
                <div>
                  <div className="h-4 w-36 bg-zinc-100 rounded-md" />
                  <div className="h-3 w-20 bg-zinc-50 rounded-md mt-2" />
                </div>
              </div>
              <div className="h-6 w-14 bg-zinc-100 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200/60 bg-red-50/50 p-4 text-center">
        <p className="text-red-600 font-medium text-sm">Something went wrong</p>
        <p className="text-red-400 text-xs mt-1">{error}</p>
      </div>
    );
  }

  if (!results) return null;

  if (results.results.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200/60 bg-white p-8 text-center">
        <p className="text-zinc-500 font-medium text-sm">No hack paths found</p>
        <p className="text-zinc-400 text-xs mt-1">
          Try selecting different ingredients
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
        Best Hack Paths ({results.results.length})
      </h2>
      {results.results.map((result, i) => (
        <HackResultCard key={result.menuItem.productCode} result={result} rank={i + 1} />
      ))}
    </div>
  );
}
