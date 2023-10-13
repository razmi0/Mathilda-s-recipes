import { recipes } from "./recipes";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="main-ctn">
        <h1>Les recettes de Mathilda</h1>
      </div>
      <div className="table-ctn">
        <table>
          <TableHead />
          <Recipes />
        </table>
      </div>
    </>
  );
};

const Recipes = () => {
  return (
    <tbody>
      {recipes.map((recipe, i) => (
        <tr key={i}>
          <td>{recipe.nom}</td>
          <td>{recipe.date}</td>
          <td>{recipe.citation}</td>
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
        <th>Nom</th>
        <th>Date</th>
        <th>Citation</th>
        <th>Description</th>
        <th>Ingredients</th>
      </tr>
    </thead>
  );
};

export default App;

// titre + citation? + description + liste ingrédient
