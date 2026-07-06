import { DataTableV2Column } from './types';
interface DataTableV2RowProps<T extends {
    id: string | number;
}> {
    row: T;
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
}
declare function DataTableV2RowInner<T extends {
    id: string | number;
}>({ row, columns, leftOffsets, rightOffsets, lastLeftPinnedIdx, firstRightPinnedIdx, showLeftShadow, showRightShadow, totalWidth, translateY, isHovered, onHover, onHeightChange, }: DataTableV2RowProps<T>): import("react/jsx-runtime").JSX.Element;
export declare const DataTableV2Row: typeof DataTableV2RowInner;
export {};
