import type { Ingredient, MenuItem, StoreMenu } from "@/types/menu";
import { getMenuCache, setMenuCache } from "@/lib/cache";
import { PRODUCT_CATALOG } from "./constants";
import { tbFetchBatch } from "./client";
import { parseProductPage } from "./customization";

export async function fetchStoreMenu(storeId: string): Promise<StoreMenu> {
  // Check cache first (keyed by storeId, but prices are national for now)
  const cacheKey = `menu:${storeId}`;
  const cached = getMenuCache<StoreMenu>(cacheKey);
  if (cached) return cached;

  // Fetch each product page to get customization data
  const paths = PRODUCT_CATALOG.map(([, , , url]) => url);

  const items: MenuItem[] = [];

  await tbFetchBatch<MenuItem>(paths, (data, index) => {
    if (!data) return null;
    const [, name, price] = PRODUCT_CATALOG[index];
    const item = parseProductPage(data, name, price);
    if (item) {
      items.push(item);
    }
    return item;
  });

  // Build de-duped ingredient list from all items
  const ingredientMap = new Map<string, Ingredient>();
  for (const item of items) {
    for (const ing of item.defaultIngredients) {
      if (!ingredientMap.has(ing.code)) {
        ingredientMap.set(ing.code, ing);
      }
    }
    for (const mod of item.availableModifiers) {
      if (
        !ingredientMap.has(mod.ingredientCode) &&
        mod.action === "add"
      ) {
        ingredientMap.set(mod.ingredientCode, {
          code: mod.ingredientCode,
          name: mod.name,
          category: ingredientMap.get(mod.ingredientCode)?.category || "other",
        });
      }
    }
  }

  // Fix categories from the ingredient normalization
  const { normalizeIngredient } = await import("./constants");
  for (const [code, ing] of ingredientMap) {
    if (ing.category === "other") {
      const normalized = normalizeIngredient(ing.name);
      if (normalized.category !== "other") {
        ingredientMap.set(code, { ...ing, category: normalized.category });
      }
    }
  }

  const menu: StoreMenu = {
    storeId,
    fetchedAt: Date.now(),
    items,
    ingredients: Array.from(ingredientMap.values()).sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    ),
  };

  setMenuCache(cacheKey, menu);
  return menu;
}
