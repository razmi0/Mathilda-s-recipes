import type { RecipeType } from "./hooks/useRecipe";

export const recipes: RecipeType[] = [
  {
    id: 1,
    name: "Simple orzoto",
    date: new Date(2023, 9, 10),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    ingredients: ["Oignon", "Bouillon", "ail", "Huile d'olive", "tomate cerise", "Epinard", "creme fraiche"],
  },
  {
    id: 2,
    name: "Riz sauté asiatique",
    date: new Date(2023, 9, 10),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",

    ingredients: [
      "oeufs",
      "graisse de canard",
      "Riz",
      "Sauce soja",
      "Sauce sauja sucré",
      "Huile de sésame",
      "Echalotte",
      "Cebette",
    ],
  },
  {
    id: 3,
    name: "Brocolis rotis et sauce cacahuète creamy",
    date: new Date(2023, 10, 10),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",

    ingredients: [
      "Brocolis",
      "oignons rouges",
      "Parmesan",
      "Chapelure",
      "Huile d'olive",
      "Sauce soje salé",
      "Miel",
      "Persillade",
      "Beurre de cacahuète",
      "Ricotta",
    ],
  },
  {
    id: 4,
    name: "Canneloni ricotta épinard sauce béchamel",
    date: new Date(2023, 10, 17),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",

    ingredients: [
      "Echalotte",
      "Ail",
      "Ricotta",
      "Epinard",
      "Canneloni",
      "Farine",
      "Beurre",
      "Lait",
      "Noix de muscade",
      "Fromage rapé",
    ],
  },
];

for (const recipe of recipes) {
  recipe.nbrOfIngredients = recipe.ingredients.length;
}
