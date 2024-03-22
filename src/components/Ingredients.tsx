import { useMemo, useState, type ReactNode } from "react";
import { food } from "../data";
import { groupBy } from "../helpers";
import type { IngredientType } from "../types";
import Button from "./ui/Button";
import CardHeading from "./ui/CardHeading";
import Icon, { CircleIcon } from "./ui/Icons";
import { ScrollArea } from "./ui/ScrollArea";

type Sort = "asc" | "desc";
type SortQuality = "Quantity" | "Alphab" | "FoodType";
export type SortState = `${Sort}${SortQuality}` | "inherit";
type SortList = Record<SortState, IngredientType[]>;

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
    ascFoodType: <Icon name="ingredients" title="Group by most commum food type" width={20} color="#AEAEAEFF" />,
    descFoodType: (
      <Icon name="ingredients" mirror title="Group by least commun food type" width={20} color="#AEAEAEFF" />
    ),
  };
  return (
    <CardHeading as={"h3"} classNames="horizontal items-center gap-3">
      Liste de courses <small>( {panierSize} )</small>
      <Button className="h-fit" ariaLabel="Sort the list" onClick={changeSortType}>
        Sort {sortIcon[sortType]}
      </Button>
    </CardHeading>
  );
};

type IngredientsProps = {
  paniers: IngredientType[];
};

const Ingredients = ({ paniers }: IngredientsProps) => {
  const [sortType, setSortType] = useState<SortState>("inherit");
  const pluriel = (word: string, quantity: number) => (quantity > 1 ? word + "s" : word);
  const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

  const changeSortType = () => {
    switch (sortType) {
      case "inherit":
        setSortType("ascAlphab");
        break;
      case "ascAlphab":
        setSortType("descAlphab");
        break;
      case "descAlphab":
        setSortType("ascQuantity");
        break;
      case "ascQuantity":
        setSortType("descQuantity");
        break;
      case "descQuantity":
        setSortType("ascFoodType");
        break;
      case "ascFoodType":
        setSortType("descFoodType");
        break;
      default:
        setSortType("inherit");
        break;
    }
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
    const ascFoodTypeList = Object.entries(groupBy(paniers, "type"))
      .sort((a, b) => b[1].length - a[1].length)
      .map(([_, list]) => list)
      .flat();

    const descFoodTypeList = ascFoodTypeList.toReversed();

    return {
      ascAlphab: ascAlphabList,
      descAlphab: descAlphabList,
      descQuantity: descQuantityList,
      ascQuantity: ascQuantityList,
      ascFoodType: ascFoodTypeList,
      descFoodType: descFoodTypeList,
      inherit: paniers,
    };
  };

  const lists = useMemo(() => sortedPaniers(), [paniers, sortedPaniers]);

  return (
    <>
      <IngredientHeading sortType={sortType} changeSortType={changeSortType} panierSize={paniers.length} />
      <ScrollArea className="w-full h-fit max-h-96">
        <div className="flex justify-center items-center">
          <ul className="w-full text-center px-2 py-1 text-sm">
            {lists[sortType].map((ing, i) => (
              <li
                key={i}
                className="flex justify-between items-center py-1 px-2 hover:bg-darkblue-200 transition-colors rounded-sm"
              >
                <span className="horizontal">
                  <CircleIcon color={food[ing.type]} />
                  {capitalize(ing.label)}
                </span>
                <span>
                  {ing.quantity} {pluriel(" ration", ing.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>
    </>
  );
};

export default Ingredients;
