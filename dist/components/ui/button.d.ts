import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const buttonVariants: (props?: ({
    variant?: "link" | "text" | "default" | "destructive" | "ghost" | "ghost-outline" | "primary" | "primary-outline" | "danger" | "danger-outline" | "success" | "success-outline" | "outline" | "secondary" | null | undefined;
    size?: "default" | "sm" | "icon" | "icon-sm" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
