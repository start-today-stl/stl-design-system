import { ChartLegendItem } from './chart-legend';
import * as React from "react";
export interface ScatterChartPoint {
    x: number;
    y: number;
    /** 이름 (툴팁 표시용, 선택) */
    name?: string;
}
export interface ScatterChartSeries {
    /** 표시명 (범례 / 툴팁) */
    name: string;
    /** 데이터 포인트 배열 */
    data: ScatterChartPoint[];
    /** 색상 (지정 안 하면 기본 팔레트) */
    color?: string;
}
export interface ScatterChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    /** 차트 타이틀 (좌상단) */
    title?: React.ReactNode;
    /** 시리즈 배열 (다중 시리즈 지원) */
    series: ScatterChartSeries[];
    /** 차트 높이 (px, 기본 280) */
    height?: number;
    /** 점 크기 (기본 8) */
    pointSize?: number;
    /** 호버 시 점 크기 (기본 16) */
    activePointSize?: number;
    /** 기본 점 색상 (지정 안 하면 회색 slate-400) — series.color 는 활성/범례에 사용 */
    pointColor?: string;
    /** X축 도메인 (생략 시 자동) */
    xDomain?: [number | "auto", number | "auto"];
    /** Y축 도메인 (생략 시 자동) */
    yDomain?: [number | "auto", number | "auto"];
    /** X축 라벨 포맷터 */
    xTickFormatter?: (value: number) => string;
    /** Y축 라벨 포맷터 */
    yTickFormatter?: (value: number) => string;
    /** X축 표시 (기본 true) */
    showXAxis?: boolean;
    /** Y축 표시 (기본 true) */
    showYAxis?: boolean;
    /** 그리드 표시 (기본 true) */
    showGrid?: boolean;
    /** 추세선 표시 (기본 true) — y = x 대각선 참조선 */
    trendLine?: boolean;
    /** 추세선 시작점 (기본 [xDomain.min, yDomain.min]) */
    trendLineFrom?: {
        x: number;
        y: number;
    };
    /** 추세선 끝점 (기본 [xDomain.max, yDomain.max]) */
    trendLineTo?: {
        x: number;
        y: number;
    };
    /** 범례 (생략 시 series 정보로 자동 생성, 단일 시리즈면 미표시) */
    legend?: ChartLegendItem[];
    /** 툴팁 라벨 (포맷터 우선) */
    tooltipLabel?: React.ReactNode;
    /** 툴팁 포맷터 — point 와 series name 받아서 ReactNode 반환 */
    tooltipFormatter?: (point: ScatterChartPoint, seriesName: string) => React.ReactNode;
}
export declare function ScatterChart({ title, series, height, pointSize, activePointSize, pointColor, xDomain, yDomain, xTickFormatter, yTickFormatter, showXAxis, showYAxis, showGrid, trendLine, trendLineFrom, trendLineTo, legend, tooltipLabel, tooltipFormatter, className, ...props }: ScatterChartProps): import("react/jsx-runtime").JSX.Element;
