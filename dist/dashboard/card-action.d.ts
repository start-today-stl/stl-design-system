import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const cardActionVariants: (props?: ({
    selected?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface CardActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof cardActionVariants> {
}
declare const CardAction: React.ForwardRefExoticComponent<CardActionProps & React.RefAttributes<HTMLButtonElement>>;
export { CardAction, cardActionVariants };
