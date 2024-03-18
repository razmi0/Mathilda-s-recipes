import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { allIngredients } from "../data";
import Button from "./ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/Form";
import MultipleSelector from "./ui/MultipleSelector";

const addRecipeFormSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, {
        message: "Name must be at least 2 characters long",
      }),
    description: z.string(),
    ingredients: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
  })
  .required({
    name: true,
  });

function AddRecipeForm() {
  const form = useForm<z.infer<typeof addRecipeFormSchema>>({
    resolver: zodResolver(addRecipeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [],
    },
    shouldFocusError: true,
  });

  const onSubmit = (values: z.infer<typeof addRecipeFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    console.log("dfsdfdsfs");
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
                  triggerSearchOnFocus={true}
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={allIngredients}
                  placeholder="Find or add ingredients..."
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

export default AddRecipeForm;
