import { useCallback, useMemo, useReducer } from "react";
import { toast } from "sonner";
import { recipes } from "../data";
import type { IngredientType, RecipeType } from "../types";
import { Prettify } from "../types/index";

// Define the state and action types

export type AddRecipePayload = {
  name: string;
  description: string;
  ingredients: RecipeType["ingredients"];
};

export type EditRecipePayload = {
  id: number & RecipeType["id"];
} & Omit<Partial<RecipeType>, "id">;
type Actions =
  | { type: "ADD_RECIPE"; payload: AddRecipePayload }
  | { type: "DELETE_RECIPE"; payload: number & RecipeType["id"] }
  | { type: "EDIT_RECIPE"; payload: EditRecipePayload }
  | { type: "SELECT_RECIPE"; payload: { id: number & RecipeType["id"]; value: boolean & RecipeType["isSelected"] } }
  | { type: "LOADING_RECIPE"; payload: { id: number & RecipeType["id"]; value: boolean & RecipeType["isLoading"] } };

type Diffs = {
  name: boolean;
  description: boolean;
  ingredients: { quantity: (number | string)[]; label: string[]; isDifferent: boolean };
};

// Reducer
const recipeReducer = (state: { recipes: RecipeType[] }, action: Actions) => {
  switch (action.type) {
    case "ADD_RECIPE": {
      const buildId = (): number => {
        const newId = state.recipes.length + 1;
        if (state.recipes.find((recipe) => recipe.id === newId)) {
          return buildId();
        }
        return newId;
      };

      const newRecipe: RecipeType = {
        id: buildId(),
        ...action.payload,
        date: new Date().toString(),
        citation: "",
        nbrOfIngredients: action.payload.ingredients.length,
        steps: [],
        isSelected: false,
        isLoading: false,
      };

      toast.info(`Recipe added successfully`, {
        className: "bg-darkblue-100 text-def-100",
      });

      return {
        ...state,
        recipes: [...state.recipes, newRecipe],
      };
    }
    case "DELETE_RECIPE":
      toast.info(`Recipe deleted`);
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    case "EDIT_RECIPE": {
      const findDifference = (oldRecipe: RecipeType, newRecipe: EditRecipePayload): Diffs => {
        const name = oldRecipe.name !== newRecipe.name;
        const description = oldRecipe.description !== newRecipe.description;
        const ingredients: Diffs["ingredients"] = (() => {
          const diffs: Diffs["ingredients"] = {
            quantity: [],
            label: [],
            isDifferent: false,
          };

          if (!newRecipe.ingredients) return diffs;

          const delta = oldRecipe.ingredients.length - (newRecipe.ingredients?.length || 0);
          const deltaQ =
            oldRecipe.ingredients.reduce((acc, cur) => acc + cur.quantity, 0) -
            (newRecipe.ingredients?.reduce((acc, cur) => acc + cur.quantity, 0) || 0);

          const oldIsDifferent = oldRecipe.ingredients.some((ing) => {
            if (!newRecipe.ingredients) return true;
            return !newRecipe.ingredients.find((newIng) => newIng.label === ing.label);
          });

          const newIsDifferent = newRecipe.ingredients.some((ing) => {
            return !oldRecipe.ingredients.find((oldIng) => oldIng.label === ing.label);
          });

          // ingredient has been removed or added || quantity of ingredient has been modified
          if (delta !== 0 || deltaQ !== 0 || oldIsDifferent || newIsDifferent) diffs.isDifferent = true;

          if (diffs.isDifferent) {
            // ingredient has been removed
            if (delta > 0 || oldIsDifferent) {
              for (const ing of oldRecipe.ingredients) {
                if (!newRecipe.ingredients.find((newIng) => newIng.label === ing.label)) {
                  diffs.label.push(ing.label);
                  diffs.quantity.push(ing.quantity * -1);
                }
              }
            }
            // ingredient has been added
            if (delta < 0 || newIsDifferent) {
              for (const ing of newRecipe.ingredients) {
                if (!oldRecipe.ingredients.find((oldIng) => oldIng.label === ing.label)) {
                  diffs.label.push(ing.label);
                  diffs.quantity.push("+" + ing.quantity);
                }
              }
            }
          }
          return diffs;
        })();
        return { name, description, ingredients };
      };

      const editedRecipeIndex = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
      const oldRecipe = state.recipes[editedRecipeIndex];
      const differences = findDifference(oldRecipe, action.payload);

      const newRecipe = { ...state.recipes[editedRecipeIndex], ...action.payload };

      const description = [
        differences.name && "Name",
        differences.description && "description",
        differences.ingredients.isDifferent &&
          "ingredients : \n" +
            [
              ...differences.ingredients.label.map(
                (label, i) => `\n ${label} (${differences.ingredients.quantity[i]})`
              ),
            ],
      ].filter(Boolean) as string[];

      const formated =
        description.length === 1
          ? description[0].charAt(0).toUpperCase() + description[0].slice(1)
          : description.length === 2
          ? `${description[0].charAt(0).toUpperCase() + description[0].slice(1)} and ${description[1]}`
          : description.length === 3
          ? (() => {
              const last = description.pop();
              const first = description[0].charAt(0).toUpperCase() + description[0].slice(1);
              return `${first}, ${description.slice(1).join(", ")} and ${last}`;
            })()
          : "";

      toast.info("Modified fields succesfully: ", {
        className: "text-def-100 bg-darkblue-400",
        description: description.length ? formated : "No changes",
        duration: description.length > 2 ? 5000 : undefined,
      });

      return {
        ...state,
        recipes: [
          ...state.recipes.slice(0, editedRecipeIndex),
          newRecipe,
          ...state.recipes.slice(editedRecipeIndex + 1),
        ],
      };
    }
    case "SELECT_RECIPE":
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? { ...recipe, isSelected: action.payload.value } : recipe
        ),
      };
    case "LOADING_RECIPE":
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? { ...recipe, isLoading: action.payload.value } : recipe
        ),
      };
    default:
      return state;
  }
};

