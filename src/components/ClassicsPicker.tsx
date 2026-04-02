"use client";

import { useState } from "react";
import { CLASSIC_ITEMS, type ClassicItem } from "@/lib/classics";
import type { ItemType } from "@/types/optimizer";

interface ClassicsPickerProps {
  onSelect: (ingredients: string[], itemType: ItemType) => void;
  itemType: ItemType;
  availableIngredients: Set<string>;
}

export function ClassicsPicker({ onSelect, itemType, availableIngredients }: ClassicsPickerProps) {
  const [expanded, setExpanded] = useState(false);

  const filteredItems = CLASSIC_ITEMS.filter(
    (c) =>
      c.ingredients.length > 0 &&
      (itemType === "any" || c.itemType === itemType) &&
      c.ingredients.every((ing) => availableIngredients.has(ing))
  );

  function handleSelect(item: ClassicItem) {
    onSelect(item.ingredients, item.itemType);
    setExpanded(false);
  }

  if (filteredItems.length === 0) return null;

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left rounded-xl border border-purple-200/60 bg-gradient-to-r from-purple-50/80 to-pink-50/80
                   p-4 hover:from-purple-50 hover:to-pink-50 transition-all"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm gradient-text">
              Resurrect a Classic
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              {itemType === "any"
                ? `${filteredItems.length} discontinued items you can recreate`
                : `${filteredItems.length} discontinued ${itemType.toLowerCase()} to recreate`}
            </p>
          </div>
          <span className="text-purple-300 text-sm shrink-0 ml-2">
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="mt-2 space-y-1 max-h-80 overflow-y-auto rounded-xl border border-zinc-200/80 bg-white p-1.5">
          {filteredItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleSelect(item)}
              className="w-full text-left rounded-lg p-3 hover:bg-purple-50/70 transition-colors group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-zinc-800 group-hover:text-purple-700 text-sm">
                    {item.name}
                    <span className="text-zinc-300 font-normal ml-1.5 text-xs">
                      {item.year}
                    </span>
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-medium text-purple-400 bg-purple-50 rounded-full px-2 py-0.5">
                  {item.ingredients.length}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
