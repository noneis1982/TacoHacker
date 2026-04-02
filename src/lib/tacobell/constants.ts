import type { IngredientCategory } from "@/types/menu";

export const TB_BASE_URL = "https://www.tacobell.com";

export const TB_HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

// Real product codes and their page URLs (scraped from tacobell.com)
// Format: [productCode, displayName, basePrice (cents), pageUrl]
export const PRODUCT_CATALOG: [string, string, number, string][] = [
  // Tacos
  ["22100", "Crunchy Taco", 199, "/food/tacos/crunchy-taco"],
  ["22101", "Crunchy Taco Supreme", 289, "/food/tacos/crunchy-taco-supreme"],
  ["22110", "Soft Taco", 199, "/food/tacos/soft-taco"],
  ["22111", "Soft Taco Supreme", 289, "/food/tacos/soft-taco-supreme"],
  ["22172", "Doritos Locos Taco", 289, "/food/tacos/nacho-cheese-doritos-locos-tacos"],
  ["22173", "Doritos Locos Taco Supreme", 359, "/food/tacos/nacho-cheese-doritos-locos-tacos-supreme"],
  ["22813", "Cheesy Gordita Crunch", 549, "/food/specialties/cheesy-gordita-crunch"],
  ["22850", "Chalupa Supreme", 549, "/food/specialties/chalupa-supreme"],
  ["23153", "Black Bean Chalupa Supreme", 519, "/food/specialties/black-bean-chalupa"],
  ["23470", "Cantina Chicken Soft Taco", 299, "/food/deals-and-combos/cantina-chicken-soft-taco"],
  ["23471", "Cantina Chicken Crispy Taco", 299, "/food/deals-and-combos/cantina-chicken-crispy-taco"],
  ["24067", "Doritos Cheesy Gordita Crunch", 599, "/food/tacos/doritos-cheesy-gordita-crunch"],

  // Burritos
  ["22200", "Bean Burrito", 199, "/food/burritos/bean-burrito"],
  ["22167", "Beefy 5-Layer Burrito", 399, "/food/burritos/beefy-5-layer-burrito"],
  ["22201", "Burrito Supreme", 569, "/food/burritos/burrito-supreme"],
  ["22283", "Cheesy Bean and Rice Burrito", 149, "/food/luxe-value-menu/cheesy-bean-and-rice-burrito"],
  ["23226", "Cheesy Double Beef Burrito", 299, "/food/burritos/cheesy-double-beef-burrito"],
  ["23290", "Black Bean Grilled Cheese Burrito", 499, "/food/burritos/black-bean-grilled-cheese-burrito"],
  ["23472", "Cantina Chicken Burrito", 599, "/food/deals-and-combos/cantina-chicken-burrito"],

  // Specialties
  ["22362", "Crunchwrap Supreme", 679, "/food/specialties/crunchwrap-supreme"],
  ["26051", "Black Bean Crunchwrap Supreme", 589, "/food/specialties/black-bean-crunchwrap-supreme"],
  ["22303", "Mexican Pizza", 569, "/food/specialties/mexican-pizza"],
  ["23326", "Veggie Mexican Pizza", 549, "/food/specialties/veggie-mexican-pizza"],
  ["22152", "Cheesy Roll Up", 139, "/food/sides/cheesy-roll-up"],
  ["22259", "Spicy Potato Soft Taco", 139, "/food/luxe-value-menu/spicy-potato-soft-taco"],
  ["25500", "Avocado Ranch Chicken Stacker", 299, "/food/specialties/avocado-ranch-chicken-stacker"],
  ["25501", "Beefy Potato Loaded Griller", 279, "/food/specialties/beefy-potato-loaded-griller"],
  ["25502", "Mini Taco Salad", 249, "/food/specialties/mini-taco-salad"],
  ["23793", "Creamy Chipotle Chicken Crunchwrap Slider", 269, "/food/specialties/creamy-chipotle-crispy-chicken-crunchwrap-slider"],
  ["23843", "Jalapeno Honey Mustard Chicken Crunchwrap Slider", 269, "/food/specialties/jalapeno-honey-mustard-crispy-chicken-crunchwrap-slider"],
  ["23499", "3 Cheese Chicken Flatbread Melt", 239, "/food/quesadillas/3-cheese-chicken-flatbread-melt"],

  // Quesadillas
  ["22320", "Cheese Quesadilla", 549, "/food/quesadillas/cheese-quesadilla"],
  ["22321", "Chicken Quesadilla", 589, "/food/quesadillas/chicken-quesadilla"],
  ["22322", "Steak Quesadilla", 639, "/food/quesadillas/steak-quesadilla"],
  ["29158", "Cantina Chicken Rolled Quesadilla", 699, "/food/deals-and-combos/cantina-chicken-rolled-quesadilla"],
];

