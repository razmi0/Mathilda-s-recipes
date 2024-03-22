import { useCallback, useRef, useState } from "react";
import Ingredients, { IngredientsWrapper } from "./components/Ingredients";
import Instructions, { InstructionsWrapper } from "./components/Instructions";
import RecipeForm from "./components/RecipeForm";
import Recipes, { RecipeTable, RecipeTableWrapper } from "./components/Recipes";
import Button from "./components/ui/Button";
import CardHeading from "./components/ui/CardHeading";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/Dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/Dropdown";
import Icon from "./components/ui/Icons";
import Noise from "./components/ui/Noise";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/Popover";
import Show from "./components/ui/Show";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/Tabs";
import { Toaster } from "./components/ui/Toast";
import useClipboard from "./hooks/useClipboard";
import useGPT, { OpenAiKey } from "./hooks/useGPT";
import { useRecipe } from "./hooks/useRecipe";
import type { RecipeType } from "./types";

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { recipes, paniers, addRecipe, deleteRecipe, editRecipe, getRecipe, select, loading } = useRecipe();
  const [APIkeyInput, setAPIkeyInput] = useState({ validity: false, typing: true, key: "" });
  const [openAddRecipeModal, setOpenAddRecipeModal] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [defaultEditedId, setDefaultEditedId] = useState<RecipeType["id"]>(0);
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
                className="stroke-def-200 hover:stroke-def-100 hover:bg-darkblue-450 rounded-lg transition-colors p-1"
              />
            </PopoverTrigger>
            <PopoverContent side="left" sideOffset={-10} className="bg-darkblue-400 border-black/40">
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
                  className={`w-full px-2 py-1 my-2 rounded-md border-2 bg-darkblue-200 ${inputColor(
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
                  className={`border ${isSuccess === true ? "border-green-500" : "border-darkblue-400"}`}
                >
                  <Icon
                    check={isSuccess === true}
                    color={"#AEAEAEFF"}
                    name="copy"
                    title="Copy to clipboard"
                    width={37}
                    className={`stroke-def-200 hover:bg-darkblue-450 rounded-lg transition-colors p-1 `}
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
                <DropdownMenu dir="rtl">
                  <DropdownMenuTrigger role="button" tabIndex={0}>
                    <Icon
                      name="menu"
                      title="Open recipes menu"
                      width={30}
                      className="stroke-def-200 hover:stroke-def-100 hover:bg-darkblue-450 rounded-lg transition-colors p-1"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    avoidCollisions={false}
                    side="left"
                    sideOffset={-10}
                    className="bg-darkblue-400 border-black/40"
                  >
                    <DialogTrigger onClick={() => setOpenAddRecipeModal(true)} className="py-1 px-2">
                      <DropdownMenuItem
                        className="hover:bg-darkblue-300 cursor-pointer justify-between w-44"
                        onClick={() => setFormMode("add")}
                      >
                        <span>Add new recipe</span>
                        <Icon name="plus" title="Add new recipe" width={13} color="#AEAEAEFF" />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-darkblue-300 cursor-pointer justify-between w-44"
                        onClick={() => setFormMode("edit")}
                      >
                        <span>Edit a recipe</span>
                        <Icon name="modify" title="Edit a recipe" width={13} color="#AEAEAEFF" />
                      </DropdownMenuItem>
                    </DialogTrigger>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent
                  id="add-recipe-dialog"
                  className={`card bg-darkblue-300 ${
                    formMode === "edit" ? "translate-center w-9/12" : "translate-center-t40"
                  } z-[9999] h-fit `}
                  overlayClass="bg-black opacity-70"
                >
                  <DialogHeader>
                    <DialogTitle>{formMode === "add" ? "Create new recipe" : "Edit a recipe"}</DialogTitle>
                  </DialogHeader>
                  <Show when={formMode === "add"}>
                    <RecipeForm mode="add" onSubmit={addRecipe} closeModal={() => setOpenAddRecipeModal(false)} />
                  </Show>
                  <Show when={formMode === "edit"}>
                    <Tabs defaultValue={getRecipe?.(defaultEditedId)?.id.toString() ?? recipes[0]?.id.toString()}>
                      <TabsList className="bg-def-300 w-full grid grid-cols-4 h-fit gap-1 mb-5">
                        {recipes.map((recipe) => {
                          return (
                            <TabsTrigger
                              className={`bg-def-300 data-[state="active"]:bg-def-500 px-8`}
                              key={recipe.id}
                              value={recipe.id.toString()}
                            >
                              <span
                                id="tabs-trigger-active"
                                className="text-def-200 overflow-ellipsis overflow-hidden max-w-28"
                              >
                                {recipe.name}
                              </span>
                            </TabsTrigger>
                          );
                        })}
                      </TabsList>
                      {recipes.map((recipe) => {
                        return (
                          <TabsContent key={recipe.id} value={recipe.id.toString()}>
                            <RecipeForm
                              mode="edit"
                              editedRecipe={recipe}
                              onSubmit={editRecipe}
                              closeModal={() => setOpenAddRecipeModal(false)}
                            />
                          </TabsContent>
                        );
                      })}
                    </Tabs>
                  </Show>
                </DialogContent>
              </Dialog>
              {/* // */}
              {/* // */}
              {/* // */}
              {/* // */}
              {/* // */}
            </CardHeading>
            <RecipeTable>
              <Recipes
                recipes={recipes}
                select={select.action}
                deleteRecipe={deleteRecipe}
                selectDefaultRecipe={setDefaultEditedId}
                openEditModal={() => {
                  setFormMode("edit");
                  setOpenAddRecipeModal(true);
                }}
              />
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
      <Toaster />
    </>
  );
};

export default App;
