"use client";

import type { ItemType } from "@/types/optimizer";
import { cn } from "@/lib/utils";

interface ItemTypePickerProps {
  value: ItemType;
  onChange: (type: ItemType) => void;
}

const ITEM_TYPES: { value: ItemType; label: string; icon: string }[] = [
  { value: "any", label: "Any", icon: "🔄" },
  { value: "Tacos", label: "Taco", icon: "🌮" },
  { value: "Burritos", label: "Burrito", icon: "🌯" },
  { value: "Quesadillas", label: "Quesadilla", icon: "🫓" },
  { value: "Specialties", label: "Specialty", icon: "⭐" },
  { value: "Nachos", label: "Nachos", icon: "🧀" },
];

export function ItemTypePicker({ value, onChange }: ItemTypePickerProps) {
  return (
    <div>
      <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2.5">
        I want a...
      </h3>
      <div className="flex flex-wrap gap-2">
        {ITEM_TYPES.map((type) => {
          const isSelected = value === type.value;
          return (
            <button
              key={type.value}
              onClick={() => onChange(type.value)}
              className={cn(
                "rounded-full border px-4 py-2.5 text-sm font-medium transition-all inline-flex items-center gap-1.5",
                isSelected
                  ? "gradient-btn text-white border-transparent shadow-md shadow-purple-500/20"
                  : "bg-white border-zinc-200/80 text-zinc-600 hover:border-purple-300 hover:shadow-sm"
              )}
            >
              <span className="text-base">{type.icon}</span>
              <span>{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
