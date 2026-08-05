import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export type RadioGroupItemSize = "sm" | "md" | "lg";
export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    /** 라벨 텍스트 */
    label?: string;
    /** 색상 변형 */
    variant?: "primary" | "success" | "danger";
    /**
     * 크기 (기본: md)
     * - sm: 12px — 이전 기본 크기
     * - md: 16px — 기본
     * - lg: 20px — Checkbox(20px) 와 동일 박스 크기
     */
    size?: RadioGroupItemSize;
}
declare const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
/** RadioGroupField - label을 포함한 RadioGroup 래퍼 */
export interface RadioGroupFieldProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
    /** 라벨 텍스트 */
    label?: string;
    /** 필수 입력 표시 (라벨 앞에 점 표시) */
    required?: boolean;
}
declare const RadioGroupField: React.ForwardRefExoticComponent<RadioGroupFieldProps & React.RefAttributes<HTMLDivElement>>;
export { RadioGroup, RadioGroupItem, RadioGroupField };
