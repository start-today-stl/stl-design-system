import { RowGroupConfig } from '../types';
interface UseRowGroupingOptions<T> {
    data: T[];
    rowGrouping: RowGroupConfig<T> | undefined;
    hoveredRowIndex: number | null;
    selectedIds: (string | number)[];
}
interface RowGroupingResult<T> {
    rowSpanMap: Map<number, Map<keyof T, number>> | null;
    middleRowSet: Set<number> | null;
    getRowSpan: (rowIndex: number, columnKey: keyof T) => number | undefined;
    isGroupCellHovered: (rowIndex: number, rowSpan: number) => boolean;
    isGroupCellSelected: (rowIndex: number, rowSpan: number) => boolean;
}
/**
 * 로우 그룹핑(셀 병합) hook
 * - groupBy 컬럼 기준으로 연속된 같은 값의 행들을 rowSpan으로 병합
 * - 그룹 중간 행(border-b 제거 대상) Set 계산
 */
export declare function useRowGrouping<T extends {
    id: string | number;
}>({ data, rowGrouping, hoveredRowIndex, selectedIds, }: UseRowGroupingOptions<T>): RowGroupingResult<T>;
export {};
