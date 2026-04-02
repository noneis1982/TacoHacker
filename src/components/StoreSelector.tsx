"use client";

import type { Store } from "@/types/store";

interface StoreSelectorProps {
  stores: Store[];
  onSelect: (store: Store) => void;
}

export function StoreSelector({ stores, onSelect }: StoreSelectorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
        Select a location
      </h2>
      <div className="space-y-1.5">
        {stores.map((store) => (
          <button
            key={store.id}
            onClick={() => onSelect(store)}
            className="w-full text-left rounded-full border border-zinc-200/80 bg-white px-5 py-3.5
                       hover:border-purple-300 hover:shadow-md hover:shadow-purple-500/5
                       transition-all group card-hover"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-zinc-800 group-hover:text-purple-700 truncate text-sm">
                  {store.name}
                </p>
                <p className="text-xs text-zinc-400 truncate mt-0.5">
                  {store.address}, {store.city}, {store.state} {store.zip}
                </p>
              </div>
              {store.distanceMiles > 0 && (
                <span className="shrink-0 text-[10px] font-medium text-zinc-400 bg-zinc-100 rounded-full px-2 py-0.5">
                  {store.distanceMiles.toFixed(1)} mi
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
