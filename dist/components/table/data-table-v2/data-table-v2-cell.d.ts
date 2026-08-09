import { DataTableV2Column } from './types';
import * as React from "react";
export interface DataTableV2CellProps<T extends {
    id: string | number;
}> {
    row: T;
    column: DataTableV2Column<T>;
    /** 셀 폭. undefined 면 flex 로 남은 공간 분배 */
    width: number | undefined;
    minWidth: number | undefined;
    /** pinned 좌/우 offset. 해당 방향이 아니면 undefined */
    leftOffset: number | undefined;
    rightOffset: number | undefined;
    isLeftPinned: boolean;
    isRightPinned: boolean;
    isLeftBoundary: boolean;
    isRightBoundary: boolean;
    isFirstRightPinned: boolean;
    /**
     * rowGrouping 병합 셀(span > 1)의 세로 확장 높이. head 셀이 아니면 undefined.
     * 지정되면 컨텐츠를 absolute 로 이 높이만큼 늘려 아래 middle row 들을 덮는다.
     */
    spanHeight?: number;
    /** head 셀 배경 (그룹 hover / 선택 반영). head 셀일 때만 넘긴다. */
    headBgClass?: string;
    /** 이 셀이 편집 중인지 */
    isEditing: boolean;
    /** 검증 에러 — 편집 중인 셀에만 넘긴다 */
    editingError?: string;
    onStartEdit: (row: T, col: DataTableV2Column<T>) => void;
    onCompleteEdit: (col: DataTableV2Column<T>, row: T, value: T[keyof T]) => void;
    onCancelEdit: () => void;
    onClearEditError: () => void;
}
type DataTableV2CellComponent = <T extends {
    id: string | number;
}>(props: DataTableV2CellProps<T>) => React.ReactElement | null;
/**
 * 데이터 셀 — **행과 별개의 memo 단위**.
 *
 * 행이 memo 최소 단위이면 체크박스 하나만 눌러도 그 행의 셀이 전부 다시 그려진다.
 * 컬럼이 많은 테이블에서 전체 선택 같은 조작은 비용이 급격히 커진다
 * (29컬럼 × 500행 = 14,500 재조정). 셀을 분리하면 실제로 바뀐 셀만 다시 그린다.
 *
 * ⚠️ prop 하나라도 매 렌더 새 값이면 memo 가 통째로 무효가 된다.
 * 행 선택/hover 에 따라 바뀌는 값은 되도록 prop 으로 넘기지 않는다.
 * - pinned 셀 배경: `bg-inherit` 로 행 배경을 CSS 상속 (prop 불필요)
 * - `headBgClass`: rowGrouping head 셀만. 그룹 hover 는 행 단위가 아니라
 *   그룹 단위라 CSS 상속으로 표현할 수 없어 어쩔 수 없이 prop 으로 받는다
 * - `editingError`: 편집 중인 셀에만
 */
export declare const DataTableV2Cell: DataTableV2CellComponent;
export {};
