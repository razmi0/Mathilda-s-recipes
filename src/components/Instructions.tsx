import type { ReactNode } from "react";
import type { RecipeType } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/Accordion";
import Button from "./ui/Button";
import Loader from "./ui/Loader";

type InstructionsProps = {
  generateInstructions: (id: number & RecipeType["id"]) => void;
  selected: RecipeType[];
};

export const InstructionsWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-fit mt-8 flex flex-col justify-start items-center card bg-card-500 z-20 h-fit min-w-96"
    >
      {children}
    </Accordion>
  );
};

const Instructions = ({ generateInstructions, selected }: InstructionsProps) => {
  const highlightIngredients = (step: string) => {
    const regex = /[\s,.;']+/gi;
    const wordsInStep = step.split(regex);
    const ingredients = selected
      .map((recipe) => recipe.ingredients.map((ingredient) => ingredient.label.toLowerCase()))
      .flat()
      .join("");
    const w = wordsInStep.map((word) => {
      const regex = new RegExp(word, "gi");
      if (
        word === "la" ||
        word === "le" ||
        word === "les" ||
        word === "de" ||
        word === "du" ||
        word === "des" ||
        word === "d'"
      )
        return word + " ";
      if (ingredients.match(regex)) {
        return (
          <span className="text-blue-500 underline" key={word}>
            {word}
          </span>
        );
      }
      return word + " ";
    });
    return w;
  };
  return (
    <div className="pt-2 w-full">
      {selected.map((recipe) => {
        return (
          <AccordionItem
            value={recipe.name}
            className="w-full text-left last:rounded-md border-black/40"
            key={recipe.name}
          >
            <AccordionTrigger className="flex justify-between items-center py-2 px-2 gap-2 hover:bg-blueish-200 rounded-sm">
              <span className="text-left">{recipe.name}</span>
              <div className="flex-grow" />
            </AccordionTrigger>

            <AccordionContent className="flex flex-col">
              {recipe.steps.length > 0 && (
                <ol className="w-full flex flex-col justify-start items-start p-0 list-none ">
                  {recipe.steps.map((step, i) => (
                    <li key={step} className="px-3">
                      <span className="font-semibold mr-2">{i}.</span>
                      {highlightIngredients(step)}
                    </li>
                  ))}
                </ol>
              )}
              <div className="w-full horizontal items-center justify-center my-2">
                <div className="flex flex-row-reverse w-fit p-2 items-center gap-4 card bg-blueish-400 ">
                  <Button
                    ariaLabel="Generate instructions"
                    onClick={() => generateInstructions(recipe.id)}
                    loading={recipe.isLoading}
                    loader={<Loader />}
                    classNames="w-fit"
                    data-action="generate-instructions"
                  >
                    Generate
                  </Button>
                  <p>{recipe.steps.length > 0 ? "Regenerate instructions : " : "No instruction yet : "}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </div>
  );
};

export default Instructions;
