"use client";

import { useState } from "react";
import type { HackResult } from "@/types/optimizer";
import { formatPrice, formatPriceDelta } from "@/lib/utils";

interface HackResultCardProps {
  result: HackResult;
  rank: number;
}

export function HackResultCard({ result, rank }: HackResultCardProps) {
  const [expanded, setExpanded] = useState(false);

  const addSteps = result.steps.filter((s) => s.action === "add");
  const removeSteps = result.steps.filter((s) => s.action === "remove");
  const keepSteps = result.steps.filter((s) => s.action === "keep");
  const hasMissing = result.missingIngredients.length > 0;

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-all card-hover ${
        hasMissing
          ? "border-amber-200/60 bg-amber-50/30"
          : "border-zinc-200/80 bg-white"
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <span
              className={`shrink-0 mt-0.5 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                rank === 1
                  ? "gradient-btn text-white shadow-sm shadow-purple-500/20"
                  : "bg-zinc-100 text-zinc-500"
              }`}
            >
              {rank}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-zinc-800 truncate text-sm">
                {result.menuItem.name}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Base: {formatPrice(result.menuItem.basePrice)}
                {addSteps.length > 0 && (
                  <span className="text-amber-500">
                    {" "}+{addSteps.length} add{addSteps.length > 1 ? "s" : ""}
                  </span>
                )}
                {removeSteps.length > 0 && (
                  <span className="text-zinc-400">
                    {" "}-{removeSteps.length} removal{removeSteps.length > 1 ? "s" : ""}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-bold gradient-text">
              {formatPrice(result.totalPrice)}
            </p>
            {hasMissing && (
              <p className="text-[10px] text-amber-500 font-medium">
                {result.missingIngredients.length} missing
              </p>
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-zinc-100/80 pt-3 space-y-3">
          {keepSteps.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                Already Included
              </p>
              <div className="flex flex-wrap gap-1">
                {keepSteps.map((s) => (
                  <span
                    key={s.ingredient.code}
                    className="rounded-md bg-zinc-100/80 px-2 py-0.5 text-[11px] text-zinc-500"
                  >
                    {s.ingredient.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {addSteps.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest mb-1.5">
                Add
              </p>
              {addSteps.map((s) => (
                <div
                  key={s.ingredient.code}
                  className="flex items-center justify-between py-0.5"
                >
                  <span className="text-sm text-zinc-600">
                    + {s.ingredient.name}
                  </span>
                  <span className="text-xs font-mono text-amber-500">
                    {formatPriceDelta(s.priceDelta)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {removeSteps.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                Ask to Remove
              </p>
              {removeSteps.map((s) => (
                <div
                  key={s.ingredient.code}
                  className="flex items-center justify-between py-0.5"
                >
                  <span className="text-sm text-zinc-400">
                    - {s.ingredient.name}
                  </span>
                  <span className="text-[10px] text-zinc-300">free</span>
                </div>
              ))}
            </div>
          )}

          {hasMissing && (
            <div>
              <p className="text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-1.5">
                Not Available
              </p>
              <div className="flex flex-wrap gap-1">
                {result.missingIngredients.map((ing) => (
                  <span
                    key={ing.code}
                    className="rounded-md bg-red-50 border border-red-200/60 px-2 py-0.5 text-[11px] text-red-500"
                  >
                    {ing.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2.5 border-t border-zinc-100/80">
            <span className="text-xs font-medium text-zinc-400">Total</span>
            <span className="text-lg font-bold gradient-text">
              {formatPrice(result.totalPrice)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
