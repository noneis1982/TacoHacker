"use client";

import { useCallback, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { ItemTypePicker } from "@/components/ItemTypePicker";
import { IngredientPicker } from "@/components/IngredientPicker";
import { HackResultsList } from "@/components/HackResultsList";
import { ClassicsPicker } from "@/components/ClassicsPicker";
import { useMenu } from "@/hooks/useMenu";
import { useOptimizer } from "@/hooks/useOptimizer";
import type { ItemType } from "@/types/optimizer";

export default function StorePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCodes = searchParams.get("i")?.split(",").filter(Boolean) || [];
  const initialType = (searchParams.get("type") || "any") as ItemType;
  const [selected, setSelected] = useState<Set<string>>(
    new Set(initialCodes)
  );
  const [itemType, setItemType] = useState<ItemType>(initialType);

  const { menu, error: menuError, isLoading: menuLoading } = useMenu(storeId);
  const {
    results,
    error: optError,
    isLoading: optLoading,
    optimize,
  } = useOptimizer();

  const handleToggle = useCallback(
    (code: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(code)) next.delete(code);
        else next.add(code);
        return next;
      });

      requestAnimationFrame(() => {
        const url = new URL(window.location.href);
        const current = url.searchParams.get("i")?.split(",").filter(Boolean) || [];
        const set = new Set(current);
        if (set.has(code)) set.delete(code);
        else set.add(code);
        if (set.size > 0) {
          url.searchParams.set("i", Array.from(set).join(","));
        } else {
          url.searchParams.delete("i");
        }
        window.history.replaceState(null, "", url.toString());
      });
    },
    []
  );

  const handleItemTypeChange = (type: ItemType) => {
    setItemType(type);
    requestAnimationFrame(() => {
      const url = new URL(window.location.href);
      if (type !== "any") {
        url.searchParams.set("type", type);
      } else {
        url.searchParams.delete("type");
      }
      window.history.replaceState(null, "", url.toString());
    });
  };

  const handleClassicSelect = (ingredients: string[], type: ItemType) => {
    setSelected(new Set(ingredients));
    setItemType(type);
    optimize(storeId, ingredients, type);
    requestAnimationFrame(() => {
      const url = new URL(window.location.href);
      url.searchParams.set("i", ingredients.join(","));
      if (type !== "any") {
        url.searchParams.set("type", type);
      } else {
        url.searchParams.delete("type");
      }
      window.history.replaceState(null, "", url.toString());
    });
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const handleHack = () => {
    if (selected.size === 0) return;
    optimize(storeId, Array.from(selected), itemType);
    // Scroll to results after a short delay for them to render
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl px-4 py-6 flex-1 pb-24">
        {menuLoading && (
          <div className="text-center py-16">
            <div className="h-8 w-8 mx-auto animate-spin rounded-full border-[3px] border-purple-200 border-t-purple-600" />
            <p className="text-zinc-400 mt-4 text-sm">
              Loading menu for store #{storeId}
            </p>
            <p className="text-zinc-300 mt-1 text-xs">
              This may take a moment on first load
            </p>
          </div>
        )}

        {menuError && (
          <div className="rounded-xl border border-red-200/60 bg-red-50/50 p-4 text-center">
            <p className="text-red-600 font-medium text-sm">Failed to load menu</p>
            <p className="text-red-400 text-xs mt-1">{menuError}</p>
          </div>
        )}

        {menu && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-800 mb-1">
                Build your order
              </h2>
              <p className="text-sm text-zinc-400">
                Pick an item type, choose your ingredients, and we&apos;ll find the cheapest hack.
              </p>
            </div>

            <ItemTypePicker value={itemType} onChange={handleItemTypeChange} />

            <ClassicsPicker
              onSelect={handleClassicSelect}
              itemType={itemType}
              availableIngredients={new Set(menu.ingredients.map((i) => i.code))}
            />

            <div>
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2.5">
                With these ingredients
              </h3>
              <IngredientPicker
                ingredients={menu.ingredients}
                selected={selected}
                onToggle={handleToggle}
              />
            </div>

            <div id="results">
              <HackResultsList
                results={results}
                isLoading={optLoading}
                error={optError}
              />
            </div>
          </div>
        )}
      </main>

      {/* Sticky hack button */}
      {menu && selected.size > 0 && (
        <div
          className="fixed bottom-0 inset-x-0 border-t border-zinc-200/60 p-4 z-40"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(150px)", WebkitBackdropFilter: "blur(150px)" }}
        >
          <div className="mx-auto max-w-2xl">
            <button
              onClick={handleHack}
              disabled={optLoading}
              className="w-full rounded-full gradient-btn py-4 text-base font-bold text-white
                         disabled:opacity-40 transition-all
                         shadow-lg shadow-purple-500/25 active:scale-[0.98]"
            >
              {optLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Hacking...
                </span>
              ) : (
                `Hack It! (${selected.size} ingredient${selected.size !== 1 ? "s" : ""})`
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
