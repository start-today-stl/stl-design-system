import { ChartLegendItem } from './chart-legend';
import * as React from "react";
export interface RadialChartItem {
    /** 카테고리 이름 (범례 / 툴팁 표시) */
    name: string;
    /** 값 (0 ~ max, 기본 max = 100) */
    value: number;
    /** 색상 (지정 안 하면 기본 팔레트) */
    color?: string;
}
export interface RadialChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** 데이터 (각 항목이 동심원 1개) */
    data: RadialChartItem[];
    /** 값의 최댓값 (기본 100 — 퍼센트) */
    max?: number;
    /** 차트 크기 (정사각형, px) */
    size?: number;
    /** 호 두께 (px) */
    barSize?: number;
    /** 호 사이 간격 (px) */
    barGap?: number;
    /** 트랙 (배경 호) 표시 여부 (기본 false — 디자인 매칭) */
    showTrack?: boolean;
    /** 중앙 라벨 — 큰 값 (예: "90%"). formatter 있으면 무시 */
    centerLabel?: React.ReactNode;
    /** 중앙 라벨 아래 보조 텍스트. formatter 있으면 무시 */
    centerSubLabel?: React.ReactNode;
    /** 중앙 라벨 동적 생성 — 활성 항목 (호버/pin) 따라 변경. null 일 때는 비활성 상태 표시 */
    centerLabelFormatter?: (active: RadialChartItem | null) => React.ReactNode;
    /** 중앙 보조 라벨 동적 생성 — 활성 항목 따라 변경 */
    centerSubLabelFormatter?: (active: RadialChartItem | null) => React.ReactNode;
    /** 범례 (entry 배열, color 생략 시 시리즈 색 자동 매칭) */
    legend?: ChartLegendItem[];
    /** 툴팁 라벨 */
    tooltipLabel?: React.ReactNode;
    /** 툴팁 값 포맷터 */
    tooltipFormatter?: (value: number, item: RadialChartItem) => React.ReactNode;
    /** 활성 항목 변경 시 호출 (호버 / 클릭 pin) — 사용처가 centerLabel 등을 동기화하는 용도 */
    onActiveChange?: (item: RadialChartItem | null) => void;
    /** 호 그려지는 enter 애니메이션 (기본 true) */
    animated?: boolean;
}
export declare function RadialChart({ data, max, size, barSize, barGap, showTrack, centerLabel, centerSubLabel, centerLabelFormatter, centerSubLabelFormatter, legend, tooltipLabel, tooltipFormatter, onActiveChange, animated, className, ...props }: RadialChartProps): import("react/jsx-runtime").JSX.Element;
