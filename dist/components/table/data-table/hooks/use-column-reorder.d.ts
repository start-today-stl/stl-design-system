import { DragEndEvent } from '@dnd-kit/core';
import { DataTableColumn } from '../types';
interface UseColumnReorderOptions<T> {
    columns: DataTableColumn<T>[];
    columnReorderable: boolean;
    columnOrder?: (keyof T)[];
    onColumnReorder?: (newOrder: (keyof T)[]) => void;
}
/**
 * 컬럼 순서 변경 hook
 * - 드래그 앤 드롭으로 컬럼 순서 변경
 * - 제어/비제어 컴포넌트 모두 지원
 */
export declare function useColumnReorder<T>({ columns, columnReorderable, columnOrder, onColumnReorder, }: UseColumnReorderOptions<T>): {
    orderedColumns: DataTableColumn<T>[];
    currentColumnOrder: (keyof T)[];
    handleColumnDragEnd: (event: DragEndEvent) => void;
};
export {};
