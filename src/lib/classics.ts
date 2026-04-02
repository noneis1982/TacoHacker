import type { ItemType } from "@/types/optimizer";

export interface ClassicItem {
  name: string;
  year: string;
  description: string;
  itemType: ItemType;
  ingredients: string[]; // canonical ingredient codes — must all be available on current menu
}

export const CLASSIC_ITEMS: ClassicItem[] = [
  {
    name: "Enchirito",
    year: "2013",
    description: "Beef, beans, and onions in a tortilla, smothered in red sauce and cheese.",
    itemType: "Burritos",
    ingredients: ["seasoned-beef", "beans", "onions", "red-sauce", "cheese"],
  },
  {
    name: "Meximelt",
    year: "2019",
    description: "Seasoned beef, pico de gallo, and melted three-cheese blend in a flour tortilla.",
    itemType: "Specialties",
    ingredients: ["seasoned-beef", "pico-de-gallo", "three-cheese-blend"],
  },
  {
    name: "Double Decker Taco",
    year: "2019",
    description: "A crunchy taco wrapped in a soft tortilla with beans as the glue.",
    itemType: "Tacos",
    ingredients: ["seasoned-beef", "cheese", "lettuce", "beans"],
  },
  {
    name: "Grilled Stuft Burrito",
    year: "2016",
    description: "Massive burrito with beef, rice, beans, sour cream, three-cheese, nacho cheese, and red sauce.",
    itemType: "Burritos",
    ingredients: ["seasoned-beef", "seasoned-rice", "beans", "sour-cream", "three-cheese-blend", "nacho-cheese-sauce", "red-sauce"],
  },
  {
    name: "Beefy Crunch Burrito",
    year: "2022",
    description: "Beef, seasoned rice, sour cream, and nacho cheese. (Minus the Flamin' Hot Fritos.)",
    itemType: "Burritos",
    ingredients: ["seasoned-beef", "seasoned-rice", "sour-cream", "nacho-cheese-sauce"],
  },
  {
    name: "XXL Grilled Stuft Burrito",
    year: "2015",
    description: "The biggest burrito — beef, three-cheese, rice, beans, guac, sour cream, and pico.",
    itemType: "Burritos",
    ingredients: ["seasoned-beef", "three-cheese-blend", "seasoned-rice", "beans", "guacamole", "sour-cream", "pico-de-gallo"],
  },
  {
    name: "Chili Cheese Burrito",
    year: "~1990s",
    description: "Simple and iconic — just beef and nacho cheese in a tortilla.",
    itemType: "Burritos",
    ingredients: ["seasoned-beef", "nacho-cheese-sauce"],
  },
  {
    name: "7-Layer Burrito",
    year: "2020",
    description: "Veggie classic: beans, rice, sour cream, guac, three-cheese, lettuce, and tomatoes.",
    itemType: "Burritos",
    ingredients: ["beans", "seasoned-rice", "sour-cream", "guacamole", "three-cheese-blend", "lettuce", "tomatoes"],
  },
  {
    name: "Spicy Tostada",
    year: "2020",
    description: "A flat crispy shell topped with beans, red sauce, cheese, and lettuce.",
    itemType: "Specialties",
    ingredients: ["beans", "red-sauce", "cheese", "lettuce"],
  },
  {
    name: "Loaded Potato Griller",
    year: "2020",
    description: "Potatoes, nacho cheese, and sour cream wrapped in a warm tortilla.",
    itemType: "Burritos",
    ingredients: ["potatoes", "nacho-cheese-sauce", "sour-cream"],
  },
  {
    name: "Beefy Nacho Griller",
    year: "2020",
    description: "Beef, nacho cheese, and fiesta strips in a warm tortilla.",
    itemType: "Burritos",
    ingredients: ["seasoned-beef", "nacho-cheese-sauce", "fiesta-strips"],
  },
  {
    name: "Triple Layer Nachos",
    year: "2020",
    description: "Simple nachos with beans, nacho cheese, and red sauce.",
    itemType: "Nachos",
    ingredients: ["beans", "nacho-cheese-sauce", "red-sauce"],
  },
];
