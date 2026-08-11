import * as React from "react";
export interface NavInfoItemProps {
    /** 아이콘 (선택사항) */
    icon?: React.ReactNode;
    /** 텍스트 */
    text: string;
    /** 링크 (선택사항) */
    href?: string;
}
export interface NavInfoProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 정보 항목 목록 */
    items?: NavInfoItemProps[];
}
declare const NavInfoItem: ({ icon, text, href }: NavInfoItemProps) => import("react/jsx-runtime").JSX.Element;
declare const NavInfo: React.ForwardRefExoticComponent<NavInfoProps & React.RefAttributes<HTMLDivElement>>;
export { NavInfo, NavInfoItem };
