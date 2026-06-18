import * as React from "react";
export interface ChartLegendItem {
    /** 범례 마커 색상 — 생략 시 차트에서 자동 매칭 */
    color?: string;
    /** 범례 라벨 */
    label: React.ReactNode;
}
export interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
    items: ChartLegendItem[];
}
/** 차트 우측 상단 범례 — 차트 컴포넌트 내부에서 사용 */
export declare const ChartLegend: React.ForwardRefExoticComponent<ChartLegendProps & React.RefAttributes<HTMLDivElement>>;
