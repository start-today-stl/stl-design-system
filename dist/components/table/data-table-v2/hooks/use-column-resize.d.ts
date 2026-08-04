import { DataTableV2Column } from '../types';
import * as React from "react";
interface UseColumnResizeOptions<T> {
    resizable: boolean;
    columnWidths?: Record<string, number>;
    onColumnResize?: (columnKey: keyof T, width: number) => void;
}
/**
 * 컬럼 리사이즈 hook — **독립 리사이즈 방식** (AG Grid 기본 모드 동일).
 *
 * 동작:
 * - 헤더 우측 handle 을 드래그해 폭 조절
 * - 리사이즈된 컬럼 **자기 자신만** 폭 변경. 다른 컬럼은 현재 폭 유지.
 * - 결과:
 *   - shrink → 총폭 감소 → 우측 여백 확장 (또는 스크롤 축소)
 *   - grow → 총폭 증가 → 가로 스크롤 확장 (또는 여백 축소)
 * - flex 컬럼(fixed width 없음)이 최초 리사이즈 순간 현재 offsetWidth 로 스냅샷되어 fixed 전환됨.
 *   → 다른 flex 컬럼의 자동 재분배 (grow/shrink) 방지.
 *
 * MIN_WIDTH:
 * - 각 컬럼의 `col.minWidth` 를 존중. 없으면 하드코딩 50px fallback.
 *
 * 스냅샷:
 * - 최초 리사이즈 시 헤더 행에서 `[data-column-key]` 셀들의 offsetWidth 를 읽어
 *   internalWidths 에 저장. 이미 저장된 값은 덮어쓰지 않음.
 * - controlled 모드 (`columnWidths` + `onColumnResize`) 는 부모가 관리하므로 스냅샷 생략.
 */
export declare function useColumnResize<T>({ resizable, columnWidths, onColumnResize, }: UseColumnResizeOptions<T>): {
    resizingKey: keyof T | null;
    getColumnWidth: (column: DataTableV2Column<T>) => number | undefined;
    handleResizeStart: (e: React.MouseEvent, column: DataTableV2Column<T>) => void;
};
export {};
