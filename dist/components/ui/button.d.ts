import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const buttonVariants: (props?: ({
    variant?: "text" | "primary-outline" | "success-outline" | "danger-outline" | "ghost" | "ghost-outline" | "primary" | "danger" | "success" | null | undefined;
    size?: "default" | "sm" | "icon" | "icon-sm" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    /** 로딩 상태 (스피너 표시) */
    loading?: boolean;
    /** 라벨이 없어도 라벨 공간 유지 (폼 요소와 높이 맞춤) */
    reserveLabelSpace?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
