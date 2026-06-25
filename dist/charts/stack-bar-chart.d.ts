import { ChartLegendItem } from './chart-legend';
import * as React from "react";
export interface StackBarSeries {
    /** 시리즈 data 필드 key */
    dataKey: string;
    /** 색상 (지정 안 하면 기본 팔레트 사용) */
    color?: string;
    /** 툴팁 / 범례에 표시할 이름 (지정 안 하면 dataKey 사용) */
    name?: string;
}
export interface StackBarChartProps<T extends Record<string, unknown>> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    /** 차트 타이틀 (좌상단) */
    title?: React.ReactNode;
    /** 차트 데이터 */
    data: T[];
    /** 카테고리 축 key (세로: X, 가로: Y) */
    xKey: keyof T & string;
    /** 시리즈 정의 (누적할 segment 들) */
    bars: StackBarSeries[];
    /** 바 방향. vertical = 세로 (기본), horizontal = 가로 */
    orientation?: "vertical" | "horizontal";
    /** 차트 높이 */
    height?: number | `${number}%`;
    /** 그라디언트 채움 (기본 ON) */
    gradient?: boolean;
    /** 바 코너 라운드 px (보이는 segment 의 첫/마지막에만 적용, 기본 0) */
    barRadius?: number;
    /** 툴팁 라벨 */
    tooltipLabel?: React.ReactNode;
    /** 툴팁 값 포맷터 (시리즈별) */
    tooltipFormatter?: (value: number, series: StackBarSeries, payload: Record<string, unknown>) => React.ReactNode;
    /** 카테고리 축 표시 */
    showXAxis?: boolean;
    /** 값 축 표시 */
    showYAxis?: boolean;
    /** 그리드 표시 */
    showGrid?: boolean;
    /** 범례 (entry 배열, color 생략 시 시리즈 색 자동 매칭) */
    legend?: ChartLegendItem[];
}
export declare function StackBarChart<T extends Record<string, unknown>>({ title, data, xKey, bars, orientation, height, gradient, barRadius, tooltipLabel, tooltipFormatter, showXAxis, showYAxis, showGrid, legend, className, ...props }: StackBarChartProps<T>): import("react/jsx-runtime").JSX.Element;
