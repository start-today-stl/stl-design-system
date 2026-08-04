import * as React from "react";
interface SortableHeaderCellProps {
    id: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    dataColumnKey?: string;
}
/**
 * 드래그 가능한 헤더 셀 wrapper.
 * - 좌측에 drag handle 아이콘 (항상 30% opacity, hover 시 70%)
 * - 드래그 중에는 opacity 하락 + transform 이동 피드백
 */
export declare function DataTableV2SortableHeaderCell({ id, disabled, className, style, children, dataColumnKey, }: SortableHeaderCellProps): import("react/jsx-runtime").JSX.Element;
export {};
