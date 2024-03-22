import { useState, type ChangeEvent, type MouseEvent, type ReactNode } from "react";
import type { RecipesTableProps } from "../types";
import Button from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import Icon from "./ui/Icons";

export const RecipeTableWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col card bg-card-500 z-20">{children}</div>;
};

export const RecipeTable = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-start items-center text-left ps-2">
      <div className="first:mt-3 last:mb-3" role="table">
        <div role="rowgroup">{children}</div>
      </div>
    </div>
  );
};

const Recipes = ({ recipes, select, deleteRecipe, selectDefaultRecipe, openEditModal }: RecipesTableProps) => {
  const [openWarningDeleteModal, setOpenWarningDeleteModal] = useState(false);

  const toggleModalWarningDelete = (e: MouseEvent) => {
    e.stopPropagation();
    setOpenWarningDeleteModal(true);
  };

  const cancelDelete = (e: MouseEvent) => {
    e.stopPropagation();
    setOpenWarningDeleteModal(false);
  };

  const deleteAndClose = (e: MouseEvent, id: number) => {
    e.stopPropagation();
    deleteRecipe(id);
    setOpenWarningDeleteModal(false);
  };

  return (
    <>
      {recipes.map((recipe, i) => {
        const selectRecipe = (e: MouseEvent | ChangeEvent) => {
          select({ id: recipe.id, value: !recipe.isSelected });
        };

        const editAndDefault = (e: MouseEvent) => {
          e.stopPropagation();
          selectDefaultRecipe(recipe.id);
          openEditModal();
        };

        const deleteAndCloseId = (e: MouseEvent) => {
          e.stopPropagation();
          deleteAndClose(e, recipe.id);
        };

        const htmlId = `checkbox-${i}_${recipe.id}`;
        return (
          <tr
            key={recipe.name}
            className={`${
              recipe.isSelected ? "bg-darkblue-200" : "hover:bg-darkblue-200"
            } transition-colors cursor-pointer rounded-sm group`}
            onClick={(e) => {
              // openAccordion(e);
              // todo : add chevron and rotation + open accordion
              selectRecipe(e);
            }}
          >
            {/* CHECKBOX */}
            <td>
              <div className="checkbox-ctn">
                <label className="checkbox-container" htmlFor={htmlId}>
                  <span className="sr-only">check {recipe.name}</span>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      selectRecipe(e);
                    }}
                    checked={recipe.isSelected}
                    id={htmlId}
                  />
                  <div className="checkmark"></div>
                </label>
              </div>
            </td>
            {/*  */}
            <td data-row="name">{recipe.name}</td>
            <td data-row="description">{recipe.description}</td>
            <td
              data-row="delete&edit"
              className={`opacity-0  ${
                recipe.isSelected ? "opacity-100" : "group-hover:opacity-100"
              } transition-opacity items-center flex justify-center`}
            >
              {/*  */}
              {/* DIALOG delete&edit */}
              {/*  */}
              <div className="flex items-center h-full">
                <Dialog open={openWarningDeleteModal} onOpenChange={(b) => setOpenWarningDeleteModal(b)}>
                  <DialogTrigger onClick={toggleModalWarningDelete} data-action="open-delete-modal">
                    <Icon
                      title="delete this recipe"
                      name="delete"
                      width={40}
                      color="#AEAEAEFF"
                      className={`stroke-def-200 hover:stroke-def-100 hover:bg-darkblue-300 rounded-lg transition-colors p-2`}
                    />
                  </DialogTrigger>
                  <DialogContent
                    id="warning-delete-recipe-dialog"
                    className="card translate-center z-[9999] h-fit w-4/12 bg-darkblue-300"
                    overlayClass="bg-black opacity-40"
                  >
                    <DialogHeader>
                      <DialogTitle>Warning</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Are you sure you want to delete this recipe?</DialogDescription>
                    <DialogFooter>
                      <Button ariaLabel="cancel action and close panel" onClick={cancelDelete as () => void}>
                        Cancel
                      </Button>
                      <Button
                        ariaLabel="delete this recipe and close panel"
                        onClick={deleteAndCloseId as () => void}
                        className="hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button ariaLabel="Edit this recipe" variant="invisible" onClick={editAndDefault as () => void}>
                  <Icon
                    name="modify"
                    title="edit this recipe"
                    width={40}
                    color="#AEAEAEFF"
                    className="stroke-def-200 hover:stroke-def-100 hover:bg-darkblue-300 rounded-lg transition-colors p-2"
                  />
                </Button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default Recipes;
