"use client";

import type { Ingredient, IngredientCategory } from "@/types/menu";
import { cn } from "@/lib/utils";

interface IngredientPickerProps {
  ingredients: Ingredient[];
  selected: Set<string>;
  onToggle: (code: string) => void;
}

const CATEGORY_ORDER: IngredientCategory[] = [
  "protein",
  "cheese",
  "sauce",
  "vegetable",
  "shell",
  "rice",
  "beans",
  "extra",
  "other",
];

const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  protein: "Proteins",
  cheese: "Cheese",
  sauce: "Sauces",
  vegetable: "Veggies",
  shell: "Shells & Tortillas",
  rice: "Rice",
  beans: "Beans",
  extra: "Extras",
  other: "Other",
};

const CATEGORY_ACCENT: Record<IngredientCategory, { selected: string; idle: string }> = {
  protein: { selected: "bg-red-500 text-white border-red-500 shadow-red-500/20", idle: "text-red-600 border-red-200 hover:bg-red-50" },
  cheese: { selected: "bg-amber-500 text-white border-amber-500 shadow-amber-500/20", idle: "text-amber-600 border-amber-200 hover:bg-amber-50" },
  sauce: { selected: "bg-orange-500 text-white border-orange-500 shadow-orange-500/20", idle: "text-orange-600 border-orange-200 hover:bg-orange-50" },
  vegetable: { selected: "bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/20", idle: "text-emerald-600 border-emerald-200 hover:bg-emerald-50" },
  shell: { selected: "bg-yellow-600 text-white border-yellow-600 shadow-yellow-600/20", idle: "text-yellow-700 border-yellow-200 hover:bg-yellow-50" },
  rice: { selected: "bg-stone-500 text-white border-stone-500 shadow-stone-500/20", idle: "text-stone-600 border-stone-200 hover:bg-stone-50" },
  beans: { selected: "bg-stone-500 text-white border-stone-500 shadow-stone-500/20", idle: "text-stone-600 border-stone-200 hover:bg-stone-50" },
  extra: { selected: "bg-violet-500 text-white border-violet-500 shadow-violet-500/20", idle: "text-violet-600 border-violet-200 hover:bg-violet-50" },
  other: { selected: "bg-zinc-500 text-white border-zinc-500 shadow-zinc-500/20", idle: "text-zinc-600 border-zinc-200 hover:bg-zinc-50" },
};

export function IngredientPicker({
  ingredients,
  selected,
  onToggle,
}: IngredientPickerProps) {
  const groups = new Map<IngredientCategory, Ingredient[]>();
  for (const ing of ingredients) {
    const list = groups.get(ing.category) || [];
    list.push(ing);
    groups.set(ing.category, list);
  }

  return (
    <div className="space-y-4">
      {CATEGORY_ORDER.filter((cat) => groups.has(cat)).map((cat) => (
        <div key={cat}>
          <h4 className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5 pl-1">
            {CATEGORY_LABELS[cat]}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {groups.get(cat)!.map((ing) => {
              const isSelected = selected.has(ing.code);
              const accent = CATEGORY_ACCENT[cat];
              return (
                <button
                  key={ing.code}
                  onClick={() => onToggle(ing.code)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    isSelected
                      ? `${accent.selected} shadow-md`
                      : `bg-white ${accent.idle}`
                  )}
                >
                  {ing.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
