import * as React from "react";
export interface PanelLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
}
export interface PanelLayoutSideProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 사이드 패널 너비 (기본: 240px) */
    width?: number | string;
    /** 하단 액션 영역 (버튼 등) */
    footer?: React.ReactNode;
}
export interface PanelLayoutMainProps extends React.HTMLAttributes<HTMLDivElement> {
}
export interface PanelLayoutHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 헤더 타이틀 */
    title?: string;
    /** 타이틀 우측 액션 영역 */
    actions?: React.ReactNode;
}
export interface PanelLayoutBodyProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const PanelLayoutCompound: React.ForwardRefExoticComponent<PanelLayoutProps & React.RefAttributes<HTMLDivElement>> & {
    Side: React.ForwardRefExoticComponent<PanelLayoutSideProps & React.RefAttributes<HTMLDivElement>>;
    Main: React.ForwardRefExoticComponent<PanelLayoutMainProps & React.RefAttributes<HTMLDivElement>>;
    Header: React.ForwardRefExoticComponent<PanelLayoutHeaderProps & React.RefAttributes<HTMLDivElement>>;
    Body: React.ForwardRefExoticComponent<PanelLayoutBodyProps & React.RefAttributes<HTMLDivElement>>;
};
export { PanelLayoutCompound as PanelLayout };
