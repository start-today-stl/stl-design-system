import { ChartLegendItem } from './chart-legend';
import * as React from "react";
export interface RadarChartSeries {
    /** data 객체의 키 (예: "sectorA") */
    key: string;
    /** 표시명 (범례 / 툴팁) */
    name: string;
    /** 색상 (지정 안 하면 기본 팔레트) */
    color?: string;
}
export interface RadarChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 차트 타이틀 (좌상단) */
    title?: React.ReactNode;
    /** 데이터 (각 항목이 하나의 축) */
    data: Array<{
        axis: string;
    } & Record<string, number>>;
    /** 시리즈 정의 (다중 시리즈 지원) */
    series: RadarChartSeries[];
    /** 값의 최댓값 (기본 100) */
    max?: number;
    /** 차트 크기 (정사각형, px) */
    size?: number;
    /** 그리드 표시 (기본 true) */
    showGrid?: boolean;
    /** 반지름 축(스케일 숫자) 표시 (기본 false — 일반적인 radar 패턴) */
    showRadiusAxis?: boolean;
    /** 축 라벨(텍스트) 표시 (기본 false — 피그마 매칭) */
    showAxisLabels?: boolean;
    /** 꼭짓점 점 표시 (기본 true) */
    showDots?: boolean;
    /** 그라데이션 채움 사용 (기본 true) */
    gradient?: boolean;
    /** 시리즈 면 색상 투명도 (gradient=false 일 때, 기본 0.3) */
    fillOpacity?: number;
    /** 범례 (생략 시 series 정보로 자동 생성, 단일 시리즈면 미표시) */
    legend?: ChartLegendItem[];
    /** 툴팁 라벨 */
    tooltipLabel?: React.ReactNode;
    /** 툴팁 값 포맷터 */
    tooltipFormatter?: (value: number, name: string) => React.ReactNode;
    /** enter 애니메이션 (기본 true) */
    animated?: boolean;
}
export declare function RadarChart({ title, data, series, max, size, showGrid, showRadiusAxis, showAxisLabels, showDots, gradient, fillOpacity, legend, tooltipLabel, tooltipFormatter, animated, className, ...props }: RadarChartProps): import("react/jsx-runtime").JSX.Element;
