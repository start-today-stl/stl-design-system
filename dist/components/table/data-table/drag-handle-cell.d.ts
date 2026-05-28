import { DragHandleProps } from './types';
interface DragHandleCellProps {
    isSelected?: boolean;
    hasLeftStickyColumns?: boolean;
    dragHandleProps?: DragHandleProps;
}
export declare function DragHandleCell({ isSelected, hasLeftStickyColumns, dragHandleProps, }: DragHandleCellProps): import("react/jsx-runtime").JSX.Element;
export {};
