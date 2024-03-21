import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { completeIngredients, multiSelectorIngredientsBadges } from "../data";
import type { AddRecipePayload, EditRecipePayload } from "../hooks/useRecipe";
import recipeFormSchema from "../schema/recipe.schema";
import type { RecipeType } from "../types";
import Button from "./ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/Form";
import MultipleSelector from "./ui/MultipleSelector";

/** Type definitions */
type FormMode<T> = T extends "add" ? "add" : "edit";
type FormModeHandler<T> = T extends "add" ? (recipe: AddRecipePayload) => void : (modifs: EditRecipePayload) => void;

type EditedRecipeType<T> = T extends "edit" ? RecipeType | null : never;

type RecipeFormProps<T extends "add" | "edit"> = {
  mode: FormMode<T>;
  onSubmit: FormModeHandler<T>;
  editedRecipe?: EditedRecipeType<T>;
  closeModal: () => void;
};

/** Type function overload */
// mode is "add"
export function RecipeForm<T extends "add">({
  mode,
  onSubmit,
  closeModal,
}: Pick<RecipeFormProps<T>, "mode" | "closeModal" | "onSubmit">): JSX.Element;
// mode is "edit"
export function RecipeForm<T extends "edit">({
  mode,
  onSubmit,
  editedRecipe,
  closeModal,
}: RecipeFormProps<T>): JSX.Element;

/** Form Component either add or edit */
export default function RecipeForm<T extends "add" | "edit">({
  mode,
  onSubmit,
  editedRecipe,
  closeModal,
}: RecipeFormProps<T>) {
  const defaultValues: AddRecipePayload =
    mode === "add"
      ? {
          name: "",
          description: "",
          ingredients: [],
        }
      : {
          name: editedRecipe?.name || "",
          description: editedRecipe?.description || "",
          ingredients: editedRecipe?.ingredients || [],
        };

  const form = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: defaultValues,
    shouldFocusError: true,
  });

  // TODO : add ingredient type input in the form for created ingredient
  const localOnSubmitHandler = (values: z.infer<typeof recipeFormSchema>) => {
    const { name, description, ingredients } = values;

    const formatedIngredients: RecipeType["ingredients"] = ingredients.map((ingredient) => {
      const ingType = completeIngredients.find((ing) => ing.label === ingredient.label)?.type || "other";
      return {
        label: ingredient.label,
        quantity: 1,
        type: ingType,
      };
    });

    switch (mode) {
      case "add": {
        const recipe = { name, description, ingredients: formatedIngredients } as AddRecipePayload;
        (onSubmit as (recipe: AddRecipePayload) => void)(recipe);
        break;
      }
      case "edit": {
        const modifs = { ...editedRecipe, name, description, ingredients: formatedIngredients } as EditRecipePayload;
        (onSubmit as (modifs: EditRecipePayload) => void)(modifs);
        break;
      }
      default:
        break;
    }

    closeModal();
  };

  console.log(mode);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(localOnSubmitHandler)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="vertical gap-3">
              <FormLabel>Name of the recipe</FormLabel>
              <FormControl>
                <input placeholder="Enter recipe" className="text-black px-2 h-8 bg-slate-100" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="vertical gap-3">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Enter description.."
                  className="text-black px-2 py-2 h-24 bg-slate-100"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem className="vertical gap-3 w-full">
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <MultipleSelector
                  inputProps={{ className: "focus:outline-none" }}
                  triggerSearchOnFocus={true}
                  value={field.value}
                  onChange={field.onChange}
                  options={multiSelectorIngredientsBadges}
                  placeholder="Find or add ingredients.."
                  creatable
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>
                  }
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <Button ariaLabel="submit new recipe" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
