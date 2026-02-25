import { VariantProps } from 'class-variance-authority';
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
declare const switchVariants: (props?: ({
    size?: "default" | "sm" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, VariantProps<typeof switchVariants> {
    /** 라벨 텍스트 */
    label?: string;
    /** 필수 입력 표시 (라벨 앞에 점 표시) */
    required?: boolean;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
export { Switch, switchVariants };
