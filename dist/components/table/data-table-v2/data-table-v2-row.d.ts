import { DataTableV2Column } from './types';
import * as React from "react";
interface DataTableV2RowProps<T extends {
    id: string | number;
}> {
    row: T;
    rowIndex: number;
    columns: DataTableV2Column<T>[];
    leftOffsets: number[];
    rightOffsets: number[];
    lastLeftPinnedIdx: number;
    firstRightPinnedIdx: number;
    showLeftShadow: boolean;
    showRightShadow: boolean;
    totalWidth: number;
    translateY: number;
    isHovered: boolean;
    onHover: (id: T["id"] | null) => void;
    onHeightChange: (id: T["id"], height: number) => void;
    selectable: boolean;
    isSelected: boolean;
    onToggleSelect: (id: T["id"], rowIndex: number, shiftKey: boolean) => void;
    checkboxColWidth: number;
    expandable: boolean;
    isExpanded: boolean;
    canExpand: boolean;
    onToggleExpand: (id: T["id"]) => void;
    expandedContent: React.ReactNode;
    expandColWidth: number;
    onRowClick?: (row: T) => void;
    extraClassName?: string;
}
declare function DataTableV2RowInner<T extends {
    id: string | number;
}>({ row, rowIndex, columns, leftOffsets, rightOffsets, lastLeftPinnedIdx, firstRightPinnedIdx, showLeftShadow, showRightShadow, totalWidth, translateY, isHovered, onHover, onHeightChange, selectable, isSelected, onToggleSelect, checkboxColWidth, expandable, isExpanded, canExpand, onToggleExpand, expandedContent, expandColWidth, onRowClick, extraClassName, }: DataTableV2RowProps<T>): import("react/jsx-runtime").JSX.Element;
export declare const DataTableV2Row: typeof DataTableV2RowInner;
export {};
