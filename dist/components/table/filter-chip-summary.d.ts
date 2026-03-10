import * as React from "react";
export interface FilterItem {
    /** 필터 고유 ID */
    id: string;
    /** 필터 라벨 (예: "카테고리") */
    label: string;
    /** 필터 값 (예: "전자제품") */
    value: string;
}
export interface FilterChipSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 필터 목록 */
    filters: FilterItem[];
    /** 최대 표시 개수 (기본: 3) */
    maxVisible?: number;
    /** 필터 삭제 콜백 */
    onRemove?: (id: string) => void;
    /** 전체 초기화 콜백 */
    onClearAll?: () => void;
    /** 더보기 클릭 콜백 ("+N개" 클릭 시) */
    onExpand?: () => void;
    /** 필터 없을 때 텍스트 */
    emptyText?: string;
    /** 전체 초기화 버튼 텍스트 */
    clearAllText?: string;
    /** 칩 사이즈 */
    chipSize?: "sm" | "md" | "lg";
}
declare const FilterChipSummary: React.ForwardRefExoticComponent<FilterChipSummaryProps & React.RefAttributes<HTMLDivElement>>;
export { FilterChipSummary };
