import { SidebarProps } from './sidebar';
import { HeaderProps } from './header';
import { ContentProps } from './content';
import * as React from "react";
export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
}
interface AppShellComponent extends React.ForwardRefExoticComponent<AppShellProps & React.RefAttributes<HTMLDivElement>> {
    Sidebar: typeof AppShellSidebar;
    Header: typeof AppShellHeader;
    Content: typeof AppShellContent;
}
declare const AppShellSidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLDivElement>>;
declare const AppShellHeader: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLDivElement>>;
declare const AppShellContent: React.ForwardRefExoticComponent<ContentProps & React.RefAttributes<HTMLDivElement>>;
declare const AppShell: AppShellComponent;
export { AppShell };
