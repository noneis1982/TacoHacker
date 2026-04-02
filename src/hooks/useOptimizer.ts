"use client";

import { useState, useCallback } from "react";
import type { ItemType, OptimizeResponse } from "@/types/optimizer";

export function useOptimizer() {
  const [results, setResults] = useState<OptimizeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const optimize = useCallback(
    async (storeId: string, desiredIngredientCodes: string[], itemType: ItemType = "any") => {
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
      } catch (err) {
        setError(err instanceof Error ? err.message : "Optimization failed");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { results, error, isLoading, optimize };
}
