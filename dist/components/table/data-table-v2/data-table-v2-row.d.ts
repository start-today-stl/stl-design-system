import { DataTableV2Column } from './types';
import * as React from "react";
interface DataTableV2RowProps<T extends {
    id: string | number;
}> {
    row: T;
    rowIndex: number;
    columns: DataTableV2Column<T>[];
    leftOffsets: number[];
    rightOffsets: number[];
    lastLeftPinnedIdx: number;
    firstRightPinnedIdx: number;
    totalWidth: number;
    /**
     * 행 엘리먼트 등록 콜백 (SDS-49).
     * 세로 위치(top)는 prop 으로 받지 않고 부모가 layout effect 에서 DOM 에 직접 쓴다.
     * 위치를 prop 으로 받으면 위쪽 행의 높이가 바뀔 때마다 이 행이 리렌더된다.
     */
    registerEl: (id: T["id"], el: HTMLElement | null) => void;
    onHover?: (id: T["id"] | null) => void;
    onHeightChange: (id: T["id"], height: number) => void;
    selectable: boolean;
    isSelected: boolean;
    onToggleSelect: (id: T["id"], rowIndex: number, shiftKey: boolean) => void;
    checkboxColWidth: number;
    expandable: boolean;
    isExpanded: boolean;
    canExpand: boolean;
    onToggleExpand: (id: T["id"]) => void;
    /**
     * 확장 컨텐츠를 **element 가 아니라 함수로** 받는다.
     *
     * 부모가 렌더 중에 `render(row)` 를 호출해서 element 로 넘기면, 테이블이 리렌더될
     * 때마다 새 element 가 만들어져서 (1) 이 행의 React.memo 가 깨지고 (2) element
     * 참조가 바뀌니 React 가 확장 영역 subtree 를 통째로 재조정한다. 그래서 다른 행
     * 체크박스만 눌러도 펼쳐둔 확장 테이블이 다시 그려진다.
     *
     * 함수로 받아서 아래 useMemo 로 element 를 고정하면, 이 행이 리렌더돼도
     * (선택/호버 등) 확장 영역은 그대로 유지된다.
     */
    expandedRowRender: ((row: T) => React.ReactNode) | undefined;
    expandColWidth: number;
    /**
     * 스크롤 컨테이너의 가시 영역 너비.
     * 확장 영역을 이 폭으로 sticky 고정해서, 가로 스크롤을 해도 펼친 내용이
     * 항상 화면 안에 보이게 한다 (v1 과 동일한 동작).
     * 0 이면 미측정 상태 → 폭 지정 없이 렌더.
     */
    visibleWidth: number;
    onRowClick?: (row: T) => void;
    extraClassName?: string;
    isLast: boolean;
    editingColumnKey: keyof T | null;
    editingError?: string;
    onStartEdit: (row: T, col: DataTableV2Column<T>) => void;
    onCompleteEdit: (col: DataTableV2Column<T>, row: T, value: T[keyof T]) => void;
    onCancelEdit: () => void;
    onClearEditError: () => void;
    showRowDelete: boolean;
    onRowDelete?: (row: T) => void;
    rowActionsColWidth: number;
    rowActionsColLeftOffset: number;
    rowReorderable: boolean;
    dragHandleColWidth: number;
    getRowSpan: (rowIndex: number, columnKey: keyof T) => number | undefined;
    getRowSpanHeight: (rowIndex: number, columnKey: keyof T) => number | undefined;
    getGroupHovered: (rowIndex: number, columnKey: keyof T) => boolean;
    /** 병합 셀의 선택 표시 — 그룹 안 아무 행이나 선택돼 있으면 true (hover 와 동일한 그룹 단위 판단) */
    getGroupSelected: (rowIndex: number, columnKey: keyof T) => boolean;
    measureRef?: (el: HTMLElement | null) => void;
    dataIndex?: number;
    ariaRowIndex: number;
}
type DataTableV2RowComponent = <T extends {
    id: string | number;
}>(props: DataTableV2RowProps<T>) => React.ReactElement | null;
export declare const DataTableV2Row: DataTableV2RowComponent;
export {};
