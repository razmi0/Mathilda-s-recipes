import * as React from "react";

const classes =
  "inline-flex items-center rounded-lg card bg-card-500 ps-2.5 pe-0 bg-def-500 py-0 h-8 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const badgeVariants = {
  variant: {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  },
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof (typeof badgeVariants)["variant"];
}

function Badge({ className, variant = "outline", ...props }: BadgeProps) {
  return (
    <div data-badge="mounted" className={`${badgeVariants.variant[variant]} ${classes} ${className}`} {...props} />
  );
}

export { Badge, badgeVariants };
