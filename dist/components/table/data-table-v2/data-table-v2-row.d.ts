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
    editingColumnKey: keyof T | null;
    editingState: {
        editValue: T[keyof T];
        error?: string;
    } | null;
    onStartEdit: (row: T, col: DataTableV2Column<T>) => void;
    onChangeEditValue: (value: T[keyof T]) => void;
    onCompleteEdit: (col: DataTableV2Column<T>, row: T) => void;
    onCancelEdit: () => void;
    showRowDelete: boolean;
    onRowDelete?: (row: T) => void;
    rowActionsColWidth: number;
    rowActionsColLeftOffset: number;
    rowReorderable: boolean;
    dragHandleColWidth: number;
}
type DataTableV2RowComponent = <T extends {
    id: string | number;
}>(props: DataTableV2RowProps<T>) => React.ReactElement | null;
export declare const DataTableV2Row: DataTableV2RowComponent;
export {};
