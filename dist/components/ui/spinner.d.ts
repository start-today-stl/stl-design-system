import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const spinnerVariants: (props?: ({
    size?: "default" | "sm" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement>, VariantProps<typeof spinnerVariants> {
}
declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<SVGSVGElement>>;
export { Spinner, spinnerVariants };
