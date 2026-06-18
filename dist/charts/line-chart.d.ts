import * as React from "react";
export interface LineSeries {
    /** 시리즈가 참조할 data 필드 key */
    dataKey: string;
    /** 선 / 도트 색상 (지정 안 하면 기본 팔레트 사용) */
    color?: string;
    /** 툴팁에 표시할 이름 (지정 안 하면 dataKey 사용) */
    name?: string;
}
export interface LineChartProps<T extends Record<string, unknown>> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** 차트 데이터 */
    data: T[];
    /** X 축 key (data 의 필드명) */
    xKey: keyof T & string;
    /** 시리즈 정의 (여러 라인 지원) */
    lines: LineSeries[];
    /** 차트 높이 */
    height?: number | `${number}%`;
    /** 툴팁 라벨 (선택) */
    tooltipLabel?: React.ReactNode;
    /** 툴팁 값 포맷터 */
    tooltipFormatter?: (value: number, series: LineSeries, payload: Record<string, unknown>) => React.ReactNode;
    /** X 축 표시 여부 */
    showXAxis?: boolean;
    /** Y 축 표시 여부 */
    showYAxis?: boolean;
    /** 가로 그리드 표시 여부 */
    showGrid?: boolean;
    /** 데이터 포인트 dot 표시 여부 */
    showDots?: boolean;
    /** 선 보간 방식 (기본 linear) */
    curveType?: "linear" | "monotone" | "step" | "natural";
}
export declare function LineChart<T extends Record<string, unknown>>({ data, xKey, lines, height, tooltipLabel, tooltipFormatter, showXAxis, showYAxis, showGrid, showDots, curveType, className, ...props }: LineChartProps<T>): import("react/jsx-runtime").JSX.Element;
