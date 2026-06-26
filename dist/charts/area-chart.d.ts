import * as React from "react";
export interface AreaChartTooltipPayload {
    value: number;
    name?: string;
    payload: Record<string, unknown>;
}
export interface AreaChartProps<T extends Record<string, unknown>> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    /** 차트 타이틀 (좌상단) */
    title?: React.ReactNode;
    /** 차트 데이터 */
    data: T[];
    /** X 축 key (data 의 필드명) */
    xKey: keyof T & string;
    /** Y 축 key (data 의 필드명) */
    yKey: keyof T & string;
    /** 차트 높이 (px 또는 백분율 문자열, 예: "100%") */
    height?: number | `${number}%`;
    /** 툴팁 라벨 (선택) */
    tooltipLabel?: React.ReactNode;
    /** 툴팁 값 포맷터 */
    tooltipFormatter?: (value: number, payload: Record<string, unknown>) => React.ReactNode;
    /** X 축 표시 여부 */
    showXAxis?: boolean;
    /** Y 축 표시 여부 */
    showYAxis?: boolean;
    /** 가로 그리드 표시 여부 */
    showGrid?: boolean;
    /** 데이터 포인트 dot 표시 여부 */
    showDots?: boolean;
    /** 선 보간 방식 (기본 linear — 점과 점을 직선 연결) */
    curveType?: "linear" | "monotone" | "step" | "natural";
    /** 선 / 도트 / 영역 색상 (기본 var(--color-primary), 토큰 사용 권장) */
    color?: string;
}
export declare function AreaChart<T extends Record<string, unknown>>({ title, data, xKey, yKey, height, tooltipLabel, tooltipFormatter, showXAxis, showYAxis, showGrid, showDots, curveType, color, className, ...props }: AreaChartProps<T>): import("react/jsx-runtime").JSX.Element;
