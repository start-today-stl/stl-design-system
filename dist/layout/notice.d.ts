import * as React from "react";
export interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 아이콘 */
    icon?: React.ReactNode;
    /** 제목 */
    title?: string;
    /** 설명 */
    description?: string;
}
declare const Notice: React.ForwardRefExoticComponent<NoticeProps & React.RefAttributes<HTMLDivElement>>;
export { Notice };
