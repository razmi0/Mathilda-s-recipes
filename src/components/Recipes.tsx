import type { ChangeEvent, MouseEvent, ReactNode } from "react";
import type { RecipesTableProps } from "../types";

export const RecipeTableWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col card bg-card-500 z-20">{children}</div>;
};

export const RecipeTable = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-start items-center text-left px-2">
      <table className="first:mt-3 last:mb-3">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

const Recipes = ({ recipes, select }: RecipesTableProps) => {
  return (
    <>
      {recipes.map((recipe, i) => {
        const localToggle = (e: MouseEvent | ChangeEvent) => {
          e.preventDefault();
          select({ id: recipe.id, value: !recipe.isSelected });
        };

        const htmlId = `checkbox-${i}_${recipe.id}`;
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
                <label className="checkbox-container" htmlFor={htmlId}>
                  <span className="sr-only">check {recipe.name}</span>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      localToggle(e);
                    }}
                    checked={recipe.isSelected}
                    id={htmlId}
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
    </>
  );
};

export default Recipes;
