import { DataTableColumn, StickyStyleResult } from '../types';
interface UseStickyStylesOptions<T> {
    columns: DataTableColumn<T>[];
    selectable: boolean;
    expandable: unknown;
    rowReorderable: boolean;
}
/**
 * sticky 컬럼 스타일 계산 hook
 * - 왼쪽/오른쪽 고정 컬럼의 left/right 위치 계산
 * - 헤더/바디 셀 모두에 동일한 스타일 함수 제공
 */
export declare function useStickyStyles<T>({ columns, selectable, expandable, rowReorderable, }: UseStickyStylesOptions<T>): {
    getStickyStyles: (column: DataTableColumn<T>, isHeader: boolean, isSelected?: boolean, groupCellSelected?: boolean) => StickyStyleResult;
    hasLeftStickyColumns: boolean;
};
export {};
