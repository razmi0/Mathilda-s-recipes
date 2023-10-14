interface RecipeType {
  nom: string;
  date: Date;
  citation: string;
  description: string;
  ingredients: string[];
  nbrOfIngredients?: number;
}
export const recipes: RecipeType[] = [
  {
    nom: "Simple orzoto",
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
    nom: "Riz sauté asiatique",
    date: new Date(2023, 9, 10),
    citation: "Citation",
    description: "Description",
    ingredients: [
      "oeufs",
      "graisse de cannard optionnel",
      "Riz",
      "Sauce soja",
      "Sauce sauja sucré",
      "Huile de sésame",
      "Echalotte",
      "Cebette",
    ],
  },
  {
    nom: "Brocolis rotis et sauce cacahuète creamy",
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
];

for (const recipe of recipes) {
  recipe.nbrOfIngredients = recipe.ingredients.length;
}

//TODO : ingredients optionnels
