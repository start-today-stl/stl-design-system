import * as React from "react";
export interface DataTableExpandedRowProps<T extends {
    id: string | number;
}> {
    /** 펼친 대상 행 */
    row: T;
    /** 사용자 정의 펼침 영역 렌더러 (parent 에서 useStableCallback 으로 흡수된 stable ref) */
    expandedRowRender: (row: T) => React.ReactNode;
    /** colSpan (전체 컬럼 수) */
    totalColumns: number;
    /** 가로 스크롤 시 sticky 영역 너비 */
    visibleWidth: number;
}
/**
 * 펼침 영역 행 컴포넌트 (React.memo + custom equality)
 *
 * 다음 조건에서 re-render 스킵:
 * - row reference 동일 (불변 업데이트 시 변경 없는 행)
 * - totalColumns / visibleWidth 동일
 * - expandedRowRender reference 동일
 *
 * → 펼침 토글 시 토글된 행의 펼침 영역만 mount/unmount,
 *   다른 펼친 행들의 영역은 prop 동일하므로 React.memo skip.
 */
export declare const DataTableExpandedRow: <T extends {
    id: string | number;
}>(props: DataTableExpandedRowProps<T>) => React.ReactElement;
