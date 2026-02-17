import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { XIcon } from "@/icons"

const Tabs = TabsPrimitive.Root

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /** 탭 정렬 위치 */
  align?: "start" | "end"
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, align = "start", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex h-9 items-end border-b border-border",
      align === "end" ? "justify-end" : "justify-start",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** 닫기 버튼 표시 여부 */
  closable?: boolean
  /** 닫기 버튼 클릭 핸들러 */
  onClose?: () => void
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, closable, onClose, children, onKeyDown, ...props }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (closable && (e.key === "Delete" || e.key === "Backspace")) {
      e.preventDefault()
      onClose?.()
    }
    onKeyDown?.(e)
  }

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-0.5 whitespace-nowrap px-3 py-2 text-xs font-bold cursor-pointer",
        "rounded-t border border-b-0 border-border",
        "text-text-secondary bg-slate-100 dark:bg-slate-800",
        "mb-[-1px]", // 하단 border와 연결
        "transition-colors",
        "data-[state=active]:bg-card data-[state=active]:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
      {closable && (
        <span
          onClick={(e) => {
            e.stopPropagation()
            onClose?.()
          }}
          className="ml-0.5 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          aria-hidden="true"
        >
          <XIcon size={20} />
        </span>
      )}
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
