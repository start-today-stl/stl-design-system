import { ChartLegend, ChartLegendItem } from './chart-legend';
import * as React from "react";
export interface PieChartItem {
    /** 카테고리 이름 (범례 / 툴팁 표시) */
    name: string;
    /** 값 (segment 크기에 비례) */
    value: number;
    /** 색상 (지정 안 하면 기본 팔레트) */
    color?: string;
}
export interface PieChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** segment 데이터 */
    data: PieChartItem[];
    /** 차트 크기 (정사각형, px) */
    size?: number;
    /** 도넛 안쪽 반지름 비율 (0~1, 기본 0.75 — 얇은 ring, 0 = 풀 파이) */
    innerRadiusRatio?: number;
    /** 중앙 라벨 — 정적 (formatter 있으면 무시) */
    centerLabel?: React.ReactNode;
    /** 중앙 보조 라벨 — 정적 */
    centerSubLabel?: React.ReactNode;
    /** 중앙 라벨 동적 생성 — 활성 항목 (호버/pin) 따라 변경 */
    centerLabelFormatter?: (active: PieChartItem | null) => React.ReactNode;
    /** 중앙 보조 라벨 동적 생성 */
    centerSubLabelFormatter?: (active: PieChartItem | null) => React.ReactNode;
    /** 범례 (entry 배열, color 생략 시 segment 색 자동 매칭) */
    legend?: ChartLegendItem[];
    /** 범례 위치 (기본 bottom — 도넛 아래 세로 stack) */
    legendPosition?: "right" | "bottom";
    /** 우측 상단 뱃지 (보조 KPI) */
    badge?: React.ReactNode;
    /** 툴팁 라벨 */
    tooltipLabel?: React.ReactNode;
    /** 툴팁 값 포맷터 */
    tooltipFormatter?: (value: number, item: PieChartItem) => React.ReactNode;
    /** 활성 항목 변경 시 호출 */
    onActiveChange?: (item: PieChartItem | null) => void;
    /** segment 그려지는 enter 애니메이션 (기본 true) */
    animated?: boolean;
}
export declare function PieChart({ data, size, innerRadiusRatio, centerLabel, centerSubLabel, centerLabelFormatter, centerSubLabelFormatter, legend, legendPosition, badge, tooltipLabel, tooltipFormatter, onActiveChange, animated, className, ...props }: PieChartProps): import("react/jsx-runtime").JSX.Element;
export { ChartLegend };
