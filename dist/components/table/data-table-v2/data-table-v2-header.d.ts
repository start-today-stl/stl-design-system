import { DataTableV2Column, HeaderGroup, SortDirection } from './types';
import * as React from "react";
/** 헤더 그룹 행의 셀 하나. group = 그룹 헤더, placeholder = 그룹 없는 컬럼 자리 */
export type HeaderGroupCell<T> = {
    kind: "group";
    key: string;
    /** 하위가 전부 고정폭일 때의 합. flex 컬럼이 섞이면 undefined */
    width: number | undefined;
    /** 하위 flex 컬럼 개수 = grow 지분 */
    flexGrow: number;
    /** 고정폭 합 + flex 컬럼들의 minWidth 합 */
    minWidth: number;
    group: HeaderGroup<T>;
} | {
    kind: "placeholder";
    key: string;
    col: DataTableV2Column<T>;
};
/** 컬럼 인덱스를 함께 들고 다니는 pinned 컬럼 (offset 조회에 원본 인덱스 필요) */
export interface PinnedColumnRef<T> {
    c: DataTableV2Column<T>;
    i: number;
}
export interface DataTableV2HeaderProps<T> {
    /** 리사이즈/재정렬이 반영된 최종 컬럼 배열 */
    columns: DataTableV2Column<T>[];
    hasFlexColumn: boolean;
    headerGroupCells: HeaderGroupCell<T>[] | null;
    hasGroups: boolean;
    headerRowCount: number;
    /** 첫 그룹 셀 앞에 컨트롤/좌측 pinned 셀이 있는지 (좌측 구분선 표시 여부) */
    hasPrecedingHeaderCells: boolean;
    leftPinnedCols: PinnedColumnRef<T>[];
    rightPinnedCols: PinnedColumnRef<T>[];
    lastLeftPinnedIdx: number;
    firstRightPinnedIdx: number;
    leftOffsets: number[];
    rightOffsets: number[];
    getSortInfo: (key: keyof T) => {
        direction: SortDirection | undefined;
        priority: number | undefined;
    };
    onSort: (key: keyof T) => void;
    /**
     * memo 무효화 전용. 아래 getColumnFilter / hasActiveFilter 는 ref 로 흡수된
     * stable 콜백이라 필터가 바뀌어도 함수 identity 가 그대로다.
     * 이 값을 prop 으로 받지 않으면 필터를 눌러도 헤더가 갱신되지 않는다.
     */
    filterState: Record<string, unknown>;
    getColumnFilter: (columnKey: string) => unknown;
    hasActiveFilter: (columnKey: string) => boolean;
    onColumnFilterChange: (columnKey: string, value: unknown) => void;
    resizable: boolean;
    resizingKey: keyof T | null;
    onResizeStart: (e: React.MouseEvent, column: unknown) => void;
    columnReorderable: boolean;
    reorderableIds: string[];
    rowReorderable: boolean;
    selectable: boolean;
    allSelected: boolean;
    someSelected: boolean;
    onToggleAll: () => void;
    hasExpandable: boolean;
    showExpandAll: boolean;
    allExpanded: boolean;
    onToggleExpandAll: () => void;
    showRowDelete: boolean;
    dragHandleColsWidth: number;
    rowActionsColLeftOffset: number;
    /** 헤더 컨테이너 배경 (sticky 시 바디가 비쳐 보이지 않도록) */
    headerBg: string;
}
type DataTableV2HeaderComponent = <T extends {
    id: string | number;
}>(props: DataTableV2HeaderProps<T>) => React.ReactElement | null;
/**
 * 헤더 행(그룹 행 + 컬럼 행)을 **독립 렌더 단위**로 분리한 컴포넌트.
 *
 * 가상화가 켜지면 스크롤할 때마다 DataTableV2 가 리렌더된다 (새 행을 그려야 하므로).
 * 헤더가 본체 안에 인라인 JSX 로 있으면 그때마다 헤더 전체가 다시 그려진다.
 * memo 로 감싸서 헤더가 실제로 의존하는 값이 바뀔 때만 다시 그리게 한다 (SDS-47).
 *
 * ⚠️ 헤더가 쓰는 값은 **반드시 prop 으로 받는다.** 클로저로 끌어다 쓰면
 * memo 가 변경을 감지하지 못해 "필터를 눌렀는데 헤더가 안 바뀌는" 식으로 조용히 틀어진다.
 * 특히 ref 로 흡수된 stable 콜백(getColumnFilter 등)은 값이 바뀌어도 identity 가
 * 그대로이므로, 대응하는 상태값(filterState)을 따로 prop 으로 받아야 한다.
 */
export declare const DataTableV2Header: DataTableV2HeaderComponent;
export {};
