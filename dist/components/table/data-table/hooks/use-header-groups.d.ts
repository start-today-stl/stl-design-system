import { DataTableColumn, HeaderGroup, StickyStyleResult } from '../types';
interface UseHeaderGroupsOptions<T> {
    columns: DataTableColumn<T>[];
    columnsToRender: DataTableColumn<T>[];
    headerGroups: HeaderGroup<T>[] | undefined;
    getStickyStyles: (column: DataTableColumn<T>, isHeader: boolean, isSelected?: boolean, groupCellSelected?: boolean) => StickyStyleResult;
    getColumnWidth: (column: DataTableColumn<T>) => number | undefined;
    resizable: boolean;
    shouldWarn: boolean;
}
export type HeaderItem<T> = {
    type: "standalone";
    col: DataTableColumn<T>;
} | {
    type: "group";
    group: HeaderGroup<T>;
};
/**
 * 다중 레벨 헤더 + 헤더 그룹 관련 hook
 * - sticky/non-sticky 혼합 그룹 검증 + 경고
 * - colSpan 계산
 * - 그룹 헤더의 sticky 스타일 계산
 * - 렌더링 순서 아이템 배열
 * - 그룹 경계 컬럼 (구분선 표시) 식별
 */
export declare function useHeaderGroups<T>({ columns, columnsToRender, headerGroups, getStickyStyles, getColumnWidth, resizable, shouldWarn, }: UseHeaderGroupsOptions<T>): {
    groupedColumnsSet: Set<keyof T>;
    columnsWithRightBorder: Set<keyof T>;
    getHeaderGroupColSpan: (group: HeaderGroup<T>) => number;
    getHeaderGroupStickyData: (group: HeaderGroup<T>) => StickyStyleResult;
    headerGroupItems: HeaderItem<T>[];
};
export {};
