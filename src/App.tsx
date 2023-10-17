import { useState } from "react";
import { RecipeType, recipes } from "./recipes";
import Checkbox from "./components/Checkbox";
import Loader from "./components/Loader";
import { Message, Panier, RecipesProps, SelectedMeal } from "./types";
import { processToGPT } from "./services/openAI";
import "./styles/App.css";

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

    const steps: string[] = await processToGPT([userMsg]);

    setSelectedMeal((prev) => {
      const hashMapSelectedMeal = [...prev];
      hashMapSelectedMeal[index].isLoading = false;
      hashMapSelectedMeal[index].steps = steps;
      return hashMapSelectedMeal;
    });
  };

  return (
    <>
      <div className="main-ctn">
        <h1>Les recettes de Mathilda</h1>
      </div>
      <section className="sec-tables-ctn">
        <div className="recipes-ctn">
          <h3>
            Recettes <small>( {recipes.length} )</small>
          </h3>
          <div className="recipe-chat-ctn">
            <div className="table-ctn">
              <table>
                <RecipesHead />
                <Recipes handler={handlePanier} />
              </table>
            </div>
            <div className="global-chat-ctn">
              <h3>Instructions</h3>
              {paniers.length > 0 &&
                selectedMeal.map((meal, i) => {
                  if (meal.isSelected) {
                    return <Instructions key={i} meal={meal} handler={handleInstructions} />;
                  }
                })}
            </div>
          </div>
        </div>
        <div className="ingredients-ctn">
          {paniers.length > 0 && (
            <h3>
              Liste de courses <small>( {paniers.length} )</small>
            </h3>
          )}
          <div className="ingredients-data-ctn">
            <Ingredients paniers={paniers} />
          </div>
        </div>
      </section>
    </>
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
  return (
    <>
      <ul className="ingredients">
        {paniers.map((ing, i) => (
          <li key={i} className="list-ingredient">
            <div>{ing.ingredient.charAt(0).toUpperCase() + ing.ingredient.slice(1)}</div>
            <div>
              {ing.quantity} ration{`${ing.quantity > 1 ? "s" : ""}`}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const Instructions = ({
  handler,
  meal,
}: {
  handler: (name: string) => void;
  meal: SelectedMeal;
}) => {
  const { name, steps, isLoading } = meal;
  return (
    <div className="recipe-name-ctn">
      <div className="recipe-name-btn-ctn" style={{ marginBottom: "1rem" }}>
        <span>{name}</span>
        {isLoading && <Loader />}
        <button onClick={() => handler(name)}>Generate</button>
      </div>
      {steps.length > 0 && (
        <div className="instructions-ctn">
          <ul style={{ listStyle: "none" }} className="list-instruction">
            {steps.map((step, i) => (
              <li className="list-step-step" key={i}>
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
