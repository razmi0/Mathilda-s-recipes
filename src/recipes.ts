interface RecipeType {
  nom: string;
  date: string;
  citation: string;
  description: string;
  ingredients: string[];
  nbrOfIngredients?: number;
}
export const recipes: RecipeType[] = [
  {
    nom: "Risotto",
    date: new Date(2023, 9, 10).toDateString(),
    citation: "Citation",
    description: "Description",
    ingredients: [
      "Riz",
      "Oignon",
      "Bouillon",
      "Vin blanc",
      "Parmesan",
      "Beurre",
    ],
  },
  {
    nom: "Riz pillaf et brocollis sauce à la cacahuète",
    date: new Date(2023, 9, 10).toDateString(),
    citation: "Citation",
    description: "Description",
    ingredients: [
      "Riz",
      "Oignon",
      "Bouillon",
      "Cacahuète",
      "Brocolis",
      "Beurre",
    ],
  },
];

for (const recipe of recipes) {
  recipe.nbrOfIngredients = recipe.ingredients.length;
}
