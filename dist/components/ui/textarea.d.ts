import * as React from "react";
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** 에러 상태 */
    error?: boolean;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
/** TextareaField - label과 error 메시지를 포함한 Textarea 래퍼 */
export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** 라벨 텍스트 */
    label?: string;
    /** 에러 상태 */
    error?: boolean;
    /** 에러 메시지 */
    errorMessage?: string;
}
declare const TextareaField: React.ForwardRefExoticComponent<TextareaFieldProps & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea, TextareaField };
