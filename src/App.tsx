import { ChangeEvent, ElementType, MouseEvent, ReactNode, useState } from "react";
import Button from "./components/Button";
import Loader from "./components/Loader";
import { RecipeType, recipes } from "./recipes";
import { processToGPT } from "./services/openAI";
import { Message, Panier, RecipesProps, SelectedMeal } from "./types";

const initialiseSelectedMeal = (recipes: RecipeType[]): SelectedMeal[] => {
  const selectedMeals: SelectedMeal[] = [];
  for (let i = 0; i < recipes.length; i++) {
    selectedMeals.push({
      name: recipes[i].name,
      steps: [],
      isLoading: false,
      isSelected: false,
      ingredients: recipes[i].ingredients,
    });
  }
  return selectedMeals;
};

const App = () => {
  const [paniers, setPaniers] = useState<Panier[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<SelectedMeal[]>(initialiseSelectedMeal(recipes));
  const [APIkey, setAPIkey] = useState<string>("");

  const handlePanier = (checked: boolean, name: string) => {
    const hashMapSelectedMeal: SelectedMeal[] = [...selectedMeal],
      hashMapPanier: Panier[] = [...paniers],
      q = checked ? 1 : -1,
      selectedIndex = hashMapSelectedMeal.findIndex((meal) => meal.name === name),
      ingredients = hashMapSelectedMeal[selectedIndex].ingredients;
    hashMapSelectedMeal[selectedIndex].isSelected = checked;

    for (let i = 0; i < ingredients.length; i++) {
      const index = hashMapPanier.findIndex((panier) => panier.ingredient === ingredients[i]);
      if (index == -1) {
        hashMapPanier.push({ ingredient: ingredients[i], quantity: 1 });
      } else {
        hashMapPanier[index].quantity += q;
        if (hashMapPanier[index].quantity == 0) {
          hashMapPanier.splice(index, 1);
        }
      }
    }

    setSelectedMeal(hashMapSelectedMeal);
    setPaniers(hashMapPanier);
  };

  const handleInstructions = async (name: string) => {
    const index = selectedMeal.findIndex((meal) => meal.name === name);
    const ingredients = selectedMeal[index].ingredients;

    const userMsg: Message = {
      role: "user",
      content: `Recette: ${name}\n Ingredients: ${ingredients?.join(", ")}\n Instructions: `,
    };

    setSelectedMeal((prev) => {
      const hashMapSelectedMeal = [...prev];
      hashMapSelectedMeal[index].isLoading = true;
      return hashMapSelectedMeal;
    });

    const steps: string[] = await processToGPT([userMsg], APIkey);

    setSelectedMeal((prev) => {
      const hashMapSelectedMeal = [...prev];
      hashMapSelectedMeal[index].isLoading = false;
      hashMapSelectedMeal[index].steps = steps;
      return hashMapSelectedMeal;
    });
  };

  return (
    <div className="container">
      <h1 className="mt-8 mb-16">Les recettes de Mathilda</h1>
      <section className="flex flex-col justify-between items-start">
        {/* RECETTES */}
        <div className="flex flex-col card">
          <CardHeading as="h3">
            Recettes <small>( {recipes.length} )</small>
          </CardHeading>
          <div className="flex justify-start items-center text-left px-2">
            <table className="first:mt-3 last:mb-3">
              <Recipes handler={handlePanier} />
            </table>
          </div>
        </div>
        <section className="flex justify-evenly w-full">
          {/* PANIER */}
          {paniers.length > 0 && (
            <div className="flex flex-col my-8 card min-w-80">
              <CardHeading as={"h3"}>
                Liste de courses <small>( {paniers.length} )</small>
              </CardHeading>
              <div className="flex justify-center items-center">
                <Ingredients paniers={paniers} />
              </div>
            </div>
          )}
          {/* INSTRUCTION */}
          {paniers.length > 0 && (
            <div className="w-fit mt-8 flex flex-col justify-start items-center card h-fit min-w-80">
              <CardHeading as={"h3"} classNames="w-full">
                Instructions
              </CardHeading>
              {selectedMeal.map((meal, i) => {
                if (meal.isSelected) {
                  return (
                    <Instructions key={i} meal={meal} handler={() => setTimeout(() => console.log("yes"), 1000)} />
                  );
                }
              })}
            </div>
          )}
        </section>
      </section>
      <footer className="w-full h-8"></footer>
    </div>
  );
};

type CardHeadingProps = {
  as: ("h1" | "h2" | "h3" | "h4" | "h5" | "h6") & ElementType;
  classNames?: string;
  children: ReactNode;
};
const CardHeading = ({ as: As, classNames, children }: CardHeadingProps) => {
  return (
    <As className={`text-2xl py-6 px-4 bg-blueish-400 rounded-tl-lg rounded-tr-lg ${classNames || ""}`}>{children}</As>
  );
};

type CheckboxProps = {
  handler: (checked: boolean, name: string) => void;
  name: string;
};

const Recipes = ({ handler }: RecipesProps) => {
  const [checked, setChecked] = useState<boolean[]>(new Array(recipes.length).fill(false));

  const toggleCheckedRecipe = (i: number, name: string) => {
    const newChecked = [...checked];
    newChecked[i] = !newChecked[i];
    setChecked(newChecked);
    handler(newChecked[i], name);
  };

  if (recipes.length !== checked.length) {
    const resizedChecked = new Array(recipes.length).fill(false);
    for (let i = 0; i < checked.length; i++) {
      resizedChecked[i] = checked[i];
    }
    setChecked(resizedChecked);
  }

  return (
    <tbody>
      {recipes.map((recipe, i) => {
        const localToggle = (e: MouseEvent | ChangeEvent) => {
          e.preventDefault();
          toggleCheckedRecipe(i, recipe.name);
        };
        return (
          <tr
            key={recipe.name}
            className="hover:bg-blueish-200 transition-colors cursor-pointer rounded-sm"
            onClick={(e) => {
              localToggle(e);
            }}
          >
            <td>
              <div className="checkbox-ctn">
                <label className="checkbox-container" htmlFor={`checkbox-${i}`}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      localToggle(e);
                    }}
                    checked={checked[i]}
                    id={`checkbox-${i}`}
                  />
                  <div className="checkmark"></div>
                </label>
              </div>
            </td>
            <td>{recipe.name}</td>
            <td>{recipe.description}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

const Ingredients = ({ paniers }: { paniers: Panier[] }) => {
  const pluriel = (word: string, quantity: number) => (quantity > 1 ? word + "s" : word);
  const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
  return (
    <>
      <ul className="w-full text-center px-2 py-1">
        {paniers.map((ing, i) => (
          <li
            key={i}
            className="flex justify-between items-center py-2 px-2 hover:bg-blueish-200 transition-colors rounded-sm"
          >
            <div>{capitalize(ing.ingredient)}</div>
            <div>
              {ing.quantity} {pluriel(" ration", ing.quantity)}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const Instructions = ({ handler, meal }: { handler: (name: string) => void; meal: SelectedMeal }) => {
  const { name, steps, isLoading } = meal;
  return (
    <div className="w-full text-left mx-4">
      <div className="flex justify-between items-center py-2 px-2">
        <span>{name}</span>
        <Button onClick={() => handler(name)} loading={isLoading} loader={<Loader />}>
          Generate
        </Button>
      </div>
      {steps.length > 0 && (
        <div className="w-3/4 flex flex-col">
          <ul className="w-full flex flex-col justify-start items-start p-0 list-none">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
