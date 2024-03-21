import { useCallback, useMemo, useReducer } from "react";
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

      console.log(newRecipe);
      return {
        ...state,
        recipes: [...state.recipes, newRecipe],
      };
    }
    case "DELETE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    case "EDIT_RECIPE": {
      const editedRecipeIndex = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
      const editedRecipe = { ...state.recipes[editedRecipeIndex], ...action.payload };
      return {
        ...state,
        recipes: [
          ...state.recipes.slice(0, editedRecipeIndex),
          editedRecipe,
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
