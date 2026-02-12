import * as React from "react";
export interface SplitPanelProps extends React.HTMLAttributes<HTMLDivElement> {
}
export interface SplitPanelSideProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 사이드 패널 너비 (기본값: 280px) */
    width?: number | string;
}
declare const SplitPanelSide: React.ForwardRefExoticComponent<SplitPanelSideProps & React.RefAttributes<HTMLDivElement>>;
export interface SplitPanelMainProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 패딩 적용 여부 (기본값: true) */
    padded?: boolean;
}
declare const SplitPanelMain: React.ForwardRefExoticComponent<SplitPanelMainProps & React.RefAttributes<HTMLDivElement>>;
interface SplitPanelComponent extends React.ForwardRefExoticComponent<SplitPanelProps & React.RefAttributes<HTMLDivElement>> {
    Side: typeof SplitPanelSide;
    Main: typeof SplitPanelMain;
}
declare const SplitPanel: SplitPanelComponent;
export { SplitPanel };
