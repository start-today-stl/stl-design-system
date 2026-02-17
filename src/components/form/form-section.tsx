"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { UpIcon } from "@/icons"

/* =============================================================================
   FormSection - 섹션 (타이틀 + 접기 + 구분선)
   ============================================================================= */

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 섹션 타이틀 */
  title?: string
  /** 접기/펼치기 가능 여부 */
  collapsible?: boolean
  /** 기본 접힘 상태 */
  defaultCollapsed?: boolean
  /** 구분선 표시 여부 (섹션 위에 표시) */
  divider?: boolean
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  (
    {
      className,
      title,
      collapsible = false,
      defaultCollapsed = false,
      divider = false,
      children,
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

    const handleToggle = () => {
      if (collapsible) {
        setIsCollapsed(!isCollapsed)
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {/* 구분선 */}
        {divider && (
          <div className="py-3">
            <div className="h-px bg-border" />
          </div>
        )}

        {/* 섹션 헤더 */}
        {title && (
          <div
            className={cn(
              "flex h-6 items-center justify-between",
              collapsible && "cursor-pointer select-none"
            )}
            onClick={handleToggle}
            role={collapsible ? "button" : undefined}
            aria-expanded={collapsible ? !isCollapsed : undefined}
          >
            <span className="text-sm font-medium text-text-primary">
              {title}
            </span>
            {collapsible && (
              <UpIcon
                size={24}
                className={cn(
                  "text-text-secondary transition-transform duration-200",
                  isCollapsed && "rotate-180"
                )}
              />
            )}
          </div>
        )}

        {/* 섹션 컨텐츠 */}
        {!isCollapsed && (
          <div className="flex flex-col gap-2">
            {children}
          </div>
        )}
      </div>
    )
  }
)
FormSection.displayName = "FormSection"

/* =============================================================================
   FormRow - 필드 행 (1~4열 그리드)
   ============================================================================= */

interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 열 수 (1, 2, 3, 4) */
  columns?: 1 | 2 | 3 | 4
}

const formRowColumnStyles = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
} as const

const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  ({ className, columns = 1, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-2",
          formRowColumnStyles[columns],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormRow.displayName = "FormRow"

export { FormSection, FormRow }
export type { FormSectionProps, FormRowProps }
