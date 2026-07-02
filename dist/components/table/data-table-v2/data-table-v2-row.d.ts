import { DataTableV2Column } from './types';
interface DataTableV2RowProps<T extends {
    id: string | number;
}> {
    row: T;
    columns: DataTableV2Column<T>[];
    gridTemplateColumns: string;
    translateY: number;
    onHeightChange: (id: T["id"], height: number) => void;
}
declare function DataTableV2RowInner<T extends {
    id: string | number;
}>({ row, columns, gridTemplateColumns, translateY, onHeightChange, }: DataTableV2RowProps<T>): import("react/jsx-runtime").JSX.Element;
/**
 * 행 컴포넌트.
 * - position absolute + translate3d(0, Math.round(y), 0) 로 sub-pixel 제거
 * - ResizeObserver 로 실제 높이 부모에 보고 → 부모가 다음 행 위치 재계산
 */
export declare const DataTableV2Row: typeof DataTableV2RowInner;
export {};
