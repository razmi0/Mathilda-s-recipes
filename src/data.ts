import { Option } from "./components/ui/MultipleSelector";
import type { FoodColors, FoodType, IngredientType, RecipeType } from "./types";

const completeIngredients: Omit<IngredientType, "quantity">[] = [
  {
    label: "Oignon",
    type: "vegetable",
  },
  {
    label: "Bouillon",
    type: "other",
  },

  {
    label: "Tomate cerise",
    type: "vegetable",
  },

  {
    label: "Creme fraiche",
    type: "dairy",
  },
  {
    label: "Riz",
    type: "starchy",
  },
  {
    label: "oeufs",
    type: "meat",
  },
  {
    label: "graisse de canard",
    type: "fat",
  },

  {
    label: "Sauce soja",
    type: "other",
  },
  {
    label: "Sauce sauja sucré",
    type: "other",
  },
  {
    label: "Huile de sésame",
    type: "fat",
  },

  {
    label: "Cebette",
    type: "vegetable",
  },
  {
    label: "Brocolis",
    type: "vegetable",
  },
  {
    label: "oignons rouges",
    type: "vegetable",
  },
  {
    label: "Parmesan",
    type: "dairy",
  },
  {
    label: "Chapelure",
    type: "starchy",
  },
  {
    label: "Huile d'olive",
    type: "fat",
  },
  {
    label: "Sauce soje salé",
    type: "other",
  },
  {
    label: "Miel",
    type: "sweet",
  },
  {
    label: "Persillade",
    type: "other",
  },
  {
    label: "Beurre de cacahuète",
    type: "fat",
  },

  {
    label: "Echalotte",
    type: "vegetable",
  },
  {
    label: "Ail",
    type: "vegetable",
  },
  {
    label: "Ricotta",
    type: "dairy",
  },
  {
    label: "Epinard",
    type: "vegetable",
  },
  {
    label: "Canneloni",
    type: "starchy",
  },
  {
    label: "Farine",
    type: "starchy",
  },
  {
    label: "Beurre",
    type: "fat",
  },
  {
    label: "Lait",
    type: "dairy",
  },
  {
    label: "Noix de muscade",
    type: "other",
  },
  {
    label: "Fromage rapé",
    type: "dairy",
  },
];

