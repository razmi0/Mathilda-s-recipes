import { useMemo, useState, type ReactNode } from "react";
import { Panier } from "../types";
import Button from "./ui/Button";
import CardHeading from "./ui/CardHeading";
import Icon from "./ui/Icons";

type Sort = "asc" | "desc";
type SortQuality = "Quantity" | "Alphab";
export type SortState = `${Sort}${SortQuality}` | "inherit";
type SortList = Record<SortState, Panier[]>;

export const IngredientsWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col my-8 card bg-card-500 min-w-72 z-20">{children}</div>;
};

type IngredientHeadingProps = {
  changeSortType: () => void;
  sortType: SortState;
  panierSize: number;
};
const IngredientHeading = ({ changeSortType, sortType, panierSize }: IngredientHeadingProps) => {
  const sortIcon: Record<SortState, JSX.Element> = {
    inherit: <Icon name="minus" title="Sort by default" width={20} color="#AEAEAEFF" />,
    ascAlphab: <Icon name="alphab-down" title="Sort by ascendent alphabetically" width={20} color="#AEAEAEFF" />,
    descAlphab: <Icon name="alphab-up" title="Sort by descendent alphabetically" width={20} color="#AEAEAEFF" />,
    ascQuantity: <Icon name="num-down" title="Sort by ascendent quantity" width={20} color="#AEAEAEFF" />,
    descQuantity: <Icon name="num-up" title="Sort by descendent quantity" width={20} color="#AEAEAEFF" />,
  };
  return (
    <CardHeading as={"h3"} classNames="horizontal items-center gap-3">
      Liste de courses <small>( {panierSize} )</small>
      <Button classNames="h-fit" ariaLabel="Sort the list" onClick={changeSortType}>
        Sort {sortIcon[sortType]}
      </Button>
    </CardHeading>
  );
};

type IngredientsProps = {
  paniers: Panier[];
};

const Ingredients = ({ paniers }: IngredientsProps) => {
  const [sortType, setSortType] = useState<SortState>("inherit");
  const pluriel = (word: string, quantity: number) => (quantity > 1 ? word + "s" : word);
  const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

  const changeSortType = () => {
    sortType === "inherit"
      ? setSortType("ascAlphab")
      : sortType === "ascAlphab"
      ? setSortType("descAlphab")
      : sortType === "descAlphab"
      ? setSortType("ascQuantity")
      : sortType === "ascQuantity"
      ? setSortType("descQuantity")
      : setSortType("inherit");
  };

  const sortedPaniers = (): SortList => {
    const descAlphabList = paniers.toSorted((a, b) => {
      const lowerA = a.label.toLowerCase();
      const lowerB = b.label.toLowerCase();

      if (lowerA < lowerB) return 1;
      if (lowerA > lowerB) return -1;
      return 0;
    });
    const ascAlphabList = descAlphabList.toReversed();
    const descQuantityList = paniers.toSorted((a, b) => b.quantity - a.quantity);
    const ascQuantityList = descQuantityList.toReversed();
    return {
      ascAlphab: ascAlphabList,
      descAlphab: descAlphabList,
      descQuantity: descQuantityList,
      ascQuantity: ascQuantityList,
      inherit: paniers,
    };
  };

  const lists = useMemo(() => sortedPaniers(), [paniers, sortedPaniers]);

  return (
    <>
      <IngredientHeading sortType={sortType} changeSortType={changeSortType} panierSize={paniers.length} />
      <div className="flex justify-center items-center">
        <ul className="w-full text-center px-2 py-1">
          {lists[sortType].map((ing, i) => (
            <li
              key={i}
              className="flex justify-between items-center py-1 px-2 hover:bg-blueish-200 transition-colors rounded-sm"
            >
              <div>{capitalize(ing.label)}</div>
              <div>
                {ing.quantity} {pluriel(" ration", ing.quantity)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Ingredients;