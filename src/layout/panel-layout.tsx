import * as React from "react"

import { cn } from "@/lib/utils"

// ============================================================================
// PanelLayout (Root)
// ============================================================================

export interface PanelLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

const PanelLayout = React.forwardRef<HTMLDivElement, PanelLayoutProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-full w-full gap-6", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PanelLayout.displayName = "PanelLayout"

// ============================================================================
// PanelLayoutSide (Left Panel)
// ============================================================================

export interface PanelLayoutSideProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 사이드 패널 너비 (기본: 240px) */
  width?: number | string
  /** 하단 액션 영역 (버튼 등) */
  footer?: React.ReactNode
}

const PanelLayoutSide = React.forwardRef<HTMLDivElement, PanelLayoutSideProps>(
  ({ className, width = 240, style, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex-shrink-0 flex flex-col bg-card border border-border rounded-2xl overflow-hidden",
          className
        )}
        style={{ width, ...style }}
        {...props}
      >
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && (
          <div className="flex-shrink-0 p-4 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    )
  }
)
PanelLayoutSide.displayName = "PanelLayoutSide"

// ============================================================================
// PanelLayoutMain (Right Panel)
// ============================================================================

export interface PanelLayoutMainProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PanelLayoutMain = React.forwardRef<HTMLDivElement, PanelLayoutMainProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 flex flex-col min-w-0 overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PanelLayoutMain.displayName = "PanelLayoutMain"

// ============================================================================
// PanelLayoutHeader (Main Header)
// ============================================================================

export interface PanelLayoutHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 헤더 타이틀 */
  title?: string
  /** 타이틀 우측 액션 영역 */
  actions?: React.ReactNode
}

const PanelLayoutHeader = React.forwardRef<
  HTMLDivElement,
  PanelLayoutHeaderProps
>(({ className, title, actions, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex-shrink-0 flex items-center justify-between",
        "px-6 py-4 border-b border-border",
        className
      )}
      {...props}
    >
      {title ? (
        <>
          <h2 className="text-xl font-semibold">{title}</h2>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </>
      ) : (
        children
      )}
    </div>
  )
})
PanelLayoutHeader.displayName = "PanelLayoutHeader"

// ============================================================================
// PanelLayoutBody (Main Content)
// ============================================================================

export interface PanelLayoutBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PanelLayoutBody = React.forwardRef<HTMLDivElement, PanelLayoutBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto p-6", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PanelLayoutBody.displayName = "PanelLayoutBody"

// ============================================================================
// Compound Component Export
// ============================================================================

const PanelLayoutCompound = Object.assign(PanelLayout, {
  Side: PanelLayoutSide,
  Main: PanelLayoutMain,
  Header: PanelLayoutHeader,
  Body: PanelLayoutBody,
})

export { PanelLayoutCompound as PanelLayout }
