import * as React from "react";
declare const selectSizeStyles: {
    readonly sm: "w-[160px]";
    readonly md: "w-[260px]";
    readonly lg: "w-[360px]";
    readonly full: "w-full";
};
export type SelectSize = keyof typeof selectSizeStyles;
export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface SelectProps {
    /** 라벨 텍스트 */
    label?: string;
    /** 플레이스홀더 */
    placeholder?: string;
    /** 옵션 목록 */
    options: SelectOption[];
    /** 선택된 값 */
    value?: string;
    /** 기본 선택 값 */
    defaultValue?: string;
    /** 값 변경 핸들러 */
    onValueChange?: (value: string) => void;
    /** 너비 크기 */
    size?: SelectSize;
    /** 에러 상태 */
    error?: boolean;
    /** 에러 메시지 */
    errorMessage?: string;
    /** 비활성화 */
    disabled?: boolean;
    /** 추가 className */
    className?: string;
    /** 접근성 라벨 (label이 없을 때 사용) */
    "aria-label"?: string;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLButtonElement>>;
export { Select, selectSizeStyles };
