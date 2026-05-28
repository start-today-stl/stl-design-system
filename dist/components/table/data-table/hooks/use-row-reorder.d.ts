import { DragEndEvent } from '@dnd-kit/core';
interface UseRowReorderOptions<T> {
    data: T[];
    onRowReorder?: (newData: T[]) => void;
}
/**
 * 로우 순서 변경 hook
 * - row- 접두사 ID로 식별
 * - arrayMove로 순서 변경 후 콜백 호출
 */
export declare function useRowReorder<T extends {
    id: string | number;
}>({ data, onRowReorder, }: UseRowReorderOptions<T>): {
    handleRowDragEnd: (event: DragEndEvent) => void;
};
export {};