// Category page URLs to scrape product listings from
export const CATEGORY_URLS = [
  "/food/tacos",
  "/food/burritos",
  "/food/quesadillas",
  "/food/nachos-and-sides",
  "/food/specialties",
  "/food/veggie-cravings",
];

// Ingredient normalization: maps modifier names to canonical IDs
export const INGREDIENT_KEYWORDS: [RegExp, string, IngredientCategory][] = [
  [/^Seasoned Beef$/i, "seasoned-beef", "protein"],
  [/^Chicken$/i, "chicken", "protein"],
  [/^Grilled Chicken$/i, "chicken", "protein"],
  [/^Slow-Roasted Chicken$/i, "slow-roasted-chicken", "protein"],
  [/^Steak$/i, "steak", "protein"],
  [/^Beans$/i, "beans", "beans"],
  [/^Refried Beans$/i, "beans", "beans"],
  [/^Black Beans$/i, "black-beans", "beans"],
  [/^Seasoned Rice$/i, "seasoned-rice", "rice"],
  [/^Cheese$/i, "cheese", "cheese"],
  [/^Cheddar Cheese$/i, "cheese", "cheese"],
  [/^Three-Cheese Blend$/i, "three-cheese-blend", "cheese"],
  [/^Nacho Cheese Sauce$/i, "nacho-cheese-sauce", "cheese"],
  [/^Reduced-Fat Sour Cream$/i, "sour-cream", "sauce"],
  [/^Sour Cream$/i, "sour-cream", "sauce"],
  [/^Creamy Jalape.o Sauce$/i, "creamy-jalapeno-sauce", "sauce"],
  [/^Spicy Ranch$/i, "spicy-ranch", "sauce"],
  [/^Avocado Ranch/i, "avocado-ranch", "sauce"],
  [/^Chipotle Sauce$/i, "chipotle-sauce", "sauce"],
  [/^Red Sauce$/i, "red-sauce", "sauce"],
  [/^Mexican Pizza Sauce$/i, "pizza-sauce", "sauce"],
  [/^Guacamole$/i, "guacamole", "sauce"],
  [/^Jalape.o Honey Mustard/i, "jalapeno-honey-mustard", "sauce"],
  [/^Lettuce$/i, "lettuce", "vegetable"],
  [/^Tomatoes$/i, "tomatoes", "vegetable"],
  [/^Onions$/i, "onions", "vegetable"],
  [/^Pico De Gallo$/i, "pico-de-gallo", "vegetable"],
  [/^Jalape.o Peppers$/i, "jalapenos", "vegetable"],
  [/^Purple Cabbage$/i, "purple-cabbage", "vegetable"],
  [/^Potatoes$/i, "potatoes", "extra"],
  [/^Fiesta Strips$/i, "fiesta-strips", "extra"],
  [/^Seasoned Fries$/i, "seasoned-fries", "extra"],
];

// Fallback category guessing
export const CATEGORY_PATTERNS: [RegExp, IngredientCategory][] = [
  [/beef|chicken|steak|pork|bacon/i, "protein"],
  [/cheese|queso/i, "cheese"],
  [/sauce|cream|ranch|mayo|chipotle|guac/i, "sauce"],
  [/lettuce|tomato|onion|jalapeno|pico|cabbage/i, "vegetable"],
  [/shell|tortilla|flatbread|tostada|doritos/i, "shell"],
  [/rice/i, "rice"],
  [/bean/i, "beans"],
  [/potato|fries|strip/i, "extra"],
];

export function normalizeIngredient(
  name: string
): { code: string; category: IngredientCategory } {
  for (const [regex, code, category] of INGREDIENT_KEYWORDS) {
    if (regex.test(name)) {
      return { code, category };
    }
  }
  // Fallback: slugify the name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  for (const [regex, category] of CATEGORY_PATTERNS) {
    if (regex.test(name)) {
      return { code: slug, category };
    }
  }
  return { code: slug, category: "other" };
}
