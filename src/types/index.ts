import { RecipeType } from "../hooks/useRecipe";

export interface RecipesProps {
  selectRecipe: (checked: boolean, id: number) => void;
  recipes: RecipeType[];
}
export type Panier = {
  ingredient: string;
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
export type SelectedMeal = {
  id: number;
  name: string;
  steps: string[];
  isLoading: boolean;
  isSelected: boolean;
  ingredients: string[];
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
