import * as React from "react";
export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 패딩 적용 여부 (기본값: true) */
    padded?: boolean;
}
declare const Content: React.ForwardRefExoticComponent<ContentProps & React.RefAttributes<HTMLDivElement>>;
export { Content };
