export interface RecipeType {
  name: string;
  date: Date;
  citation: string;
  description: string;
  ingredients: string[];
  nbrOfIngredients?: number;
}
export const recipes: RecipeType[] = [
  {
    name: "Simple orzoto",
    date: new Date(2023, 9, 10),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    ingredients: [
      "Oignon",
      "Bouillon",
      "ail",
      "Huile d'olive",
      "tomate cerise",
      "Epinard",
      "creme fraiche",
    ],
  },
  {
    name: "Riz sauté asiatique",
    date: new Date(2023, 9, 10),
    citation: "Citation",
    description: "Description",
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
    name: "Brocolis rotis et sauce cacahuète creamy",
    date: new Date(2023, 10, 10),
    citation: "Citation",
    description: "Description",
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
    name: "Canneloni ricotta épinard sauce béchamel",
    date: new Date(2023, 10, 17),
    citation: "Citation",
    description: "Description",
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

//TODO : ingredients optionnels
