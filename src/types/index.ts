type SortFunction<T> = (a: T, b: T) => number;

interface ExtendedArray<T> {
  toSorted(fn?: SortFunction<T>): T[];
  toReversed(): T[];
}

// Type polyfill for Array.prototype.toSorted method & Array.prototype.toReversed method
declare global {
  interface Array<T> extends ExtendedArray<T> {
    toSorted(fn?: SortFunction<T>): T[];
    toReversed(): T[];
  }
}

export type RecipesTableProps = {
  recipes: RecipeType[];
  select: ({ id, value }: { id: number; value: boolean }) => void;
  deleteRecipe: (id: number) => void;
};

export type Instructions = {
  name: string;
  steps: string[];
};
export type Message = {
  role: string;
  content: string;
};

// Recipe type :
export type RecipeType = {
  id: number;
  name: string;
  date: string;
  citation?: string;
  description: string;
  ingredients: IngredientType[];
  nbrOfIngredients?: number;
  steps: string[];
  isSelected: boolean;
  isLoading: boolean;
};

export type FoodType =
  | "meat"
  | "fish"
  | "vegetable"
  | "fruit"
  | "dairy"
  | "fat"
  | "starchy"
  | "sweet"
  | "drink"
  | "other";
export type FoodColors =
  | "#ee5c5b"
  | "#337f95"
  | "#449c75"
  | "#f39c40"
  | "#3390d1"
  | "#fbd94f"
  | "#a96133"
  | "#ed5aa5"
  | "#FFFFFF"
  | "#90cbef";

export type IngredientType = {
  label: string;
  quantity: number;
  type: FoodType;
  color: FoodColors;
  value: string;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
