import { useState } from "react";
import { RecipeType, recipes } from "./recipes";
import Checkbox from "./components/Checkbox";
import Loader from "./components/Loader";
import "./styles/App.css";

type Panier = [string, number]; // [ingredient, quantité]
type Instructions = {
  name: string;
  steps: string[];
}; // {nom, instructions} => Instructions get generated with GPT-3
type Message = {
  role: string;
  content: string;
};

type SelectedMeal = {
  name: string;
  steps: string[];
  isLoading: boolean;
  isSelected: boolean;
  ingredients: string[];
};

// const initialiseSelectedMeal = (recipes: RecipeType[]): SelectedMeal[] => {
//   const selectedMeals: SelectedMeal[] = [];
//   for (let i = 0; i < recipes.length; i++) {
//     selectedMeals.push({
//       name: recipes[i].name,
//       steps: [],
//       isLoading: false,
//       isSelected: false,
//       ingredients: recipes[i].ingredients,
//     });
//   }
//   return selectedMeals;
// };
// const initialSelectedMeal = initialiseSelectedMeal(recipes);

const systemMsg = {
  role: "system",
  content:
    "Complete the recipe talking like a chef and using the following ingredients as a base. Be concise and precise. Start each step with the coresponding step number and a double point(:). End the last sentence of each step with the characters : '&&'",
};

const App = () => {
  const [panier, setPanier] = useState<Panier[]>([]); // liste des ingrédients
  const [recipesNames, setRecipesNames] = useState<string[]>([]); // liste des recettes
  const [instructions, setInstructions] = useState<Instructions>(); // liste des instructions
  // const [selectedMeal, setSelectedMeal] =
  //   useState<SelectedMeal[]>(initialSelectedMeal);
  const [loading, setLoading] = useState<boolean>(false); // loading state

  const handlePanier = (
    checked: boolean,
    ingredients: string[],
    name: string
  ) => {
    const hashMapPanier: Panier[] = [...panier];
    const hashMapNames: string[] = [...recipesNames];
    if (checked) {
      ingredients.map((ingredient) => {
        const index = hashMapPanier.findIndex((el) => el[0] === ingredient);
        if (index === -1) {
          hashMapPanier.push([ingredient, 1]);
        } else {
          hashMapPanier[index][1] += 1;
        }
      });

      hashMapNames.push(name);
    } else {
      ingredients.map((ingredient) => {
        const index = hashMapPanier.findIndex((el) => el[0] === ingredient);
        if (index !== -1) {
          hashMapPanier[index][1] -= 1;
          if (hashMapPanier[index][1] === 0) {
            hashMapPanier.splice(index, 1);
          }
        }
      });
      hashMapNames.splice(
        hashMapNames.findIndex((el) => el === name),
        1
      );
    }
    setPanier(hashMapPanier);
    setRecipesNames(hashMapNames);
  };

  const handleInstructions = async (name: string) => {
    const ingredients = recipes.find((el) => el.name === name)?.ingredients;

    const userMsg: Message = {
      role: "user",
      content: `Recette: ${name}\n Ingredients: ${ingredients?.join(
        ", "
      )}\n Instructions: `,
    };

    await processToGPT([systemMsg, userMsg], name);
  };

  const processToGPT = async (messages: Message[], name: string) => {
    console.log("processing");
    const reqBody = {
      model: "gpt-3.5-turbo",
      messages: messages,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_OPEN_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    };

    setLoading(true);
    const res = await fetch(
      "https://api.openai.com/v1/chat/completions",
      fetchOptions
    );
    const data = await res.json();
    setInstructions({
      name: name,
      steps: data.choices[0].message.content.split("&&"),
    });
    setLoading(false);
    console.log(instructions?.steps.length);
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
              {recipesNames.length > 0 &&
                recipesNames.map((name, i) => (
                  <Instructions
                    key={i}
                    instructions={instructions}
                    recipeSelected={name}
                    handler={handleInstructions}
                    isLoading={loading}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="ingredients-ctn">
          {panier.length > 0 && (
            <h3>
              Liste de courses <small>( {panier.length} )</small>
            </h3>
          )}
          <div className="ingredients-data-ctn">
            <Ingredients data={panier} />
          </div>
        </div>
      </section>
    </>
  );
};

interface RecipesProps {
  handler: (checked: boolean, ingredients: string[], name: string) => void;
}
const Recipes = ({ handler }: RecipesProps) => {
  return (
    <tbody>
      {recipes.map((recipe, i) => (
        <tr key={i}>
          <td>
            <div className="checkbox-ctn">
              <Checkbox
                handler={handler}
                ingredients={recipe.ingredients}
                name={recipe.name}
              />
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

const Ingredients = ({ data }: { data: Panier[] }) => {
  return (
    <>
      <ul className="ingredients">
        {data.map((el, i) => (
          <li key={i} className="list-ingredient">
            <div>{el[0].charAt(0).toUpperCase() + el[0].slice(1)} </div>
            <div>
              {el[1]} ration{`${el[1] > 1 ? "s" : ""}`}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

interface InstructionsProps {
  instructions: Instructions | undefined;
  recipeSelected?: string;
  handler: (nameId: string) => void;
  isLoading?: boolean;
}
const Instructions = ({
  instructions,
  recipeSelected,
  handler,
  isLoading,
}: InstructionsProps) => {
  const steps = [];
  if (instructions?.name !== undefined) {
    steps.push(instructions.steps);
  }
  return (
    <div className="recipe-name-ctn">
      <div className="recipe-name-btn-ctn" style={{ marginBottom: "1rem" }}>
        <span>{recipeSelected}</span>
        {isLoading && <Loader />}
        <button
          id={recipeSelected}
          onClick={(e) => handler(e.currentTarget.id)}
        >
          Generate
        </button>
      </div>
      {steps && (
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
