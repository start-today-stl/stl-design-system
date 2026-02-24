import * as React from "react";
declare const inputSizeStyles: {
    readonly sm: "w-[160px]";
    readonly md: "w-[260px]";
    readonly lg: "w-[360px]";
    readonly full: "w-full";
};
export type InputSize = keyof typeof inputSizeStyles;
/** 순수 Input 컴포넌트 - label/error 없이 input만 렌더링 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** 에러 상태 */
    error?: boolean;
    /** 테이블 모드 (파란 glow 대신 border 강조) */
    tableMode?: boolean;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
/** InputField - label과 error 메시지를 포함한 Input 래퍼 */
export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    /** 라벨 텍스트 */
    label?: string;
    /** 에러 상태 */
    error?: boolean;
    /** 에러 메시지 */
    errorMessage?: string;
    /** 너비 크기 */
    size?: InputSize;
    /** 우측 아이콘 (ReactNode) */
    rightIcon?: React.ReactNode;
    /** 우측 아이콘 클릭 핸들러 */
    onRightIconClick?: () => void;
    /** 우측 아이콘 버튼의 접근성 라벨 */
    rightIconLabel?: string;
    /** 라벨이 없어도 라벨 공간 유지 */
    reserveLabelSpace?: boolean;
    /** 로딩 상태 (스피너 표시) */
    loading?: boolean;
    /** 비밀번호 보기 토글 표시 (type="password"일 때 기본 true) */
    showPasswordToggle?: boolean;
}
declare const InputField: React.ForwardRefExoticComponent<InputFieldProps & React.RefAttributes<HTMLInputElement>>;
export { Input, InputField, inputSizeStyles };
