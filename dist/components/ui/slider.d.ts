import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    /** 값 툴팁 표시 */
    showTooltip?: boolean;
    /** min/max 라벨 표시 */
    showLabels?: boolean;
    /** 라벨 텍스트 */
    label?: string;
}
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLSpanElement>>;
export { Slider };
