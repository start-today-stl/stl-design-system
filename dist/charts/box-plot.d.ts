import * as React from "react";
export interface BoxPlotItem {
    /** 카테고리 이름 (툴팁/X축) */
    name: string;
    /** Q1 (박스 하단) */
    q1: number;
    /** 중앙값 (median, 박스 분할선) */
    median: number;
    /** Q3 (박스 상단) */
    q3: number;
    /** 최솟값 (선택, 툴팁 표시용) */
    min?: number;
    /** 최댓값 (선택, 툴팁 표시용) */
    max?: number;
}
export interface BoxPlotProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    /** 차트 타이틀 (좌상단) */
    title?: React.ReactNode;
    /** 데이터 (각 항목 = 하나의 box) */
    data: BoxPlotItem[];
    /** 차트 높이 (px, 기본 200) */
    height?: number;
    /** 박스 너비 px (생략 시 그리드 간격의 50% — 피그마 매칭) */
    boxWidth?: number;
    /** Y 도메인 (생략 시 자동) */
    yDomain?: [number, number];
    /** Y 라벨 포맷터 */
    yTickFormatter?: (value: number) => string;
    /** 박스 상반부 색상 (median~Q3, 기본 blue-200) */
    upperColor?: string;
    /** 박스 하반부 색상 (Q1~median, 기본 slate-300) */
    lowerColor?: string;
    /** 활성 박스 상반부 색상 (기본 blue-500) — 피그마: 호버 시 상반부만 강조 */
    activeUpperColor?: string;
    /** 그리드 라인 표시 (기본 true) */
    showGrid?: boolean;
    /** Y 축 표시 (기본 false — 피그마 매칭) */
    showYAxis?: boolean;
    /** X 축 라벨 표시 (기본 false — 피그마 매칭) */
    showXAxis?: boolean;
    /** 툴팁 포맷터 (생략 시 median 값만 표시 — 피그마 매칭) */
    tooltipFormatter?: (item: BoxPlotItem) => React.ReactNode;
}
export declare function BoxPlot({ title, data, height, boxWidth, yDomain, yTickFormatter, upperColor, lowerColor, activeUpperColor, showGrid, showYAxis, showXAxis, tooltipFormatter, className, ...props }: BoxPlotProps): import("react/jsx-runtime").JSX.Element;
