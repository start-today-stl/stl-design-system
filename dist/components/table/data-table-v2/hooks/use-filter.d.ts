interface UseFilterOptions {
    /** controlled filter state */
    filterState?: Record<string, unknown>;
    /** uncontrolled 초기 필터 상태 */
    defaultFilterState?: Record<string, unknown>;
    /** 필터 변경 콜백 */
    onFilterChange?: (filterState: Record<string, unknown>) => void;
}
/**
 * 컬럼 필터 상태 관리 hook.
 * - controlled: filterState 가 있으면 그 값을 그대로 사용. 변경 시 onFilterChange 만 호출
 * - uncontrolled: filterState 없으면 내부 상태로 관리. onFilterChange 는 있으면 함께 호출
 * - value 를 undefined 로 넘기면 해당 컬럼 필터 제거 (활성 필터 판정에서 제외)
 */
export declare function useFilter({ filterState, defaultFilterState, onFilterChange, }: UseFilterOptions): {
    filterState: Record<string, unknown>;
    setColumnFilter: (columnKey: string, value: unknown) => void;
    getColumnFilter: (columnKey: string) => unknown;
    hasActiveFilter: (columnKey: string) => boolean;
};
export {};
