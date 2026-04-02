import type { Ingredient, MenuItem, Modifier } from "./menu";

export interface HackStep {
  action: "keep" | "add" | "remove";
  ingredient: Ingredient;
  modifier?: Modifier;
  priceDelta: number; // cents
}

export interface HackResult {
  menuItem: MenuItem;
  steps: HackStep[];
  totalPrice: number; // cents
  missingIngredients: Ingredient[];
  score: number;
}

export type ItemType =
  | "any"
  | "Tacos"
  | "Burritos"
  | "Quesadillas"
  | "Specialties"
  | "Nachos";

export interface OptimizeRequest {
  storeId: string;
  desiredIngredientCodes: string[];
  itemType?: ItemType;
}

export interface OptimizeResponse {
  results: HackResult[];
  timestamp: number;
}
