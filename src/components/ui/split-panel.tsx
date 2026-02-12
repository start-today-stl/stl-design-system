import * as React from "react"

import { cn } from "@/lib/utils"

// ============================================================================
// SplitPanel
// ============================================================================

export interface SplitPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

const SplitPanelRoot = React.forwardRef<HTMLDivElement, SplitPanelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-full w-full", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SplitPanelRoot.displayName = "SplitPanel"

// ============================================================================
// SplitPanel.Side
// ============================================================================

export interface SplitPanelSideProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 사이드 패널 너비 (기본값: 280px) */
  width?: number | string
}

const SplitPanelSide = React.forwardRef<HTMLDivElement, SplitPanelSideProps>(
  ({ className, width = 280, style, children, ...props }, ref) => {
    const widthValue = typeof width === "number" ? `${width}px` : width

    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col flex-shrink-0 h-full",
          "bg-card",
          "border-r border-border",
          "overflow-y-auto",
          className
        )}
        style={{ width: widthValue, ...style }}
        {...props}
      >
        {children}
      </aside>
    )
  }
)
SplitPanelSide.displayName = "SplitPanel.Side"

// ============================================================================
// SplitPanel.Main
// ============================================================================

export interface SplitPanelMainProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 패딩 적용 여부 (기본값: true) */
  padded?: boolean
}

const SplitPanelMain = React.forwardRef<HTMLDivElement, SplitPanelMainProps>(
  ({ className, padded = true, children, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          "flex-1 min-w-0 h-full",
          "overflow-y-auto",
          padded && "p-6",
          className
        )}
        {...props}
      >
        {children}
      </main>
    )
  }
)
SplitPanelMain.displayName = "SplitPanel.Main"

// ============================================================================
// Compound Component
// ============================================================================

interface SplitPanelComponent
  extends React.ForwardRefExoticComponent<
    SplitPanelProps & React.RefAttributes<HTMLDivElement>
  > {
  Side: typeof SplitPanelSide
  Main: typeof SplitPanelMain
}

const SplitPanel = SplitPanelRoot as SplitPanelComponent
SplitPanel.Side = SplitPanelSide
SplitPanel.Main = SplitPanelMain

export { SplitPanel }
