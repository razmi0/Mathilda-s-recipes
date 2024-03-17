import { useCallback, useReducer } from "react";
import { recipes } from "../data";

// Recipe type :
export type RecipeType = {
  id: number;
  name: string;
  date: Date;
  citation?: string;
  description: string;
  ingredients: string[];
  nbrOfIngredients?: number;
};

// Define the state and action types

type Actions =
  | { type: "ADD_RECIPE"; payload: Exclude<RecipeType, ["id", "nbrOfIngredients", "date", "citation"]> }
  | { type: "DELETE_RECIPE"; payload: number & RecipeType["id"] }
  | { type: "EDIT_RECIPE"; payload: RecipeType };

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

      const newRecipe = {
        ...action.payload,
        citation: "",
        date: new Date(),
        id: buildId(),
        nbrOfIngredients: action.payload.ingredients.length,
      };
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
    case "EDIT_RECIPE":
      return {
        ...state,
        recipes: state.recipes.map((recipe) => (recipe.id === action.payload.id ? action.payload : recipe)),
      };
    default:
      return state;
  }
};

// hook
export const useRecipe = () => {
  const [state, dispatch] = useReducer(recipeReducer, { recipes });

  const addRecipe = useCallback((recipe: RecipeType) => {
    dispatch({ type: "ADD_RECIPE", payload: recipe });
  }, []);

  const deleteRecipe = useCallback((id: number) => {
    dispatch({ type: "DELETE_RECIPE", payload: id });
  }, []);

  const editRecipe = useCallback((recipe: RecipeType) => {
    dispatch({ type: "EDIT_RECIPE", payload: recipe });
  }, []);

  const getRecipe = useCallback(
    (id: number) => {
      return state.recipes.find((recipe) => recipe.id === id);
    },
    [state.recipes]
  );

  const totalIngredients = useCallback(() => {
    return state.recipes.reduce((acc, recipe) => acc + recipe.ingredients.length, 0);
  }, [state.recipes]);

  return {
    recipes: state.recipes,
    totalIngredients: totalIngredients(),
    addRecipe,
    deleteRecipe,
    editRecipe,
    getRecipe,
  };
};

// Recipes Mock :
