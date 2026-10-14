"use client";

import { useState, useCallback } from "react";
import type { ItemType, OptimizeResponse } from "@/types/optimizer";
import { trackEvent } from "@/lib/analytics";

export function useOptimizer() {
  const [results, setResults] = useState<OptimizeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const optimize = useCallback(
    async (
      storeId: string,
      desiredIngredientCodes: string[],
      itemType: ItemType = "any",
      source: "custom" | "classic" = "custom"
    ) => {
      const dimensions = {
        item_type: itemType,
        ingredient_count: desiredIngredientCodes.length,
        source,
      };
      const startedAt = performance.now();
      trackEvent("optimization_started", dimensions);
      setIsLoading(true);
      setError(null);
      setResults(null);

      try {
        const res = await fetch("/api/optimize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ storeId, desiredIngredientCodes, itemType }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Request failed (${res.status})`);
        }

        const data: OptimizeResponse = await res.json();
        setResults(data);
        trackEvent("optimization_completed", {
          ...dimensions,
          result_count: data.results.length,
          duration_ms: Math.round(performance.now() - startedAt),
          complete_match_count: data.results.filter(
            (result) => result.missingIngredients.length === 0
          ).length,
        });
      } catch (err) {
        trackEvent("optimization_failed", {
          ...dimensions,
          duration_ms: Math.round(performance.now() - startedAt),
        });
        setError(err instanceof Error ? err.message : "Optimization failed");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { results, error, isLoading, optimize };
}
