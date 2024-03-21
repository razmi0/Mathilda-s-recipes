import { Option } from "./components/ui/MultipleSelector";
import type { FoodColors, FoodType, IngredientType, RecipeType } from "./types";

const completeIngredients: Omit<IngredientType, "quantity" | "color">[] = [
  {
    label: "Oignon",
    type: "vegetable",
    value: "oignon",
  },
  {
    label: "Bouillon",
    type: "other",
    value: "bouillon",
  },

  {
    label: "Tomate cerise",
    type: "vegetable",
    value: "tomate cerise",
  },

  {
    label: "Creme fraiche",
    type: "dairy",
    value: "creme fraiche",
  },
  {
    label: "Riz",
    type: "starchy",
    value: "riz",
  },
  {
    label: "oeufs",
    type: "meat",
    value: "oeufs",
  },
  {
    label: "graisse de canard",
    type: "fat",
    value: "graisse de canard",
  },

  {
    label: "Sauce soja",
    type: "other",
    value: "sauce soja",
  },
  {
    label: "Sauce sauja sucré",
    type: "other",
    value: "sauce sauja sucré",
  },
  {
    label: "Huile de sésame",
    type: "fat",
    value: "huile de sésame",
  },

  {
    label: "Cebette",
    type: "vegetable",
    value: "cebette",
  },
  {
    label: "Brocolis",
    type: "vegetable",
    value: "brocolis",
  },
  {
    label: "oignons rouges",
    type: "vegetable",
    value: "oignons rouges",
  },
  {
    label: "Parmesan",
    type: "dairy",
    value: "parmesan",
  },
  {
    label: "Chapelure",
    type: "starchy",
    value: "chapelure",
  },
  {
    label: "Huile d'olive",
    type: "fat",
    value: "huile d'olive",
  },
  {
    label: "Sauce soje salé",
    type: "other",
    value: "sauce soje salé",
  },
  {
    label: "Miel",
    type: "sweet",
    value: "miel",
  },
  {
    label: "Persillade",
    type: "other",
    value: "persillade",
  },
  {
    label: "Beurre de cacahuète",
    type: "fat",
    value: "beurre de cacahuète",
  },

  {
    label: "Echalotte",
    type: "vegetable",
    value: "echalotte",
  },
  {
    label: "Ail",
    type: "vegetable",
    value: "ail",
  },
  {
    label: "Ricotta",
    type: "dairy",
    value: "ricotta",
  },
  {
    label: "Epinard",
    type: "vegetable",
    value: "epinard",
  },
  {
    label: "Canneloni",
    type: "starchy",
    value: "canneloni",
  },
  {
    label: "Farine",
    type: "starchy",
    value: "farine",
  },
  {
    label: "Beurre",
    type: "fat",
    value: "beurre",
  },
  {
    label: "Lait",
    type: "dairy",
    value: "lait",
  },
  {
    label: "Noix de muscade",
    type: "other",
    value: "noix de muscade",
  },
  {
    label: "Fromage rapé",
    type: "dairy",
    value: "fromage rapé",
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
        value: "oignon",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
      },
      {
        label: "Bouillon",
        value: "bouillon",
        quantity: 1,
        type: "other",
        color: food.other,
      },
      {
        label: "Ail",
        value: "ail",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
      },
      {
        label: "Huile d'olive",
        value: "huile d'olive",
        quantity: 1,
        type: "fat",
        color: food.fat,
      },
      {
        label: "Tomate cerise",
        value: "tomate cerise",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
      },
      {
        label: "Epinard",
        value: "epinard",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
      },
      {
        label: "Creme fraiche",
        value: "creme fraiche",
        quantity: 1,
        type: "dairy",
        color: food.dairy,
      },
      {
        label: "Riz",
        value: "riz",
        quantity: 1,
        type: "starchy",
        color: food.starchy,
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
        value: "oeufs",
        quantity: 2,
        type: "meat",
        color: food.meat,
      },
      {
        label: "graisse de canard",
        value: "graisse de canard",
        quantity: 1,
        type: "fat",
        color: food.fat,
      },
      {
        label: "Riz",
        value: "riz",
        quantity: 1,
        type: "starchy",
        color: food.starchy,
      },
      {
        label: "Sauce soja",
        value: "sauce soja",
        quantity: 1,
        type: "other",
        color: food.other,
      },
      {
        label: "Sauce sauja sucré",
        value: "sauce sauja sucré",
        quantity: 1,
        type: "other",
        color: food.other,
      },
      {
        label: "Huile de sésame",
        value: "huile de sésame",
        quantity: 1,
        type: "fat",
        color: food.fat,
      },
      {
        label: "Echalotte",
        value: "echalotte",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
      },
      {
        label: "Cebette",
        value: "cebette",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
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
        value: "brocolis",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
      },
      {
        label: "oignons rouges",
        value: "oignons rouges",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
      },
      {
        label: "Parmesan",
        value: "parmesan",
        quantity: 1,
        type: "dairy",
        color: food.dairy,
      },
      {
        label: "Chapelure",
        value: "chapelure",
        quantity: 1,
        type: "starchy",
        color: food.starchy,
      },
      {
        label: "Huile d'olive",
        value: "huile d'olive",
        quantity: 1,
        type: "fat",
        color: food.fat,
      },
      {
        label: "Sauce soje salé",
        value: "sauce soje salé",
        quantity: 1,
        type: "other",
        color: food.other,
      },
      {
        label: "Miel",
        value: "miel",
        quantity: 1,
        type: "sweet",
        color: food.sweet,
      },
      {
        label: "Persillade",
        value: "persillade",
        quantity: 1,
        type: "other",
        color: food.other,
      },
      {
        label: "Beurre de cacahuète",
        value: "beurre de cacahuète",
        quantity: 1,
        type: "fat",
        color: food.fat,
      },
      {
        label: "Ricotta",
        value: "ricotta",
        quantity: 1,
        type: "dairy",
        color: food.dairy,
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
        value: "echalotte",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
      },
      {
        label: "Ail",
        value: "ail",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
      },
      {
        label: "Ricotta",
        value: "ricotta",
        quantity: 1,
        type: "dairy",
        color: food.dairy,
      },
      {
        label: "Epinard",
        value: "epinard",
        quantity: 1,
        type: "vegetable",
        color: food.vegetable,
      },
      {
        label: "Canneloni",
        value: "canneloni",
        quantity: 1,
        type: "starchy",
        color: food.starchy,
      },
      {
        label: "Farine",
        value: "farine",
        quantity: 1,
        type: "starchy",
        color: food.starchy,
      },
      {
        label: "Beurre",
        value: "beurre",
        quantity: 1,
        type: "fat",
        color: food.fat,
      },
      {
        label: "Lait",
        value: "lait",
        quantity: 1,
        type: "dairy",
        color: food.dairy,
      },
      {
        label: "Noix de muscade",
        value: "noix de muscade",
        quantity: 1,
        type: "other",
        color: food.other,
      },
      {
        label: "Fromage rapé",
        value: "fromage rapé",
        quantity: 1,
        type: "dairy",
        color: food.dairy,
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

type NoDups = Set<string>;
const tempSet: NoDups = new Set();
const multiSelectorIngredientsBadges: Option[] = [];

for (const recipe of recipes) {
  recipe.nbrOfIngredients = recipe.ingredients.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  for (const ingredient of recipe.ingredients) {
    const { label, type, color } = ingredient;

    /** building multiSelectorIngredientsBadges */
    const badge: Option = {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      value: label.toLowerCase(),
      type: type,
      patch: {
        enabled: true,
        color: color,
      },
    };
    if (!tempSet.has(badge.value)) {
      multiSelectorIngredientsBadges.push(badge);
      tempSet.add(badge.value);
    }
  }
}

export { completeIngredients, food, multiSelectorIngredientsBadges, recipes };