// hook
export const useRecipe = () => {
  const [state, dispatch] = useReducer(recipeReducer, { recipes });

  const addRecipe = useCallback((recipe: Prettify<AddRecipePayload>) => {
    dispatch({ type: "ADD_RECIPE", payload: recipe });
  }, []);

  const deleteRecipe = useCallback((id: number) => {
    dispatch({ type: "DELETE_RECIPE", payload: id });
  }, []);

  const editRecipe = useCallback((modifs: Prettify<EditRecipePayload>) => {
    dispatch({ type: "EDIT_RECIPE", payload: modifs });
  }, []);

  const getRecipe = useCallback(
    (id: number) => {
      return state.recipes.find((recipe) => recipe.id === id);
    },
    [state.recipes]
  );

  const loadRecipe = useCallback(
    ({ id, value }: { id: number & RecipeType["id"]; value: boolean & RecipeType["isLoading"] }) => {
      dispatch({ type: "LOADING_RECIPE", payload: { id, value } });
    },
    []
  );

  const selectRecipe = useCallback(
    ({ id, value }: { id: number & RecipeType["id"]; value: boolean & RecipeType["isSelected"] }) => {
      dispatch({ type: "SELECT_RECIPE", payload: { id, value } });
    },
    []
  );

  const selectedRecipes = useMemo(() => {
    return state.recipes.filter((recipe) => recipe.isSelected);
  }, [state.recipes]);

  const loadingRecipes = useMemo(() => {
    return state.recipes.filter((recipe) => recipe.isLoading);
  }, [state.recipes]);

  const buildPanier = (selectedRecipes: RecipeType[]): IngredientType[] => {
    const noDuplicates = new Set<string>();
    const panier: IngredientType[] = [];
    for (const recipe of selectedRecipes) {
      for (const ingredient of recipe.ingredients) {
        if (!noDuplicates.has(ingredient.label)) {
          panier.push(ingredient);
          noDuplicates.add(ingredient.label);
        } else {
          const index = panier.findIndex((ing) => ing.label === ingredient.label);
          panier[index].quantity += ingredient.quantity;
        }
      }
    }
    return panier;
  };

  const paniers: IngredientType[] = useMemo(() => {
    return buildPanier(selectedRecipes);
  }, [selectedRecipes]);

  return {
    recipes: state.recipes,
    select: {
      state: selectedRecipes,
      action: selectRecipe,
    },
    loading: {
      state: loadingRecipes,
      action: loadRecipe,
    },
    paniers,
    addRecipe,
    deleteRecipe,
    editRecipe,
    getRecipe,
  };
};

// Recipes Mock :
