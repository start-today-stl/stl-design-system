import * as React from "react";
export interface FormFieldProps {
    /** 라벨 텍스트 */
    label: string;
    /** 필수 입력 표시 */
    required?: boolean;
    /** 라벨 숨김 (공간 유지) */
    invisibleLabel?: boolean;
    /** htmlFor - input id와 연결 */
    htmlFor?: string;
    /** 필드 컴포넌트 */
    children: React.ReactNode;
    /** 추가 className */
    className?: string;
}
/**
 * FormField - 라벨과 필드를 gap-1(4px) 간격으로 감싸는 래퍼 컴포넌트
 *
 * InputField, Select 등의 내부 라벨 구조와 동일한 간격 적용
 *
 * @example
 * // 기본 사용
 * <FormField label="상품명" required>
 *   <Input />
 * </FormField>
 *
 * // htmlFor 연결
 * <FormField label="이메일" htmlFor="email-input">
 *   <input id="email-input" type="email" />
 * </FormField>
 */
export declare const FormField: {
    ({ label, required, invisibleLabel, htmlFor, children, className, }: FormFieldProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
