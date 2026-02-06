import * as React from "react"

import { cn } from "@/lib/utils"
import { Sidebar, type SidebarProps } from "./sidebar"
import { Header, type HeaderProps } from "./header"
import { Content, type ContentProps } from "./content"

// Context for sharing state between compound components
interface AppShellContextValue {
  // Future: collapsed state, theme, etc.
}

const AppShellContext = React.createContext<AppShellContextValue | null>(null)

// Root component props
export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {}

// Compound component type
interface AppShellComponent
  extends React.ForwardRefExoticComponent<
    AppShellProps & React.RefAttributes<HTMLDivElement>
  > {
  Sidebar: typeof AppShellSidebar
  Header: typeof AppShellHeader
  Content: typeof AppShellContent
}

// Helper to extract specific child types
function getChildByType(
  children: React.ReactNode,
  displayName: string
): React.ReactNode | null {
  const childArray = React.Children.toArray(children)
  return (
    childArray.find(
      (child) =>
        React.isValidElement(child) &&
        (child.type as React.ComponentType)?.displayName === displayName
    ) || null
  )
}

// Root AppShell component
const AppShellRoot = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ className, children, ...props }, ref) => {
    const sidebar = getChildByType(children, "AppShell.Sidebar")
    const header = getChildByType(children, "AppShell.Header")
    const content = getChildByType(children, "AppShell.Content")

    return (
      <AppShellContext.Provider value={{}}>
        <div
          ref={ref}
          className={cn(
            "flex h-screen w-full bg-cool-50 dark:bg-dark-600",
            className
          )}
          {...props}
        >
          {/* 사이드바 */}
          {sidebar && <aside className="flex-shrink-0 h-full relative z-20">{sidebar}</aside>}

          {/* 메인 영역 (헤더 + 콘텐츠) */}
          <div className="flex flex-col flex-1 min-w-0 bg-cool-50 dark:bg-dark-600 rounded-tl-[20px]">
            {/* 헤더 */}
            {header && <header className="flex-shrink-0 relative z-10">{header}</header>}

            {/* 콘텐츠 */}
            <main className="flex-1 overflow-auto">{content}</main>
          </div>
        </div>
      </AppShellContext.Provider>
    )
  }
)
AppShellRoot.displayName = "AppShell"

// AppShell.Sidebar - wrapper around Sidebar component
const AppShellSidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (props, ref) => {
    return <Sidebar ref={ref} {...props} />
  }
)
AppShellSidebar.displayName = "AppShell.Sidebar"

// AppShell.Header - wrapper around Header component
const AppShellHeader = React.forwardRef<HTMLDivElement, HeaderProps>(
  (props, ref) => {
    return <Header ref={ref} {...props} />
  }
)
AppShellHeader.displayName = "AppShell.Header"

// AppShell.Content - wrapper around Content component
const AppShellContent = React.forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    return <Content ref={ref} {...props} />
  }
)
AppShellContent.displayName = "AppShell.Content"

// Compose compound component
const AppShell = AppShellRoot as AppShellComponent
AppShell.Sidebar = AppShellSidebar
AppShell.Header = AppShellHeader
AppShell.Content = AppShellContent

export { AppShell }
