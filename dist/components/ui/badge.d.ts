import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const badgeVariants: (props?: ({
    variant?: "primary-light" | "success-light" | "warning-light" | "danger-light" | "neutral-light" | "primary-solid" | "success-solid" | "warning-solid" | "danger-solid" | "neutral-solid" | "primary-outline" | "success-outline" | "warning-outline" | "danger-outline" | "neutral-outline" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
