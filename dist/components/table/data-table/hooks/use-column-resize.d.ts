import { DataTableColumn } from '../types';
import * as React from "react";
interface UseColumnResizeOptions<T> {
    resizable: boolean;
    columnWidths?: Record<string, number>;
    onColumnResize?: (columnKey: keyof T, width: number) => void;
}
/**
 * 컬럼 리사이즈 hook
 * - 마우스 드래그로 컬럼 너비 조정
 * - 제어/비제어 컴포넌트 모두 지원
 * - 리사이징 중 전역 마우스 이벤트 처리
 */
export declare function useColumnResize<T>({ resizable, columnWidths, onColumnResize, }: UseColumnResizeOptions<T>): {
    resizingColumn: keyof T | null;
    getColumnWidth: (column: DataTableColumn<T>) => number | undefined;
    handleResizeStart: (e: React.MouseEvent, column: DataTableColumn<T>) => void;
};
export {};
