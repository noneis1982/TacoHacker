import type { Ingredient, StoreMenu } from "@/types/menu";
import type { HackResult, HackStep, ItemType } from "@/types/optimizer";
import { normalizeIngredient } from "@/lib/tacobell/constants";

const MISSING_PENALTY = 100_00; // $100 in cents — pushes incomplete results to bottom
const MAX_RESULTS = 10;

function lookupIngredient(code: string, ingredientMap: Map<string, Ingredient>): Ingredient {
  const existing = ingredientMap.get(code);
  if (existing) return existing;
  const { category } = normalizeIngredient(code);
  return { code, name: code, category };
}

function setIntersection<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of a) if (b.has(item)) result.add(item);
  return result;
}

function setDifference<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of a) if (!b.has(item)) result.add(item);
  return result;
}

export function optimize(
  menu: StoreMenu,
  desiredCodes: string[],
  itemType: ItemType = "any"
): HackResult[] {
  const desired = new Set(desiredCodes);
  if (desired.size === 0) return [];

  // Build lookup map from menu ingredients
  const ingredientMap = new Map<string, Ingredient>();
  for (const ing of menu.ingredients) {
    ingredientMap.set(ing.code, ing);
  }

  // Filter items by type if specified
  const itemPool =
    itemType === "any"
      ? menu.items
      : menu.items.filter((item) => item.category === itemType);

  const results: HackResult[] = [];

  for (const item of itemPool) {
    const steps: HackStep[] = [];
    const defaultCodes = new Set(item.defaultIngredients.map((i) => i.code));

    // 1. Which desired ingredients does this item already have?
    const alreadyHave = setIntersection(defaultCodes, desired);
    const needToAdd = setDifference(desired, defaultCodes);
    const unwanted = setDifference(defaultCodes, desired);

    // 2. Mark "keep" steps for ingredients we want that are already included
    for (const code of alreadyHave) {
      steps.push({
        action: "keep",
        ingredient: lookupIngredient(code, ingredientMap),
        priceDelta: 0,
      });
    }

    // 3. Try to add each missing ingredient via modifiers
    let addCost = 0;
    const missing: Ingredient[] = [];

    for (const code of needToAdd) {
      const addCandidates = item.availableModifiers.filter(
        (m) =>
          m.ingredientCode === code &&
          (m.action === "add" || m.action === "extra" || m.action === "swap")
      );

      if (addCandidates.length > 0) {
        const cheapest = addCandidates.reduce((min, c) =>
          c.priceDelta < min.priceDelta ? c : min
        );
        steps.push({
          action: "add",
          ingredient: lookupIngredient(code, ingredientMap),
          modifier: cheapest,
          priceDelta: cheapest.priceDelta,
        });
        addCost += cheapest.priceDelta;
      } else {
        missing.push(lookupIngredient(code, ingredientMap));
      }
    }

    // 4. Track removals for unwanted default ingredients
    //    TB doesn't give price credits, but the user needs to know what to
    //    ask to remove when ordering, and items with fewer unwanted defaults
    //    should rank higher (less hassle).
    for (const code of unwanted) {
      const removeMod = item.availableModifiers.find(
        (m) => m.ingredientCode === code && m.action === "remove"
      );
      steps.push({
        action: "remove",
        ingredient: lookupIngredient(code, ingredientMap),
        modifier: removeMod,
        priceDelta: 0,
      });
    }

    // 5. Score: price + penalties for missing ingredients only
    const totalPrice = item.basePrice + addCost;
    const score = totalPrice + missing.length * MISSING_PENALTY;

    results.push({
      menuItem: item,
      steps,
      totalPrice: Math.max(0, totalPrice),
      missingIngredients: missing,
      score,
    });
  }

  // 6. Sort by score (lower is better) and return top N
  results.sort((a, b) => a.score - b.score);
  return results.slice(0, MAX_RESULTS);
}
