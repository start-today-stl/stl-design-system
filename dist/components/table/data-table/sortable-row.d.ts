import { DragHandleProps } from './types';
import * as React from "react";
interface SortableRowProps {
    id: string;
    children: React.ReactNode | ((dragHandleProps: DragHandleProps) => React.ReactNode);
    className?: string;
    isSelected?: boolean;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
export declare function SortableRow({ id, children, className, isSelected, onClick, onMouseEnter, onMouseLeave, }: SortableRowProps): import("react/jsx-runtime").JSX.Element;
export {};
