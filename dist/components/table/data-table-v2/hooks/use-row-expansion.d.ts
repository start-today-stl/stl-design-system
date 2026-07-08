import { ExpandableConfig } from '../types';
interface UseRowExpansionOptions<T extends {
    id: string | number;
}> {
    data: T[];
    expandable?: ExpandableConfig<T>;
}
/**
 * 행 확장 hook.
 * - controlled (expandedRowIds) 또는 uncontrolled (defaultExpandedRowIds) 지원
 * - "전체 펼치기/접기" 헤더 버튼 지원
 * - rowExpandable 함수로 행별 확장 가능 여부 제어
 */
export declare function useRowExpansion<T extends {
    id: string | number;
}>({ data, expandable, }: UseRowExpansionOptions<T>): {
    expandedSet: Set<T["id"]>;
    isExpanded: (id: T["id"]) => boolean;
    canExpand: (row: T) => boolean;
    allExpanded: boolean;
    toggleRow: (id: T["id"]) => void;
    toggleAll: () => void;
};
export {};
