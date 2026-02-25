import * as React from "react";
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    /** 필수 입력 표시 */
    required?: boolean;
    /** 라벨 숨김 (공간은 유지) */
    invisible?: boolean;
    children: React.ReactNode;
}
/**
 * 커스텀 레이아웃에서 사용하는 폼 라벨 컴포넌트
 * InputField, Select 등의 내부 라벨과 동일한 스타일
 */
export declare const FormLabel: React.ForwardRefExoticComponent<FormLabelProps & React.RefAttributes<HTMLLabelElement>>;
export {};
