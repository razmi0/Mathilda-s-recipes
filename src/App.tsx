import { useState } from "react";
import { recipes } from "./recipes";
import "./App.css";

type Panier = [string, number];

const App = () => {
  const [panier, setPanier] = useState<Panier[]>([]); // liste des ingrédients

  const handlePanier = (checked: boolean, ingredients: string[]) => {
    const hashMap: Panier[] = [...panier];
    if (checked) {
      ingredients.map((ingredient) => {
        const index = hashMap.findIndex((el) => el[0] === ingredient);
        if (index === -1) {
          hashMap.push([ingredient, 1]);
        } else {
          hashMap[index][1] += 1;
        }
      });
      setPanier(hashMap);
    } else {
      ingredients.map((ingredient) => {
        const index = hashMap.findIndex((el) => el[0] === ingredient);
        if (index !== -1) {
          hashMap[index][1] -= 1;
          if (hashMap[index][1] === 0) {
            hashMap.splice(index, 1);
          }
        }
      });

      setPanier(hashMap);
    }
    console.log(panier);
  };

  return (
    <>
      <div className="main-ctn">
        <h1>Les recettes de Mathilda</h1>
        <div className="summary">
          <small>Nombres de recettes : {recipes.length}</small>
          <br />
          <small>Nombres d'ingrédients dans le panier : {panier.length}</small>
          <br />
        </div>
      </div>
      <div className="table-ctn">
        <table>
          <TableHead />
          <Recipes handler={handlePanier} />
        </table>
      </div>
    </>
  );
};

interface RecipesProps {
  handler: (checked: boolean, ingredients: string[]) => void;
}
const Recipes = ({ handler }: RecipesProps) => {
  return (
    <tbody>
      {recipes.map((recipe, i) => (
        <tr key={i}>
          <td>
            <input
              type={"checkbox"}
              onChange={(e) => handler(e.target.checked, recipe.ingredients)}
            />
          </td>
          <td>{recipe.nom}</td>
          <td>{recipe.date}</td>
          <td>{recipe.description}</td>
          <td>
            <ul className="ingredients">
              {recipe.ingredients.map((ingredient, j) => (
                <li key={j}>{ingredient}</li>
              ))}
            </ul>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Panier</th>
        <th>Nom</th>
        <th>Date</th>
        <th>Description</th>
        <th>Ingredients</th>
      </tr>
    </thead>
  );
};

export default App;

// titre + citation? + description + liste ingrédient
