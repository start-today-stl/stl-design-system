import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const chipVariants: (props?: ({
    variant?: "selected" | "default" | "outline" | "outline-selected" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">, VariantProps<typeof chipVariants> {
    /** 칩 내용 */
    children: React.ReactNode;
    /** 삭제 가능 여부 (X 버튼 표시) */
    removable?: boolean;
    /** 삭제 버튼 클릭 핸들러 */
    onRemove?: () => void;
    /** 클릭 핸들러 (선택형 칩용) */
    onClick?: () => void;
    /** 비활성화 */
    disabled?: boolean;
    /** 왼쪽 아이콘/요소 */
    leftElement?: React.ReactNode;
}
declare const Chip: React.ForwardRefExoticComponent<ChipProps & React.RefAttributes<HTMLDivElement>>;
export { Chip, chipVariants };
