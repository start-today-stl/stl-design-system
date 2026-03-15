import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const badgeVariants: (props?: ({
    variant?: "primary-light" | "success-light" | "danger-light" | "primary-solid" | "success-solid" | "danger-solid" | "primary-outline" | "success-outline" | "danger-outline" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
