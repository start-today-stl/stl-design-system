import * as React from "react";
export interface HeatmapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    /** 차트 타이틀 (좌상단) */
    title?: React.ReactNode;
    /** 2D 데이터 행렬 — data[row][col] (row = Y, col = X) */
    data: number[][];
    /** X축 라벨 (data[0].length 와 같은 길이) */
    xLabels: Array<string | number>;
    /** Y축 라벨 (data.length 와 같은 길이) */
    yLabels: Array<string | number>;
    /** 셀 색상 (기본 var(--color-primary) = blue-500) */
    color?: string;
    /** 셀 크기 px (기본 15) */
    cellSize?: number;
    /** 셀 간격 px (기본 0 — 셀이 서로 붙어있음, 피그마 매칭) */
    cellGap?: number;
    /** 값의 최댓값 (생략 시 데이터 max 자동) */
    max?: number;
    /** 값의 최솟값 (기본 0) */
    min?: number;
    /** 최저 강도 opacity (기본 0.05 — 피그마 매칭) */
    minOpacity?: number;
    /** 최고 강도 opacity (기본 1) */
    maxOpacity?: number;
    /** 우측 범례 표시 (기본 true) */
    showLegend?: boolean;
    /** 범례 단계 수 (기본 6 — 피그마 매칭) */
    legendSteps?: number;
    /** 범례 항목 라벨 함수 (기본 "Sort Deep Blue") */
    legendLabel?: (stepIndex: number) => React.ReactNode;
    /** X 축 라벨 표시 (기본 true) */
    showXAxis?: boolean;
    /** Y 축 라벨 표시 (기본 true) */
    showYAxis?: boolean;
    /** 툴팁 포맷터 */
    tooltipFormatter?: (value: number, xLabel: string | number, yLabel: string | number) => React.ReactNode;
}
export declare function Heatmap({ title, data, xLabels, yLabels, color, cellSize, cellGap, max, min, minOpacity, maxOpacity, showLegend, legendSteps, legendLabel, showXAxis, showYAxis, tooltipFormatter, className, ...props }: HeatmapProps): import("react/jsx-runtime").JSX.Element;
