import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ElementType,
  type MouseEvent,
  type ReactNode,
} from "react";
import Button from "./components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/Dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/Dropdown";
import Icon from "./components/Icons";
import Loader from "./components/Loader";
import Noise from "./components/Noise";
import { Popover, PopoverContent, PopoverTrigger } from "./components/Popover";
import useClipBoard from "./hooks/useClipboard";
import { useRecipe, type RecipeType } from "./hooks/useRecipe";
import { isViableKey, processToGPT } from "./services/openAI";
import type { Message, Panier, RecipesProps, SelectedMeal } from "./types";

const initialiseSelectedMeal = (recipes: RecipeType[]): SelectedMeal[] => {
  const selectedMeals: SelectedMeal[] = [];
  for (let i = 0; i < recipes.length; i++) {
    selectedMeals.push({
      id: recipes[i].id,
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
  const inputRef = useRef<HTMLInputElement>(null);
  const { recipes, totalIngredients, addRecipe, deleteRecipe, editRecipe, getRecipe } = useRecipe();
  const [paniers, setPaniers] = useState<Panier[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<SelectedMeal[]>(initialiseSelectedMeal(recipes));
  const [openAddRecipeModal, setOpenAddRecipeModal] = useState(false);
  const [openDropdownRecipe, setOpenDropdownRecipe] = useState(false);

  const [APIkeyInput, setAPIkeyInput] = useState({ validity: false, typing: true, key: "" });
  const changeKey = (key: string) => setAPIkeyInput({ validity: isViableKey(key), typing: false, key });

  const { readClipboard } = useClipBoard(changeKey);

  const handleSelectedRecipe = (checked: boolean, id: number) => {
    const copySelectedMeal: SelectedMeal[] = [...selectedMeal];
    const copyPanier: Panier[] = [...paniers];
    const q = checked ? 1 : -1;
    const selectedIndex = copySelectedMeal.findIndex((meal) => meal.id === id);
    const ingredients = copySelectedMeal[selectedIndex].ingredients;

    copySelectedMeal[selectedIndex].isSelected = checked;

    for (let i = 0; i < ingredients.length; i++) {
      const index = copyPanier.findIndex((panier) => panier.ingredient === ingredients[i]);
      if (index == -1) {
        copyPanier.push({ ingredient: ingredients[i], quantity: 1 });
      } else {
        copyPanier[index].quantity += q;
        if (copyPanier[index].quantity == 0) {
          copyPanier.splice(index, 1);
        }
      }
    }

    setSelectedMeal(copySelectedMeal);
    setPaniers(copyPanier);
  };

  const handleInstructions = useCallback(
    async (name: string) => {
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

      const steps: string[] = await processToGPT([userMsg], APIkeyInput.key);

      setSelectedMeal((prev) => {
        const hashMapSelectedMeal = [...prev];
        hashMapSelectedMeal[index].isLoading = false;
        hashMapSelectedMeal[index].steps = steps;
        return hashMapSelectedMeal;
      });
    },
    [APIkeyInput.key, selectedMeal]
  );

  // color="#AEAEAEFF"

  const inputColor = (validity: boolean, typing: boolean) => {
    if (!typing) {
      return validity ? "border-green-500" : "border-red-500 outline-none";
    }
    return "border-black/40";
  };

  useEffect(() => {
    console.log("dialog effect : ", openAddRecipeModal);
    console.log("dropdown effect : ", openDropdownRecipe);
    // if (openAddRecipeModal) setOpenDropdownRecipe(true);
  }, [openAddRecipeModal, openDropdownRecipe]);

  return (
    <>
      <div className="container">
        <header className="flex items-center justify-between mt-8 mb-16">
          <h1 className="">Les recettes de Mathilda</h1>
          <Popover>
            <PopoverTrigger role="button" tabIndex={0}>
              <Icon
                title="Open settings"
                name="setting"
                width={40}
                className="stroke-def-200 hover:stroke-def-100 hover:bg-blueish-450 rounded-lg transition-colors p-1"
              />
            </PopoverTrigger>
            <PopoverContent side="left" sideOffset={-10} className="bg-blueish-400 border-black/40">
              <a className="text-sm underline text-def-200" href="https://platform.openai.com/api-keys" target="_blank">
                Get your API key from OpenAI
              </a>
              <div className="flex items-center justify-between w-full gap-1">
                <label htmlFor="open_API_key" className="sr-only">
                  open API key
                </label>
                <input
                  spellCheck="false"
                  autoComplete="off"
                  ref={inputRef}
                  type="text"
                  value={APIkeyInput.key}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setAPIkeyInput({
                        validity: isViableKey(APIkeyInput.key),
                        typing: false,
                        key: APIkeyInput.key,
                      });
                    }
                  }}
                  onChange={(e) => {
                    setAPIkeyInput({ validity: false, typing: true, key: e.target.value });
                  }}
                  placeholder="Enter your API key here"
                  className={`w-full px-2 py-1 my-2 rounded-md border-2 bg-blueish-200 ${inputColor(
                    APIkeyInput.validity,
                    APIkeyInput.typing
                  )}`}
                  id="open_API_key"
                />
                <Button ariaLabel="Paste from clipboard" onClick={readClipboard} variant="invisible">
                  <Icon
                    name="paste"
                    title="Paste from clipboard"
                    width={30}
                    className="stroke-def-200 hover:stroke-def-100 hover:bg-blueish-450 rounded-lg transition-colors p-1"
                  />
                </Button>
              </div>
              <Button
                ariaLabel="Confirm API key"
                onClick={() => {
                  setAPIkeyInput({
                    validity: isViableKey(APIkeyInput.key),
                    typing: false,
                    key: APIkeyInput.key,
                  });
                }}
              >
                Confirm
              </Button>
            </PopoverContent>
          </Popover>
        </header>
        <section className="flex flex-col justify-between items-start">
          {/* RECETTES */}
          <div className="flex flex-col card z-20">
            <CardHeading as="h3" classNames="flex items-center justify-between">
              <span>
                Recettes <small>( {recipes.length} )</small>
              </span>
              {/* // */}
              {/* // */}
              {/* // */}
              {/* // */}
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger role="button" tabIndex={0}>
                    <Icon
                      name="menu"
                      title="Open recipes menu"
                      width={30}
                      className="stroke-def-200 hover:stroke-def-100 hover:bg-blueish-450 rounded-lg transition-colors p-1"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="left" sideOffset={-10} className="bg-blueish-400 border-black/40">
                    <DialogTrigger asChild>
                      <DropdownMenuItem className="hover:bg-blueish-300 cursor-pointer">
                        Add new recipe
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* <DialogOverlay> */}
                <DialogContent className="card translate-center z-[9999]">
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. Are you sure you want to permanently delete this file from our
                      servers?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={() => {}} ariaLabel="Confirm" type="submit">
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
                {/* </DialogOverlay> */}
              </Dialog>
              {/* // */}
              {/* // */}
              {/* // */}
              {/* // */}
              {/* // */}
            </CardHeading>
            <div className="flex justify-start items-center text-left px-2">
              <table className="first:mt-3 last:mb-3">
                <Recipes selectRecipe={handleSelectedRecipe} recipes={recipes} />
              </table>
            </div>
          </div>
          <section className="flex justify-evenly w-full">
            {/* PANIER */}
            {paniers.length > 0 && (
              <div className="flex flex-col my-8 card min-w-80 z-20">
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
              <div className="w-fit mt-8 flex flex-col justify-start items-center card z-20 h-fit min-w-80">
                <CardHeading as={"h3"} classNames="w-full">
                  Instructions
                </CardHeading>
                {selectedMeal.map((meal, i) => {
                  if (meal.isSelected) {
                    return <Instructions key={i} meal={meal} handler={handleInstructions} />;
                  }
                })}
              </div>
            )}
          </section>
        </section>
        <footer className="w-full h-8"></footer>
      </div>
      <Noise />
    </>
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

const Recipes = ({ selectRecipe, recipes }: RecipesProps) => {
  const [checked, setChecked] = useState<boolean[]>(new Array(recipes.length).fill(false));

  const toggleCheckedRecipe = (i: number, id: number) => {
    const newChecked = [...checked];
    newChecked[i] = !newChecked[i];
    setChecked(newChecked);
    selectRecipe(newChecked[i], id);
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
          toggleCheckedRecipe(i, recipe.id);
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
                    checked={checked[i]}
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
        <Button ariaLabel="Generate instructions" onClick={() => handler(name)} loading={isLoading} loader={<Loader />}>
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
