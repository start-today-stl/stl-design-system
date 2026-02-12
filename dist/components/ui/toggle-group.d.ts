import * as React from "react";
export interface ToggleGroupOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface ToggleGroupProps {
    /** 라벨 텍스트 */
    label?: string;
    /** 옵션 목록 */
    options: ToggleGroupOption[];
    /** 선택된 값 */
    value?: string;
    /** 기본 선택 값 */
    defaultValue?: string;
    /** 값 변경 핸들러 */
    onValueChange?: (value: string) => void;
    /** 비활성화 */
    disabled?: boolean;
    /** 추가 className */
    className?: string;
}
declare const ToggleGroup: React.ForwardRefExoticComponent<ToggleGroupProps & React.RefAttributes<HTMLDivElement>>;
export { ToggleGroup };
