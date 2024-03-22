import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { RecipesTableProps } from "../types";
import Button from "./ui/Button";
import Checkbox from "./ui/Checkbox";
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
  return (
    <div data-is="table-wrapper" className="min-w-full card bg-card-500 z-20">
      {children}
    </div>
  );
};

export const RecipeTable = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex vertical flex-auto justify-start">
      <div data-is="table" className="first:mt-3 last:mb-3" role="table">
        {children}
      </div>
    </div>
  );
};

type HeaderLabels = { key?: string; value?: string }[];
type HeaderJSXLabels = { key: string; value: ReactNode }[];

export function RecipeHeader({ labels }: { labels: HeaderLabels | HeaderJSXLabels }) {
  const headWidth = useRef<HTMLDivElement>(null);
  const [normalizedWidth, setNormalizedWidth] = useState<string | undefined>();

  const fixedSizes = {
    collapse: 32,
    checkboxes: 44,
  };

  const calcWidth = () => {
    if (headWidth.current) {
      setNormalizedWidth(
        (
          (headWidth.current.offsetWidth - fixedSizes.collapse - fixedSizes.checkboxes) /
          (labels as HeaderLabels).length
        ).toFixed(2)
      );
    }
  };

  useLayoutEffect(() => {
    calcWidth();
  }, []);

  return (
    <>
      {labels && (
        <div role="rowgroup" data-is="thead" ref={headWidth}>
          <div role="row" data-is="tr">
            <style>
              {`
                [data-is="td"], [data-is="th"] {
                  min-width: ${normalizedWidth}px;
                  max-width: ${normalizedWidth}px;
                  width: ${normalizedWidth}px;
                }
                
              `}
            </style>
            <div key="collapse-header-space" data-action="trigger-row" role="columnheader" data-is="th"></div>
            <div key="checkboxes" data-action="select-row" role="columnheader" data-is="th"></div>
            {labels.map((label, i) => (
              <div role="columnheader" data-is="th" key={label.key || (label.value as string) || i}>
                <span>{label.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export const RecipeBody = ({ children }: { children: ReactNode }) => {
  return (
    <div role="rowgroup" data-is="tbody">
      {children}
    </div>
  );
};

const RecipeRow = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => {
  return (
    <div role="row" data-is="tr" ref={ref} {...props} className="flex">
      {children}
    </div>
  );
});

const RecipeCell = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => {
  return (
    <div role="cell" data-is="td" ref={ref} {...props} className="border-def-200 flex">
      {children}
    </div>
  );
});

type RecipeRowTriggerProps = HTMLAttributes<HTMLDivElement> & {
  isExpanded: boolean;
};
const RecipeRowTrigger = forwardRef<HTMLDivElement, RecipeRowTriggerProps>(
  ({ children, isExpanded, onClick, ...props }, ref) => {
    return (
      <div role="cell" data-is="td" data-action="trigger-row" ref={ref} {...props} className="flex">
        <Button
          ariaLabel="expand this row"
          variant="invisible"
          onClick={onClick as () => void}
          aria-expanded={isExpanded}
          className="flex items-center justify-center h-full w-full"
        >
          {children}
          <Icon
            title="expand"
            name="chevron-right"
            color="#EBEBEBFF"
            className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : "rotate-0"}`}
            width={20}
          />
        </Button>
      </div>
    );
  }
);

const Recipes = ({
  recipes,
  select,
  deleteRecipe,
  selectDefaultRecipe,
  openEditModal,
  ingredients,
  instructions,
}: RecipesTableProps) => {
  const [openWarningDeleteModal, setOpenWarningDeleteModal] = useState(false);
  const [expandRows, setExpandRows] = useState<boolean[]>(recipes.map(() => false));

  useEffect(() => {
    const newSize = recipes.length;
    if (expandRows.length < newSize) {
      setExpandRows([...expandRows, ...new Array(newSize - expandRows.length).fill(false)]);
    } else if (expandRows.length > newSize) {
      setExpandRows(expandRows.slice(0, newSize));
    }
    console.log("expandRows effect", expandRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

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
        const selectRecipe = () => {
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

        const expandThisRow = (e: MouseEvent) => {
          e.stopPropagation();
          setExpandRows((prev) => prev.map((val, index) => (index === i ? !val : val)));
          console.log("expandRows", expandRows);
        };

        const htmlId = `checkbox-${i}_${recipe.id}`;
        return (
          <article key={htmlId}>
            <RecipeRow
              className={`${
                recipe.isSelected ? "bg-darkblue-200" : "hover:bg-darkblue-200"
              } transition-colors cursor-pointer rounded-sm group`}
              onClick={selectRecipe}
            >
              <RecipeRowTrigger onClick={expandThisRow} isExpanded={expandRows[i]} />
              <RecipeCell data-action="select-row">
                <Checkbox htmlFor={htmlId} checked={recipe.isSelected} onChange={selectRecipe}>
                  Check {recipe.name}
                </Checkbox>
              </RecipeCell>
              <RecipeCell data-row="name">{recipe.name}</RecipeCell>
              <RecipeCell data-row="description">{recipe.date}</RecipeCell>
              <RecipeCell data-row="ingredients">{recipe.ingredients.length}</RecipeCell>
              <RecipeCell data-row="instructions">
                {recipe.ingredients?.reduce((acc, cur) => acc + cur.quantity, 0)}
              </RecipeCell>
              <RecipeCell
                data-row="delete&edit"
                className={`opacity-0  ${
                  recipe.isSelected ? "opacity-100" : "group-hover:opacity-100"
                } transition-opacity`}
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
              </RecipeCell>
            </RecipeRow>
          </article>
        );
      })}
    </>
  );
};

export default Recipes;
