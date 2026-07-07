import { DataTableV2Column } from '../types';
import * as React from "react";
interface UseColumnResizeOptions<T> {
    resizable: boolean;
    columnWidths?: Record<string, number>;
    onColumnResize?: (columnKey: keyof T, width: number) => void;
}
/**
 * 컬럼 리사이즈 hook.
 * - 헤더 우측 handle 을 마우스 드래그해 폭 조절
 * - controlled (columnWidths 전달) 또는 내부 상태로 관리
 * - 최소 폭 50px
 */
export declare function useColumnResize<T>({ resizable, columnWidths, onColumnResize, }: UseColumnResizeOptions<T>): {
    resizingKey: keyof T | null;
    getColumnWidth: (column: DataTableV2Column<T>) => number | undefined;
    handleResizeStart: (e: React.MouseEvent, column: DataTableV2Column<T>) => void;
};
export {};
