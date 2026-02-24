import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    /** 값 툴팁 표시 */
    showTooltip?: boolean;
    /** min/max 라벨 표시 */
    showLabels?: boolean;
    /** 라벨 텍스트 */
    label?: string;
    /** 읽기 전용 모드 (진행률 표시용) */
    readonly?: boolean;
    /** Thumb 표시 여부 (기본값: true) */
    showThumb?: boolean;
}
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLSpanElement>>;
export { Slider };
