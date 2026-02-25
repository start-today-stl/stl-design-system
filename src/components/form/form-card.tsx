"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/* =============================================================================
   FormCard - 폼 전체 래퍼
   ============================================================================= */

interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormCard = React.forwardRef<HTMLDivElement, FormCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormCard.displayName = "FormCard"

/* =============================================================================
   FormHeader - 폼 상단 타이틀 영역 (선택적)
   ============================================================================= */

interface FormHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 타이틀 텍스트 */
  title?: string
}

const FormHeader = React.forwardRef<HTMLDivElement, FormHeaderProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between",
          "rounded-t-2xl border border-b-0 border-border",
          "bg-card px-4 py-2",
          className
        )}
        {...props}
      >
        {title ? (
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        ) : null}
        {children}
      </div>
    )
  }
)
FormHeader.displayName = "FormHeader"

/* =============================================================================
   FormContent - 폼 컨텐츠 영역
   ============================================================================= */

interface FormContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 대열 수 (1 또는 2) */
  columns?: 1 | 2
  /** FormHeader 존재 여부 (border-radius 조정) */
  hasHeader?: boolean
  /** FormFooter 존재 여부 (border-radius 조정) */
  hasFooter?: boolean
}

const FormContent = React.forwardRef<HTMLDivElement, FormContentProps>(
  ({ className, columns = 1, hasHeader = false, hasFooter = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border border-border bg-card p-4",
          // columns=2일 때 grid 레이아웃 사용 (col-span 지원)
          columns === 2 ? "grid grid-cols-2 gap-3" : "flex gap-3",
          !hasHeader && "rounded-t-2xl",
          !hasFooter && "rounded-b-2xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormContent.displayName = "FormContent"

/* =============================================================================
   FormColumn - 폼 열 컨테이너 (세로 구분선 자동 처리)
   ============================================================================= */

interface FormColumnProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormColumn = React.forwardRef<HTMLDivElement, FormColumnProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-1 flex-col gap-2",
          // 첫 번째가 아닌 열에 왼쪽 border 추가 (CSS로 처리)
          "[&:not(:first-child)]:border-l [&:not(:first-child)]:border-border [&:not(:first-child)]:pl-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormColumn.displayName = "FormColumn"

/* =============================================================================
   FormFooter - 폼 하단 액션 버튼 영역
   ============================================================================= */

interface FormFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormFooter = React.forwardRef<HTMLDivElement, FormFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-2",
          "rounded-b-2xl border border-t-0 border-border bg-card px-4 py-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormFooter.displayName = "FormFooter"

export { FormCard, FormHeader, FormContent, FormColumn, FormFooter }
export type { FormCardProps, FormHeaderProps, FormContentProps, FormColumnProps, FormFooterProps }
