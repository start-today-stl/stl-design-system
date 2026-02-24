import * as React from "react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: boolean
  /** 로딩 상태 (스켈레톤 표시) */
  loading?: boolean
}

/** 카드 스켈레톤 레이아웃 */
function CardSkeletonContent() {
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* 이미지 영역 */}
      <Skeleton height={160} className="rounded-xl" />
      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-2">
        <Skeleton height={18} width="60%" />
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="60%" />
      </div>
    </div>
  )
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, shadow = true, loading = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border bg-card text-card-foreground",
        shadow && "shadow-card",
        className
      )}
      {...props}
    >
      {loading ? <CardSkeletonContent /> : children}
    </div>
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-4 p-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-[1.3] tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-medium leading-normal text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
