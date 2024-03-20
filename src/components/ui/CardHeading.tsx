import type { ElementType, ReactNode } from "react";

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

export default CardHeading;
