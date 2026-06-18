import { ChartLegendItem } from './chart-legend';
import * as React from "react";
export interface BarChartProps<T extends Record<string, unknown>> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** 차트 데이터 */
    data: T[];
    /** 카테고리 축 key (세로 바: X, 가로 바: Y) */
    xKey: keyof T & string;
    /** 값 축 key (세로 바: Y, 가로 바: X) */
    yKey: keyof T & string;
    /** 바 방향. vertical = 세로 (기본), horizontal = 가로 */
    orientation?: "vertical" | "horizontal";
    /** 차트 높이 */
    height?: number | `${number}%`;
    /** 단일 색상 (colorBy 없을 때) */
    color?: string;
    /** 데이터 row 마다 색 지정 (예: 연도별 다른 색) */
    colorBy?: (row: T, index: number) => string;
    /** 그라디언트 채움 (기본 ON) */
    gradient?: boolean;
    /** 가장 큰 값 강조 (살짝 진한 색) */
    highlightMax?: boolean;
    /** 툴팁 라벨 */
    tooltipLabel?: React.ReactNode;
    /** 툴팁 값 포맷터 */
    tooltipFormatter?: (value: number, payload: Record<string, unknown>) => React.ReactNode;
    /** 카테고리 축 표시 */
    showXAxis?: boolean;
    /** 값 축 표시 */
    showYAxis?: boolean;
    /** 그리드 표시 */
    showGrid?: boolean;
    /** 바 코너 라운드 px (기본 0 — 직각) */
    barRadius?: number;
    /** 차트 우측 상단 범례 (entry 배열) */
    legend?: ChartLegendItem[];
}
export declare function BarChart<T extends Record<string, unknown>>({ data, xKey, yKey, orientation, height, color, colorBy, gradient, highlightMax, tooltipLabel, tooltipFormatter, showXAxis, showYAxis, showGrid, barRadius, legend, className, ...props }: BarChartProps<T>): import("react/jsx-runtime").JSX.Element;
