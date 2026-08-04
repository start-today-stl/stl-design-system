import { DragEndEvent } from '@dnd-kit/core';
interface UseRowReorderOptions<T> {
    data: T[];
    onRowReorder?: (newData: T[]) => void;
}
/**
 * 행 순서 변경 hook.
 * - `row-{id}` prefix 로 식별해서 컬럼 재정렬(id: accessorKey)과 구분
 * - arrayMove 로 순서 변경 후 콜백 호출
 * - onRowReorder 미지정 시 no-op (사용처에서 data 상태 관리 필요)
 */
export declare function useRowReorder<T extends {
    id: string | number;
}>({ data, onRowReorder, }: UseRowReorderOptions<T>): {
    handleRowDragEnd: (event: DragEndEvent) => void;
};
export {};
