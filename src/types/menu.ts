export type IngredientCategory =
  | "protein"
  | "cheese"
  | "sauce"
  | "vegetable"
  | "shell"
  | "rice"
  | "beans"
  | "extra"
  | "other";

export interface Ingredient {
  code: string;
  name: string;
  category: IngredientCategory;
}

export interface Modifier {
  code: string;
  name: string;
  ingredientCode: string;
  groupType: "included" | "modifier";
  action: "add" | "remove" | "swap" | "extra";
  priceDelta: number; // cents
}

export interface MenuItem {
  productCode: string;
  name: string;
  basePrice: number; // cents
  category: string;
  defaultIngredients: Ingredient[];
  availableModifiers: Modifier[];
}

export interface StoreMenu {
  storeId: string;
  fetchedAt: number;
  items: MenuItem[];
  ingredients: Ingredient[];
}