const recipes: RecipeType[] = [
  {
    id: 1,
    name: "Simple orzoto",
    date: new Date(2023, 9, 10).toString(),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    ingredients: [
      {
        label: "Oignon",
        quantity: 1,
        type: "vegetable",
      },
      {
        label: "Bouillon",
        quantity: 1,
        type: "other",
      },
      {
        label: "Ail",
        quantity: 1,
        type: "vegetable",
      },
      {
        label: "Huile d'olive",
        quantity: 1,
        type: "fat",
      },
      {
        label: "Tomate cerise",
        quantity: 1,
        type: "vegetable",
      },
      {
        label: "Epinard",
        quantity: 1,
        type: "vegetable",
      },
      {
        label: "Creme fraiche",
        quantity: 1,
        type: "dairy",
      },
      {
        label: "Riz",
        quantity: 1,
        type: "starchy",
      },
    ],
    steps: [],
    isSelected: false,
    isLoading: false,
  },
  {
    id: 2,
    name: "Riz sauté asiatique",
    date: new Date(2023, 9, 10).toString(),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",

    ingredients: [
      {
        label: "oeufs",
        quantity: 2,
        type: "meat",
      },
      {
        label: "graisse de canard",
        quantity: 1,
        type: "fat",
      },
      {
        label: "Riz",
        quantity: 1,
        type: "starchy",
      },
      {
        label: "Sauce soja",
        quantity: 1,
        type: "other",
      },
      {
        label: "Sauce sauja sucré",
        quantity: 1,
        type: "other",
      },
      {
        label: "Huile de sésame",
        quantity: 1,
        type: "fat",
      },
      {
        label: "Echalotte",
        quantity: 1,
        type: "vegetable",
      },
      {
        label: "Cebette",
        quantity: 1,
        type: "vegetable",
      },
    ],
    steps: [
      "Faire cuire les oeufs",
      "Faire revenir l'echalotte",
      "Ajouter le riz",
      "Ajouter les sauces",
      "Ajouter les cebettes",
    ],
    isSelected: false,
    isLoading: false,
  },
  {
    id: 3,
    name: "Brocolis rotis et sauce cacahuète creamy",
    date: new Date(2023, 10, 10).toString(),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",

    ingredients: [
      {
        label: "Brocolis",
        quantity: 1,
        type: "vegetable",
      },
      {
        label: "oignons rouges",
        quantity: 1,
        type: "vegetable",
      },
      {
        label: "Parmesan",
        quantity: 1,
        type: "dairy",
      },
      {
        label: "Chapelure",
        quantity: 1,
        type: "starchy",
      },
      {
        label: "Huile d'olive",
        quantity: 1,
        type: "fat",
      },
      {
        label: "Sauce soje salé",
        quantity: 1,
        type: "other",
      },
      {
        label: "Miel",
        quantity: 1,
        type: "sweet",
      },
      {
        label: "Persillade",
        quantity: 1,
        type: "other",
      },
      {
        label: "Beurre de cacahuète",
        quantity: 1,
        type: "fat",
      },
      {
        label: "Ricotta",
        quantity: 1,
        type: "dairy",
      },
    ],
    steps: [
      "Faire rotir les brocolis",
      "Faire revenir les oignons",
      "Ajouter le parmesan",
      "Ajouter la chapelure",
      "Ajouter le beurre de cacahuète",
      "Ajouter la ricotta",
    ],
    isSelected: false,
    isLoading: false,
  },
  {
    id: 4,
    name: "Canneloni ricotta épinard sauce béchamel",
    date: new Date(2023, 10, 17).toString(),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",

    ingredients: [
      {
        label: "Echalotte",
        quantity: 1,
        type: "vegetable",
      },
      {
        label: "Ail",
        quantity: 1,
        type: "vegetable",
      },
      {
        label: "Ricotta",
        quantity: 1,
        type: "dairy",
      },
      {
        label: "Epinard",
        quantity: 1,
        type: "vegetable",
      },
      {
        label: "Canneloni",
        quantity: 1,
        type: "starchy",
      },
      {
        label: "Farine",
        quantity: 1,
        type: "starchy",
      },
      {
        label: "Beurre",
        quantity: 1,
        type: "fat",
      },
      {
        label: "Lait",
        quantity: 1,
        type: "dairy",
      },
      {
        label: "Noix de muscade",
        quantity: 1,
        type: "other",
      },
      {
        label: "Fromage rapé",
        quantity: 1,
        type: "dairy",
      },
    ],
    steps: [
      "Faire revenir l'echalotte",
      "Ajouter l'ail",
      "Ajouter les épinards",
      "Ajouter la ricotta",
      "Faire la béchamel",
      "Ajouter les canneloni",
    ],
    isSelected: false,
    isLoading: false,
  },
];

const food: Record<FoodType, FoodColors> = {
  meat: "#ee5c5b",
  fish: "#337f95",
  vegetable: "#449c75",
  fruit: "#f39c40",
  dairy: "#3390d1",
  fat: "#fbd94f",
  starchy: "#a96133",
  sweet: "#ed5aa5",
  drink: "#90cbef",
  other: "#FFFFFF",
};

type NoDups = Set<string>;
const tempSet: NoDups = new Set();
const multiSelectorIngredientsBadges: Option[] = [];

for (const recipe of recipes) {
  recipe.nbrOfIngredients = recipe.ingredients.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
  for (const ingredient of recipe.ingredients) {
    const { label, type } = ingredient;
    const ing: Option = {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      value: label.toLowerCase(),
      patch: {
        color: food[type],
      },
    };
    if (!tempSet.has(ing.value)) {
      multiSelectorIngredientsBadges.push(ing);
      tempSet.add(ing.value);
    }
  }
}

export { completeIngredients, multiSelectorIngredientsBadges, recipes, food };
