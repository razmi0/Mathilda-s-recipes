import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { completeIngredients, multiSelectorIngredientsBadges } from "../data";
import type { AddRecipePayload } from "../hooks/useRecipe";
import addRecipeFormSchema from "../schema/recipe.schema";
import type { RecipeType } from "../types";
import Button from "./ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/Form";
import MultipleSelector from "./ui/MultipleSelector";

type RecipeFormProps = {
  addRecipe: (recipe: AddRecipePayload) => void;
  closeModal: () => void;
};

const RecipeForm = ({ addRecipe, closeModal }: RecipeFormProps) => {
  const form = useForm<z.infer<typeof addRecipeFormSchema>>({
    resolver: zodResolver(addRecipeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [],
    },
    shouldFocusError: true,
  });

  // TODO : add ingredient type in the form for created ingredient
  const onSubmit = (values: z.infer<typeof addRecipeFormSchema>) => {
    const { name, description, ingredients } = values;
    const formatedIngredients: RecipeType["ingredients"] = ingredients.map((ingredient) => {
      const ingType = completeIngredients.find((ing) => ing.label === ingredient.label)?.type || "other";
      return {
        label: ingredient.label,
        quantity: 1,
        type: ingType,
      };
    });
    addRecipe({
      name: name,
      description: description,
      ingredients: formatedIngredients,
    });
    closeModal();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
};

export default RecipeForm;
