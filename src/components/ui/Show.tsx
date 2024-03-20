import type { ReactNode } from "react";

type ShowProps = {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
};

const Show = ({ when, children, fallback = <></> }: ShowProps) => {
  return <>{when ? children : fallback}</>;
};

export default Show;
