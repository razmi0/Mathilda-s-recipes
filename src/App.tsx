import { useCallback, useRef, useState } from "react";
import AddRecipeForm from "./components/RecipeForm";
import Ingredients, { IngredientsWrapper } from "./components/Ingredients";
import Instructions, { InstructionsWrapper } from "./components/Instructions";
import Recipes, { RecipeTable, RecipeTableWrapper } from "./components/Recipes";
import Button from "./components/ui/Button";
import CardHeading from "./components/ui/CardHeading";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./components/ui/Dropdown";
import Icon from "./components/ui/Icons";
import Noise from "./components/ui/Noise";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/Popover";
import Show from "./components/ui/Show";
import useClipboard from "./hooks/useClipboard";
import useGPT, { OpenAiKey } from "./hooks/useGPT";
import { useRecipe } from "./hooks/useRecipe";
import type { RecipeType } from "./types";

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const { recipes, paniers, addRecipe, deleteRecipe, editRecipe, getRecipe, select, loading } = useRecipe();
  const [APIkeyInput, setAPIkeyInput] = useState({ validity: false, typing: true, key: "" });
  const [openAddRecipeModal, setOpenAddRecipeModal] = useState(false);
  const [openEditRecipeModal, setOpenEditRecipeModal] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<RecipeType | null>(null);
  const { copyToClipboard, isSuccess } = useClipboard({ delayBeforeUnSuccess: 2000 });
  const { processToGPT, setAPIkey, setUserMessages, testKey } = useGPT();

  const handleInstructions = useCallback(
    async (id: number) => {
      // Get the recipe name and ingredients
      const index = select.state.findIndex((recipe) => recipe.id === id);
      if (index === -1) return;
      const recipeIngredients = select.state[index].ingredients.map((ing) => ing.label);
      const recipeName = select.state[index].name;

      // Set the user messages
      setUserMessages({ name: recipeName, ingredients: recipeIngredients });

      // Get the steps from GPT
      loading.action({ id, value: true });
      const steps: string[] | undefined = await processToGPT();
      loading.action({ id, value: false });
      if (!steps) return;

      // Edit the recipe with the new steps
      editRecipe({ id, steps });
    },
    [editRecipe, loading, processToGPT, select.state, setUserMessages]
  );

  const inputColor = (validity: boolean, typing: boolean) => {
    if (!typing) {
      return validity ? "border-green-500" : "border-red-500 outline-none";
    }
    return "border-black/40";
  };

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
                        validity: testKey(APIkeyInput.key),
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
                <Button
                  ariaLabel="Copy to clipboard"
                  onClick={() => {
                    copyToClipboard(APIkeyInput.key);
                  }}
                  variant="invisible"
                  className={`border ${isSuccess === true ? "border-green-500" : "border-blueish-400"}`}
                >
                  <Icon
                    check={isSuccess === true}
                    color={"#AEAEAEFF"}
                    name="copy"
                    title="Copy to clipboard"
                    width={37}
                    className={`stroke-def-200 hover:bg-blueish-450 rounded-lg transition-colors p-1 `}
                  />
                </Button>
              </div>
              <Button
                ariaLabel="Confirm API key"
                onClick={() => {
                  const valid = testKey(APIkeyInput.key);
                  setAPIkeyInput({
                    validity: valid,
                    typing: false,
                    key: APIkeyInput.key,
                  });
                  if (valid) setAPIkey(APIkeyInput.key as OpenAiKey);
                }}
              >
                Confirm
              </Button>
            </PopoverContent>
          </Popover>
        </header>
        <section className="flex flex-col justify-between items-start">
          {/* RECETTES */}
          <RecipeTableWrapper>
            <CardHeading as="h3" classNames="flex items-center justify-between">
              <span>
                Recettes <small>( {recipes.length} )</small>
              </span>
              {/* // */}
              {/* // */}
              {/* // */}
              {/* // */}
              <Dialog open={openAddRecipeModal} onOpenChange={(b) => setOpenAddRecipeModal(b)}>
                <DropdownMenu>
                  <DropdownMenuTrigger role="button" tabIndex={0}>
                    <Icon
                      name="menu"
                      title="Open recipes menu"
                      width={30}
                      className="stroke-def-200 hover:stroke-def-100 hover:bg-blueish-450 rounded-lg transition-colors p-1"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    avoidCollisions={false}
                    side="left"
                    sideOffset={-10}
                    className="bg-blueish-400 border-black/40 w-44"
                  >
                    <DialogTrigger asChild onClick={() => setOpenAddRecipeModal(true)}>
                      <DropdownMenuItem className="hover:bg-blueish-300 cursor-pointer justify-between">
                        <Icon name="plus" title="Add new recipe" width={13} color="#AEAEAEFF" />
                        <span>Add new recipe</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger
                        id="DropdownMenuSubTrigger"
                        className="hover:bg-blueish-300 cursor-pointer"
                      >
                        <span>Edit a recipe</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent
                          ref={subMenuRef}
                          id="DropdownMenuSubContent"
                          className="bg-blueish-400 border-black/40 min-w-24"
                        >
                          {recipes.map((recipe) => {
                            return (
                              <DropdownMenuItem
                                key={recipe.id}
                                className="hover:bg-blueish-300 cursor-pointer"
                                onClick={() => {
                                  const choosen = getRecipe(recipe.id);
                                  if (!choosen) {
                                    console.warn("Recipe not found");
                                    return;
                                  }
                                  setEditedRecipe(choosen);
                                  setOpenEditRecipeModal(true);
                                }}
                              >
                                <span>{recipe.name}</span>
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent
                  id="add-recipe-dialog"
                  className="card bg-blueish-300 translate-center-t40 z-[9999] h-fit w-9/12 max-w-full"
                  overlayClass="bg-black opacity-70"
                >
                  <DialogHeader>
                    <DialogTitle>Create a new recipe</DialogTitle>
                  </DialogHeader>
                  <AddRecipeForm addRecipe={addRecipe} closeModal={() => setOpenAddRecipeModal(false)} />
                  {/* <EditRecipeForm
                    editRecipe={editRecipe}
                    closeModal={() => setOpenEditRecipeModal(false)}
                    editedRecipes={editedRecipe}
                  /> */}
                </DialogContent>
              </Dialog>
              {/* // */}
              {/* // */}
              {/* // */}
              {/* // */}
              {/* // */}
            </CardHeading>
            <RecipeTable>
              <Recipes recipes={recipes} select={select.action} deleteRecipe={deleteRecipe} />
            </RecipeTable>
          </RecipeTableWrapper>
          <section className="flex justify-evenly w-full md:flex-row flex-col md:gap-3">
            <Show when={paniers.length > 0}>
              <IngredientsWrapper>
                <Ingredients paniers={paniers} />
              </IngredientsWrapper>
            </Show>
            <Show when={paniers.length > 0}>
              <InstructionsWrapper>
                <CardHeading as={"h3"} classNames="w-full">
                  Instructions
                </CardHeading>
                <Instructions generateInstructions={handleInstructions} selected={select.state} />
              </InstructionsWrapper>
            </Show>
          </section>
        </section>
        <footer className="w-full h-8"></footer>
      </div>
      <Noise />
    </>
  );
};

export default App;
