import { DragEndEvent } from '@dnd-kit/core';
import { DataTableV2Column } from '../types';
interface UseColumnReorderOptions<T> {
    columns: DataTableV2Column<T>[];
    columnReorderable: boolean;
    columnOrder?: (keyof T)[];
    onColumnReorder?: (newOrder: (keyof T)[]) => void;
}
/**
 * 컬럼 순서 변경 hook.
 * - 헤더 드래그(@dnd-kit)로 순서 변경
 * - controlled (columnOrder 전달) 또는 내부 상태로 관리
 * - columns 변경(추가/삭제)에도 내부 순서 자동 동기화
 */
export declare function useColumnReorder<T>({ columns, columnReorderable, columnOrder, onColumnReorder, }: UseColumnReorderOptions<T>): {
    orderedColumns: DataTableV2Column<T>[];
    currentOrder: (keyof T)[];
    handleColumnDragEnd: (e: DragEndEvent) => void;
};
export {};
