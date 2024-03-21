import { z } from "zod";

const recipeFormSchema = z
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

export default recipeFormSchema;
