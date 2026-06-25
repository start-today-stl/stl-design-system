import * as React from "react";
export interface GaugeChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    /** 차트 타이틀 (좌상단) */
    title?: React.ReactNode;
    /** 게이지 값 (0 ~ max) */
    value: number;
    /** 최댓값 (기본 100) */
    max?: number;
    /** 그라디언트 시작 / 끝 색상 (기본 var(--color-primary)) */
    color?: string;
    /** 하단 캡션 텍스트 */
    caption?: React.ReactNode;
    /** 우측 상단 뱃지 (선택, 별도 KPI 표시용) */
    badge?: React.ReactNode;
    /** 차트 가로 크기 (높이는 절반 = 반원 비율) */
    size?: number;
    /** 도넛 안쪽 반지름 비율 (0~1, 기본 0.3 — 두꺼운 도넛) */
    innerRadiusRatio?: number;
    /** 바닥 그레이 트랙 표시 (기본 true) */
    showTrack?: boolean;
    /** 호 그려지는 enter 애니메이션 (기본 true) */
    animated?: boolean;
}
export declare function GaugeChart({ title, value, max, color, caption, badge, size, innerRadiusRatio, showTrack, animated, className, ...props }: GaugeChartProps): import("react/jsx-runtime").JSX.Element;
