import { SortDirection } from './table';
import * as React from "react";
/** 편집 컴포넌트 Props */
export interface EditComponentProps<T, K extends keyof T = keyof T> {
    /** 현재 값 */
    value: T[K];
    /** 값 변경 핸들러 */
    onChange: (value: T[K]) => void;
    /** 편집 완료 핸들러 (Enter 시 호출 - 검증 후 저장) */
    onComplete: () => void;
    /** 편집 취소 핸들러 (Escape 또는 blur 시 호출 - 원래 값으로 복원) */
    onCancel: () => void;
    /** 해당 행 데이터 */
    row: T;
    /** 검증 에러 메시지 */
    error?: string;
}
/** 검증 결과 타입 */
export type ValidationResult = true | string;
/** 컬럼 정의 */
export interface DataTableColumn<T> {
    /** 데이터 접근 키 */
    accessorKey: keyof T;
    /** 헤더 텍스트 */
    header: React.ReactNode;
    /** 정렬 가능 여부 */
    sortable?: boolean;
    /** 컬럼 고정 너비 (sticky 컬럼에 권장) */
    width?: string | number;
    /** 컬럼 최소 너비 (width 미설정 시 남은 공간을 채움) */
    minWidth?: string | number;
    /** 셀 정렬 */
    align?: "left" | "center" | "right";
    /** 커스텀 셀 렌더러 */
    cell?: (value: T[keyof T], row: T) => React.ReactNode;
    /** 편집 가능 여부 */
    editable?: boolean;
    /** 커스텀 편집 컴포넌트 (기본: Input) */
    editComponent?: (props: EditComponentProps<T>) => React.ReactNode;
    /** 값 검증 함수 (true: 통과, string: 에러 메시지) */
    validate?: (value: T[keyof T], row: T) => ValidationResult;
    /** 고정 컬럼 (left: 왼쪽 고정, right: 오른쪽 고정) */
    sticky?: "left" | "right";
}
/** 정렬 상태 */
export interface SortState<T> {
    column: keyof T | null;
    direction: SortDirection;
}
/** 확장 가능 행 설정 */
export interface ExpandableConfig<T> {
    /** 확장 영역 렌더링 함수 */
    expandedRowRender: (row: T) => React.ReactNode;
    /** 행이 확장 가능한지 여부를 결정하는 함수 (기본: 모든 행 확장 가능) */
    rowExpandable?: (row: T) => boolean;
    /** 기본 확장된 행 ID 배열 */
    defaultExpandedRowIds?: (string | number)[];
    /** 확장된 행 ID 배열 (제어 컴포넌트) */
    expandedRowIds?: (string | number)[];
    /** 확장 상태 변경 핸들러 */
    onExpandedChange?: (expandedRowIds: (string | number)[]) => void;
}
export interface DataTableProps<T extends {
    id: string | number;
}> {
    /** 컬럼 정의 */
    columns: DataTableColumn<T>[];
    /** 데이터 배열 */
    data: T[];
    /** 선택 기능 활성화 */
    selectable?: boolean;
    /** 선택된 행 ID 배열 */
    selectedIds?: (string | number)[];
    /** 선택 변경 핸들러 */
    onSelectionChange?: (selectedIds: (string | number)[]) => void;
    /** 정렬 상태 */
    sortState?: SortState<T>;
    /** 정렬 변경 핸들러 */
    onSortChange?: (sortState: SortState<T>) => void;
    /** 행 클릭 핸들러 */
    onRowClick?: (row: T) => void;
    /** 셀 값 변경 핸들러 */
    onCellChange?: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void;
    /** 확장 가능 행 설정 */
    expandable?: ExpandableConfig<T>;
    /** 빈 데이터 메시지 */
    emptyMessage?: React.ReactNode;
    /** 추가 className */
    className?: string;
    /** 행 className 커스터마이즈 */
    rowClassName?: (row: T) => string;
    /** 테이블 본문 최대 높이 (초과 시 내부 스크롤) */
    maxHeight?: number | string;
    /** 컬럼 리사이징 활성화 */
    resizable?: boolean;
    /** 컬럼 너비 상태 (제어 컴포넌트) */
    columnWidths?: Record<string, number>;
    /** 컬럼 너비 변경 핸들러 */
    onColumnResize?: (columnKey: keyof T, width: number) => void;
    /** 컬럼 순서 변경 활성화 */
    columnReorderable?: boolean;
    /** 컬럼 순서 (accessorKey 배열) */
    columnOrder?: (keyof T)[];
    /** 컬럼 순서 변경 핸들러 */
    onColumnReorder?: (newOrder: (keyof T)[]) => void;
    /** 로우 순서 변경 활성화 */
    rowReorderable?: boolean;
    /** 로우 순서 변경 핸들러 */
    onRowReorder?: (newData: T[]) => void;
    /** 로딩 상태 */
    loading?: boolean;
    /** 커스텀 로딩 콘텐츠 (미설정 시 STL 화살표 로고 표시) */
    loadingContent?: React.ReactNode;
}
declare function DataTable<T extends {
    id: string | number;
}>({ columns, data, selectable, selectedIds, onSelectionChange, sortState, onSortChange, onRowClick, onCellChange, expandable, emptyMessage, className, rowClassName, maxHeight, resizable, columnWidths, onColumnResize, columnReorderable, columnOrder, onColumnReorder, rowReorderable, onRowReorder, loading, loadingContent, }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
export { DataTable };
