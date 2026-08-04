import * as React from "react";
interface DataTableV2ColumnSeparatorProps {
    /** 리사이즈 가능 여부 (true 면 호버 시 파란 인디케이터 + col-resize 커서) */
    resizable?: boolean;
    /** 리사이즈 진행 중 여부 (인디케이터를 활성 상태로 유지) */
    isResizing?: boolean;
    /**
     * 리사이즈 시작 핸들러 — parent 의 stable useCallback ref 로 받음.
     * (인라인 arrow 로 넘기면 매 렌더마다 새 ref → React.memo 실패 → 리렌더)
     */
    onResizeStart?: (e: React.MouseEvent, column: unknown) => void;
    /** 이 separator 가 속한 컬럼 (stable ref 기대) — 리사이즈 시 onResizeStart 에 전달 */
    column?: unknown;
}
/**
 * 컬럼 헤더 우측에 절대 배치되는 세로 구분선 겸 리사이즈 핸들.
 *
 * - 기본 상태: 짧은 세로 구분선 (h-4, w-px, slate-300)
 * - resizable + 호버: blue-500 + w-[2px] (리사이즈 가능 인디케이터)
 * - 진행 중: 호버 여부와 무관하게 활성 색상 유지
 *
 * 절대 배치를 쓰는 이유: 셀 폭에서 separator 폭이 차감되지 않도록 하기 위함.
 * 셀의 우측 padding 영역에 겹쳐 렌더된다 (레이아웃 폭에 영향 없음).
 */
declare function DataTableV2ColumnSeparatorInner({ resizable, isResizing, onResizeStart, column, }: DataTableV2ColumnSeparatorProps): import("react/jsx-runtime").JSX.Element;
export declare const DataTableV2ColumnSeparator: React.MemoExoticComponent<typeof DataTableV2ColumnSeparatorInner>;
export {};
