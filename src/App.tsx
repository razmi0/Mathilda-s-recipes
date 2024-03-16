import { useState } from "react";
import Checkbox from "./components/Checkbox";
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
        <div className="flex flex-col border-2 rounded-lg border-gray-500 py-2">
          <h3 className="text-2xl py-3 px-2">
            Recettes <small>( {recipes.length} )</small>
          </h3>
          <div className="mt-8 flex justify-start items-center text-left">
            <table>
              <RecipesHead />
              <Recipes handler={handlePanier} />
            </table>
          </div>
        </div>
        {/* PANIER */}
        <div className="w-full flex flex-col my-8">
          {paniers.length > 0 && (
            <h3 className="text-2xl">
              Liste de courses <small>( {paniers.length} )</small>
            </h3>
          )}
          <div className="mt-8 flex justify-center items-center">
            <Ingredients paniers={paniers} />
          </div>
        </div>
        {/* INSTRUCTION */}
        <div className="w-full mt-8 flex flex-col justify-start items-center">
          <h3 className="w-full text-2xl mb-8">Instructions</h3>
          {paniers.length > 0 &&
            selectedMeal.map((meal, i) => {
              if (meal.isSelected) {
                return <Instructions key={i} meal={meal} handler={handleInstructions} />;
              }
            })}
        </div>
      </section>
      <footer className="w-full h-8"></footer>
    </div>
  );
};

const Recipes = ({ handler }: RecipesProps) => {
  return (
    <tbody>
      {recipes.map((recipe, i) => (
        <tr key={i}>
          <td>
            <div className="checkbox-ctn">
              <Checkbox handler={handler} name={recipe.name} />
            </div>
          </td>
          <td>{recipe.name}</td>
          <td>{recipe.description}</td>
        </tr>
      ))}
    </tbody>
  );
};

const RecipesHead = () => {
  return (
    <thead>
      <tr>
        <th>Panier</th>
        <th>Nom</th>
        <th>Description</th>
      </tr>
    </thead>
  );
};

const Ingredients = ({ paniers }: { paniers: Panier[] }) => {
  const pluriel = (word: string, quantity: number) => (quantity > 1 ? word + "s" : word);
  const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
  return (
    <>
      <ul className="w-full text-center">
        {paniers.map((ing, i) => (
          <li key={i} className="flex justify-between items-center">
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
      <div className="flex justify-between items-center mb-4">
        <span>{name}</span>
        {isLoading && <Loader />}
        <button onClick={() => handler(name)}>Generate</button>
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
