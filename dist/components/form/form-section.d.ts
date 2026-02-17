import * as React from "react";
interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 섹션 타이틀 */
    title?: string;
    /** 접기/펼치기 가능 여부 */
    collapsible?: boolean;
    /** 기본 접힘 상태 */
    defaultCollapsed?: boolean;
    /** 구분선 표시 여부 (섹션 위에 표시) */
    divider?: boolean;
}
declare const FormSection: React.ForwardRefExoticComponent<FormSectionProps & React.RefAttributes<HTMLDivElement>>;
interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 열 수 (1, 2, 3, 4) */
    columns?: 1 | 2 | 3 | 4;
}
declare const FormRow: React.ForwardRefExoticComponent<FormRowProps & React.RefAttributes<HTMLDivElement>>;
export { FormSection, FormRow };
export type { FormSectionProps, FormRowProps };
