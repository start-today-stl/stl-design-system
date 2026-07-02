import type * as React from "react";
/** DataTable v2 컬럼 정의 */
export interface DataTableV2Column<T> {
    /** 데이터 접근 키 */
    accessorKey: keyof T;
    /**
     * 컬럼 식별 key. 같은 accessorKey 가 둘 이상일 때 지정.
     * 미지정 시 String(accessorKey) 사용.
     */
    id?: string;
    /** 헤더 텍스트/노드 */
    header: React.ReactNode;
    /** 고정 너비. px 숫자 또는 CSS 문자열 */
    width?: string | number;
    /** 최소 너비. 지정 시 minmax(minWidth, 1fr) 로 처리 */
    minWidth?: string | number;
    /** 셀/헤더 정렬 */
    align?: "left" | "center" | "right";
    /** 커스텀 셀 렌더러 */
    cell?: (value: T[keyof T], row: T) => React.ReactNode;
}
/** DataTable v2 Props */
export interface DataTableV2Props<T extends {
    id: string | number;
}> {
    /** 행 데이터 */
    data: T[];
    /** 컬럼 정의 */
    columns: DataTableV2Column<T>[];
    /** 스크롤 컨테이너 최대 높이 */
    maxHeight?: number | string;
    /**
     * 행 예상 높이 (px). ResizeObserver 로 실제 높이가 측정되기 전 초기 배치에 사용.
     * 기본 40
     */
    estimateRowHeight?: number;
    /** 추가 className (Outer wrapper 에 적용) */
    className?: string;
}
