import * as React from "react"

import { cn } from "@/lib/utils"
import { Sidebar, type SidebarProps, type SidebarCollapseMode } from "./sidebar"
import { Header, type HeaderProps } from "./header"
import { Content, type ContentProps } from "./content"
import { Button } from "@/components/ui/button"
import { MenuHorizontalIcon } from "@/icons"

// Context for sharing state between compound components
interface AppShellContextValue {
  /** 사이드바 collapseMode */
  collapseMode?: SidebarCollapseMode
  /** 사이드바 접힘 상태 */
  collapsed?: boolean
  /** 사이드바 접힘 상태 변경 핸들러 (ref로 저장하여 안정적인 참조 유지) */
  onCollapsedChangeRef: React.MutableRefObject<((collapsed: boolean) => void) | undefined>
  /** 사이드바 상태 등록 (내부용) */
  _registerSidebar?: (props: {
    collapseMode?: SidebarCollapseMode
    collapsed?: boolean
  }) => void
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

    // 사이드바 상태 저장 (primitive 값만)
    const [sidebarState, setSidebarState] = React.useState<{
      collapseMode?: SidebarCollapseMode
      collapsed?: boolean
    }>({})

    // onCollapsedChange는 ref로 저장 (함수 참조 변경에 따른 리렌더 방지)
    const onCollapsedChangeRef = React.useRef<((collapsed: boolean) => void) | undefined>()

    // 안정적인 register 함수 (무한 루프 방지)
    const registerSidebar = React.useCallback((props: {
      collapseMode?: SidebarCollapseMode
      collapsed?: boolean
    }) => {
      setSidebarState(props)
    }, [])

    const contextValue: AppShellContextValue = React.useMemo(() => ({
      ...sidebarState,
      onCollapsedChangeRef,
      _registerSidebar: registerSidebar,
    }), [sidebarState, registerSidebar])

    return (
      <AppShellContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "flex h-screen w-full bg-slate-50 dark:bg-slate-950",
            className
          )}
          {...props}
        >
          {/* 사이드바 */}
          {sidebar && <aside className="flex-shrink-0 h-full relative z-40">{sidebar}</aside>}

          {/* 메인 영역 (헤더 + 콘텐츠) */}
          <div className="flex flex-col flex-1 min-w-0 bg-slate-50 dark:bg-slate-950 rounded-tl-[20px]">
            {/* 헤더 */}
            {header && <header className="flex-shrink-0 relative z-30">{header}</header>}

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
  ({ collapseMode, collapsed, onCollapsedChange, ...props }, ref) => {
    const context = React.useContext(AppShellContext)

    // onCollapsedChange는 ref에 저장 (매 렌더마다 최신 참조 유지)
    React.useLayoutEffect(() => {
      if (context) {
        context.onCollapsedChangeRef.current = onCollapsedChange
      }
    })

    // 사이드바 상태를 Context에 등록 (primitive 값만)
    React.useEffect(() => {
      context?._registerSidebar?.({ collapseMode, collapsed })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collapseMode, collapsed])

    return (
      <Sidebar
        ref={ref}
        collapseMode={collapseMode}
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
        {...props}
      />
    )
  }
)
AppShellSidebar.displayName = "AppShell.Sidebar"

// AppShell.Header - wrapper around Header component
const AppShellHeader = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ menuButton, ...props }, ref) => {
    const context = React.useContext(AppShellContext)

    // hidden 모드일 때 자동으로 메뉴 버튼 렌더링
    const autoMenuButton = React.useMemo(() => {
      if (menuButton) return menuButton // 사용자가 직접 지정한 경우 우선
      if (context?.collapseMode !== "hidden") return undefined

      return (
        <Button
          variant="text"
          size="icon-sm"
          onClick={() => context?.onCollapsedChangeRef.current?.(!context?.collapsed)}
          aria-label={context?.collapsed ? "메뉴 열기" : "메뉴 닫기"}
        >
          <MenuHorizontalIcon size={24} />
        </Button>
      )
    }, [menuButton, context?.collapseMode, context?.collapsed, context?.onCollapsedChangeRef])

    return <Header ref={ref} menuButton={autoMenuButton} {...props} />
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
