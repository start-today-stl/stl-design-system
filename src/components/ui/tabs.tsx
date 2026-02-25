import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { createPortal } from "react-dom"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

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

/** 드래그 가능한 탭 리스트 Props */
export interface SortableTabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /** 탭 정렬 위치 */
  align?: "start" | "end"
  /** 탭 ID 배열 (순서대로) */
  items: string[]
  /** 순서 변경 핸들러 */
  onReorder: (items: string[]) => void
}

/** 드래그 앤 드롭으로 순서 변경 가능한 탭 리스트 */
const SortableTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  SortableTabsListProps
>(({ className, align = "start", items, onReorder, children, ...props }, ref) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px 이상 이동해야 드래그 시작
      },
    }),
    useSensor(KeyboardSensor)
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string)
      const newIndex = items.indexOf(over.id as string)
      onReorder(arrayMove(items, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <TabsPrimitive.List
          ref={ref}
          className={cn(
            "flex h-9 items-end border-b border-border",
            align === "end" ? "justify-end" : "justify-start",
            className
          )}
          {...props}
        >
          {children}
        </TabsPrimitive.List>
      </SortableContext>
    </DndContext>
  )
})
SortableTabsList.displayName = "SortableTabsList"

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** 닫기 버튼 표시 여부 */
  closable?: boolean
  /** 닫기 버튼 클릭 핸들러 */
  onClose?: () => void
  /** 탭 최대 너비 (기본값: 120px) */
  maxWidth?: number
  /** 탭 최소 너비 (기본값: 60px) */
  minWidth?: number
}

/** 커스텀 포털 툴팁 (Radix Tabs와 충돌 방지) */
const PortalTooltip = ({
  children,
  targetRef,
  show,
}: {
  children: React.ReactNode
  targetRef: React.RefObject<HTMLButtonElement | null>
  show: boolean
}) => {
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (show && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + rect.width / 2 + window.scrollX,
      })
    }
  }, [show, targetRef])

  if (!mounted || !show) return null

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translateX(-50%)",
        zIndex: 50,
        pointerEvents: "none",
      }}
      className={cn(
        "rounded-md border bg-popover px-4 py-2.5 text-sm text-popover-foreground",
        "shadow-[10px_10px_10px_0px_#0000001A]",
        "animate-in fade-in-0 zoom-in-95",
        // 화살표
        "relative",
        "before:absolute before:bottom-full before:left-1/2 before:-ml-[11px] before:border-[11px] before:border-transparent before:border-b-border before:content-['']",
        "after:absolute after:bottom-full after:left-1/2 after:-ml-[10px] after:border-[10px] after:border-transparent after:border-b-white dark:after:border-b-[var(--color-slate-900)] after:content-['']"
      )}
    >
      {children}
    </div>,
    document.body
  )
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, closable, onClose, children, onKeyDown, maxWidth = 120, minWidth = 60, ...props }, ref) => {
  const textRef = React.useRef<HTMLSpanElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [isTruncated, setIsTruncated] = React.useState(false)
  const [isHovering, setIsHovering] = React.useState(false)

  // ref 병합
  const mergedRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref && typeof ref === "object") {
        ;(ref as { current: HTMLButtonElement | null }).current = node
      }
    },
    [ref]
  )

  React.useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth)
      }
    }
    checkTruncation()
    window.addEventListener("resize", checkTruncation)
    return () => window.removeEventListener("resize", checkTruncation)
  }, [children])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (closable && (e.key === "Delete" || e.key === "Backspace")) {
      e.preventDefault()
      onClose?.()
    }
    onKeyDown?.(e)
  }

  return (
    <>
      <TabsPrimitive.Trigger
        ref={mergedRef}
        style={{ minWidth: `${minWidth}px` }}
        className={cn(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-pointer",
          "flex-grow-0", // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "mb-[-1px]", // 하단 border와 연결
          "transition-all duration-200",
          // 비활성 탭: 축소 가능, maxWidth 제한
          "data-[state=inactive]:flex-shrink data-[state=inactive]:max-w-[120px]",
          // 활성 탭: 축소 안 함, 전체 텍스트 표시
          "data-[state=active]:flex-shrink-0 data-[state=active]:max-w-none",
          "data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...props}
      >
        <span
          ref={textRef}
          className="truncate min-w-0"
        >
          {children}
        </span>
        {closable && (
          <span
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            className="ml-0.5 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            aria-hidden="true"
          >
            <XIcon size={20} />
          </span>
        )}
      </TabsPrimitive.Trigger>
      <PortalTooltip targetRef={triggerRef} show={isTruncated && isHovering}>
        {children}
      </PortalTooltip>
    </>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/** 드래그 가능한 탭 트리거 Props */
export interface SortableTabsTriggerProps extends TabsTriggerProps {
  /** 드래그용 고유 ID (보통 value와 동일) */
  id: string
}

/** 드래그 앤 드롭 가능한 탭 트리거 */
const SortableTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  SortableTabsTriggerProps
>(({ id, className, closable, onClose, children, onKeyDown, maxWidth = 120, minWidth = 60, ...props }, ref) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  // dnd-kit의 role="button"을 제외 (Radix Tab의 role="tab" 유지를 위해)
  const { role: _, ...sortableAttributes } = attributes

  const textRef = React.useRef<HTMLSpanElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [isTruncated, setIsTruncated] = React.useState(false)
  const [isHovering, setIsHovering] = React.useState(false)

  // ref 병합
  const mergedRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node
      setNodeRef(node)
      if (typeof ref === "function") {
        ref(node)
      } else if (ref && typeof ref === "object") {
        ;(ref as { current: HTMLButtonElement | null }).current = node
      }
    },
    [ref, setNodeRef]
  )

  React.useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth)
      }
    }
    checkTruncation()
    window.addEventListener("resize", checkTruncation)
    return () => window.removeEventListener("resize", checkTruncation)
  }, [children])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (closable && (e.key === "Delete" || e.key === "Backspace")) {
      e.preventDefault()
      onClose?.()
    }
    onKeyDown?.(e)
  }

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
    minWidth: `${minWidth}px`,
  }

  return (
    <>
      <TabsPrimitive.Trigger
        ref={mergedRef}
        style={style}
        className={cn(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-grab",
          "flex-grow-0", // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "mb-[-1px]", // 하단 border와 연결
          "transition-all duration-200",
          // 비활성 탭: 축소 가능, maxWidth 제한
          "data-[state=inactive]:flex-shrink data-[state=inactive]:max-w-[120px]",
          // 활성 탭: 축소 안 함, 전체 텍스트 표시
          "data-[state=active]:flex-shrink-0 data-[state=active]:max-w-none",
          "data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          isDragging && "cursor-grabbing",
          className
        )}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...sortableAttributes}
        {...listeners}
        {...props}
      >
        <span
          ref={textRef}
          className="truncate min-w-0"
        >
          {children}
        </span>
        {closable && (
          <span
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            className="ml-0.5 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            aria-hidden="true"
          >
            <XIcon size={20} />
          </span>
        )}
      </TabsPrimitive.Trigger>
      <PortalTooltip targetRef={triggerRef} show={isTruncated && isHovering && !isDragging}>
        {children}
      </PortalTooltip>
    </>
  )
})
SortableTabsTrigger.displayName = "SortableTabsTrigger"

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

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  SortableTabsList,
  SortableTabsTrigger,
  arrayMove,
}
