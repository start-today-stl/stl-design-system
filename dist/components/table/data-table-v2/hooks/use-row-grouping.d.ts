import { RowGroupConfig } from '../types';
interface UseRowGroupingOptions<T> {
    data: T[];
    rowGrouping: RowGroupConfig<T> | undefined;
}
interface RowGroupingResult<T> {
    /** rowIndex → (columnKey → span). span=0 (middle), span=1 (single), span>1 (head) */
    rowSpanMap: Map<number, Map<keyof T, number>> | null;
    /** 그룹 middle row 인덱스 집합. border-b 스킵 대상 */
    middleRowSet: Set<number> | null;
    /** rowIndex + columnKey → span 조회. rowGrouping 미활성 시 undefined */
    getRowSpan: (rowIndex: number, columnKey: keyof T) => number | undefined;
}
/**
 * 로우 그룹핑 (셀 병합) hook — v1 시맨틱 이식.
 *
 * - `groupBy` 컬럼 값이 연속으로 같은 행들을 rowSpan 으로 병합
 * - 그룹 중간 (border-b 제거 대상) row 인덱스 계산
 * - 렌더 로직 무관 (순수 데이터 기반) → 가상화와 결합 시 middle row 렌더 여부와 독립
 */
export declare function useRowGrouping<T extends {
    id: string | number;
}>({ data, rowGrouping, }: UseRowGroupingOptions<T>): RowGroupingResult<T>;
export {};
