import { Option } from "./components/ui/MultipleSelector";
import type { RecipeType } from "./types";

const recipes: RecipeType[] = [
  {
    id: 1,
    name: "Simple orzoto",
    date: new Date(2023, 9, 10),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    ingredients: [
      {
        label: "Oignon",
        quantity: 1,
      },
      {
        label: "Bouillon",
        quantity: 1,
      },
      {
        label: "Ail",
        quantity: 1,
      },
      {
        label: "Huile d'olive",
        quantity: 1,
      },
      {
        label: "Tomate cerise",
        quantity: 1,
      },
      {
        label: "Epinard",
        quantity: 1,
      },
      {
        label: "Creme fraiche",
        quantity: 1,
      },
      {
        label: "Riz",
        quantity: 1,
      },
    ],
    steps: [],
    isSelected: false,
    isLoading: false,
  },
  {
    id: 2,
    name: "Riz sauté asiatique",
    date: new Date(2023, 9, 10),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",

    ingredients: [
      {
        label: "oeufs",
        quantity: 2,
      },
      {
        label: "graisse de canard",
        quantity: 1,
      },
      {
        label: "Riz",
        quantity: 1,
      },
      {
        label: "Sauce soja",
        quantity: 1,
      },
      {
        label: "Sauce sauja sucré",
        quantity: 1,
      },
      {
        label: "Huile de sésame",
        quantity: 1,
      },
      {
        label: "Echalotte",
        quantity: 1,
      },
      {
        label: "Cebette",
        quantity: 1,
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
    date: new Date(2023, 10, 10),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",

    ingredients: [
      {
        label: "Brocolis",
        quantity: 1,
      },
      {
        label: "oignons rouges",
        quantity: 1,
      },
      {
        label: "Parmesan",
        quantity: 1,
      },
      {
        label: "Chapelure",
        quantity: 1,
      },
      {
        label: "Huile d'olive",
        quantity: 1,
      },
      {
        label: "Sauce soje salé",
        quantity: 1,
      },
      {
        label: "Miel",
        quantity: 1,
      },
      {
        label: "Persillade",
        quantity: 1,
      },
      {
        label: "Beurre de cacahuète",
        quantity: 1,
      },
      {
        label: "Ricotta",
        quantity: 1,
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
    date: new Date(2023, 10, 17),
    citation: "Citation",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",

    ingredients: [
      {
        label: "Echalotte",
        quantity: 1,
      },
      {
        label: "Ail",
        quantity: 1,
      },
      {
        label: "Ricotta",
        quantity: 1,
      },
      {
        label: "Epinard",
        quantity: 1,
      },
      {
        label: "Canneloni",
        quantity: 1,
      },
      {
        label: "Farine",
        quantity: 1,
      },
      {
        label: "Beurre",
        quantity: 1,
      },
      {
        label: "Lait",
        quantity: 1,
      },
      {
        label: "Noix de muscade",
        quantity: 1,
      },
      {
        label: "Fromage rapé",
        quantity: 1,
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
const allIngredients: Option[] = [];

for (const recipe of recipes) {
  recipe.nbrOfIngredients = recipe.ingredients.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
  for (const ingredient of recipe.ingredients) {
    const { label } = ingredient;
    const ing = {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      value: label.toLowerCase(),
    };
    if (!tempSet.has(ing.value)) {
      allIngredients.push(ing);
      tempSet.add(ing.value);
    }
  }
}

export { allIngredients, recipes };
