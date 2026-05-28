import { SortDirection } from '../../table';
import { SortState } from '../types';
interface UseSortOptions<T> {
    sortState: SortState<T>[] | SortState<T> | undefined;
    onSortChange: ((sortState: SortState<T>[]) => void) | undefined;
    multiSort: boolean;
    shouldWarn: boolean;
}
/**
 * 정렬 hook
 * - sortState 배열 정규화 (legacy 단일 객체 호환)
 * - 단일/다중 정렬 모드 핸들링
 * - 정렬 방향 및 다중 정렬 우선순위 조회 헬퍼
 */
export declare function useSort<T>({ sortState, onSortChange, multiSort, shouldWarn, }: UseSortOptions<T>): {
    sortStateArray: SortState<T>[];
    handleSort: (column: keyof T) => void;
    getSortDirection: (column: keyof T) => SortDirection;
    getSortPriority: (column: keyof T) => number | undefined;
};
export {};
