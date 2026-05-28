import * as React from "react";
interface SortableHeaderCellProps {
    id: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
}
export declare function SortableHeaderCell({ id, children, className, style, disabled, }: SortableHeaderCellProps): import("react/jsx-runtime").JSX.Element;
export {};
