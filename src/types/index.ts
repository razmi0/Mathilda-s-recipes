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
};

// { state: RecipeType[]; action: ({ id, value }: { id: number; value: boolean; }) => void; }
export type Panier = {
  label: string;
  quantity: number;
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
  date: Date;
  citation?: string;
  description: string;
  ingredients: Array<{ label: string; quantity: number }>;
  nbrOfIngredients?: number;
  steps: string[];
  isSelected: boolean;
  isLoading: boolean;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
