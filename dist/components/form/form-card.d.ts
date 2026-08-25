import * as React from "react";
interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const FormCard: React.ForwardRefExoticComponent<FormCardProps & React.RefAttributes<HTMLDivElement>>;
interface FormHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 타이틀 텍스트 */
    title?: string;
}
declare const FormHeader: React.ForwardRefExoticComponent<FormHeaderProps & React.RefAttributes<HTMLDivElement>>;
interface FormContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 대열 수 (1, 2, 또는 3). FormColumn 을 자식으로 두면 컬럼 사이에 세로 구분선이 자동 표시됨 */
    columns?: 1 | 2 | 3;
    /** FormHeader 존재 여부 (border-radius 조정) */
    hasHeader?: boolean;
    /** FormFooter 존재 여부 (border-radius 조정) */
    hasFooter?: boolean;
}
declare const FormContent: React.ForwardRefExoticComponent<FormContentProps & React.RefAttributes<HTMLDivElement>>;
interface FormColumnProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const FormColumn: React.ForwardRefExoticComponent<FormColumnProps & React.RefAttributes<HTMLDivElement>>;
interface FormFooterProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const FormFooter: React.ForwardRefExoticComponent<FormFooterProps & React.RefAttributes<HTMLDivElement>>;
export { FormCard, FormHeader, FormContent, FormColumn, FormFooter };
export type { FormCardProps, FormHeaderProps, FormContentProps, FormColumnProps, FormFooterProps };
