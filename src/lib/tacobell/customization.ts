import type { Ingredient, MenuItem, Modifier } from "@/types/menu";
import { normalizeIngredient } from "./constants";

/* eslint-disable @typescript-eslint/no-explicit-any */

function priceToCents(val: number | undefined): number {
  if (!val) return 0;
  return Math.round(val * 100);
}

function buildIngredient(name: string): Ingredient {
  const { code, category } = normalizeIngredient(name);
  return { code, name, category };
}

function parseVariantModifiers(
  options: any[],
  sectionType: "include" | "addon" | "protein" | "sauce" | "shell" | "upgrade"
): { defaults: Ingredient[]; modifiers: Modifier[] } {
  const defaults: Ingredient[] = [];
  const modifiers: Modifier[] = [];
  const seenDefaults = new Set<string>();

  for (const opt of options) {
    if (typeof opt !== "object" || !opt) continue;
    const optName = opt.name || "";
    if (!optName) continue;

    const ingredient = buildIngredient(optName);
    const variants: any[] = opt.variantOptions || [];

    // For includeOptions, the item is a default ingredient
    if (sectionType === "include" && !seenDefaults.has(ingredient.code)) {
      seenDefaults.add(ingredient.code);
      defaults.push(ingredient);
    }

    for (const v of variants) {
      const modType = (v.modifierType || "").toUpperCase();
      const vCode = v.code || "";
      const vPrice = priceToCents(v.priceData?.value);

      let action: Modifier["action"];
      switch (modType) {
        case "ADD":
          action = "add";
          break;
        case "MINUS":
        case "REMOVE":
          action = "remove";
          break;
        case "EXTRA":
          action = "extra";
          break;
        case "EASY":
          // "Easy" means less of something — not useful for our optimizer
          continue;
        case "SWAP":
          action = "swap";
          break;
        default:
          action = "add";
      }

      // For proteinOptions with modifierType ADD and price 0, it's the default protein
      if (sectionType === "protein" && action === "add" && vPrice === 0) {
        if (!seenDefaults.has(ingredient.code)) {
          seenDefaults.add(ingredient.code);
          defaults.push(ingredient);
        }
      }

      modifiers.push({
        code: vCode,
        name: optName,
        ingredientCode: ingredient.code,
        groupType: sectionType === "include" ? "included" : "modifier",
        action,
        priceDelta: action === "remove" ? 0 : vPrice, // TB doesn't give credits for removals
      });
    }
  }

  return { defaults, modifiers };
}

export function parseProductPage(
  nextData: Record<string, unknown>,
  fallbackName: string,
  fallbackPrice: number
): MenuItem | null {
  const pageProps = (nextData as any)?.props?.pageProps;
  if (!pageProps) return null;

  const product = pageProps.product || pageProps.customizedProduct;
  if (!product) return null;

  const productCode = product.code || "";
  const name = product.name || fallbackName;
  const basePrice =
    priceToCents(product.price?.value) || fallbackPrice;

  if (!productCode || basePrice === 0) return null;

  const opts = product.customizationOptions || {};
  const allDefaults: Ingredient[] = [];
  const allModifiers: Modifier[] = [];

  // Parse each section of customization options
  const sections: [string, "include" | "addon" | "protein" | "sauce" | "shell" | "upgrade"][] = [
    ["includeOptions", "include"],
    ["addonOptions", "addon"],
    ["proteinOptions", "protein"],
    ["sauceOptions", "sauce"],
    ["shellOptions", "shell"],
    ["upgradeOptions", "upgrade"],
  ];

  for (const [key, type] of sections) {
    const items = opts[key];
    if (!Array.isArray(items)) continue;
    const { defaults, modifiers } = parseVariantModifiers(items, type);
    allDefaults.push(...defaults);
    allModifiers.push(...modifiers);
  }

  // Determine category from URL, then fall back to name-based heuristics
  const url = product.url || "";
  const nameLower = name.toLowerCase();
  let category = "Other";
  if (url.includes("/tacos/")) category = "Tacos";
  else if (url.includes("/burritos/")) category = "Burritos";
  else if (url.includes("/quesadillas/")) category = "Quesadillas";
  else if (url.includes("/specialties/") || url.includes("/sides/"))
    category = "Specialties";
  else if (url.includes("/nachos/")) category = "Nachos";

  // Items from /deals-and-combos/ or /luxe-value-menu/ need name-based categorization
  if (category === "Other") {
    if (/taco/i.test(nameLower)) category = "Tacos";
    else if (/burrito/i.test(nameLower)) category = "Burritos";
    else if (/quesadilla|flatbread/i.test(nameLower)) category = "Quesadillas";
    else if (/nacho|fries/i.test(nameLower)) category = "Nachos";
    else if (/crunchwrap|pizza|chalupa|gordita|salad|nugget|stacker|griller|roll/i.test(nameLower))
      category = "Specialties";
  }

  return {
    productCode,
    name,
    basePrice,
    category,
    defaultIngredients: allDefaults,
    availableModifiers: allModifiers,
  };
}
