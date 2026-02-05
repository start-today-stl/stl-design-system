import * as React from "react";
export interface VisitTagProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 태그 라벨 */
    label: string;
    /** 클릭 시 이동할 경로 또는 핸들러 */
    href?: string;
    /** 클릭 핸들러 */
    onNavigate?: () => void;
    /** 삭제 핸들러 */
    onRemove?: () => void;
}
declare const VisitTag: React.ForwardRefExoticComponent<VisitTagProps & React.RefAttributes<HTMLDivElement>>;
export { VisitTag };
