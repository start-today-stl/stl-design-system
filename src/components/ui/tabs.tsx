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

/** 탭 최대 너비 preset 값 */
export type TabMaxWidth = 60 | 80 | 100 | 120 | 140 | 160

/** maxWidth preset을 Tailwind 클래스로 매핑 */
const maxWidthClasses: Record<TabMaxWidth, string> = {
  60: "max-w-[60px]",
  80: "max-w-[80px]",
  100: "max-w-[100px]",
  120: "max-w-[120px]",
  140: "max-w-[140px]",
  160: "max-w-[160px]",
}

/** minWidth preset을 Tailwind 클래스로 매핑 */
export type TabMinWidth = 40 | 60 | 80

const minWidthClasses: Record<TabMinWidth, string> = {
  40: "min-w-[40px]",
  60: "min-w-[60px]",
  80: "min-w-[80px]",
}

const Tabs = TabsPrimitive.Root

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /** 탭 정렬 위치 */
  align?: "start" | "end"
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, align = "start", children, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex h-9 items-end shadow-[inset_0_-1px_0_var(--color-border)]",
        align === "end" ? "justify-end" : "justify-start",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  )
})
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
            "flex h-9 items-end shadow-[inset_0_-1px_0_var(--color-border)]",
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
  /** 탭 최대 너비 (비활성 탭에만 적용, 기본값: 120) */
  maxWidth?: TabMaxWidth
  /** 탭 최소 너비 (기본값: 60) */
  minWidth?: TabMinWidth
}

/** 탭 컨텍스트 메뉴 (우클릭 메뉴) */
interface TabContextMenuProps {
  position: { x: number; y: number }
  onClose: () => void
  onCloseTab?: () => void
  onCloseTabsToRight?: () => void
  onCloseOtherTabs?: () => void
}

const TabContextMenu = ({
  position,
  onClose,
  onCloseTab,
  onCloseTabsToRight,
  onCloseOtherTabs,
}: TabContextMenuProps) => {
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 외부 클릭 시 닫기
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleScroll = () => onClose()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("scroll", handleScroll, true)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("scroll", handleScroll, true)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  if (!mounted) return null

  const menuItems = [
    { label: "닫기", onClick: onCloseTab, show: !!onCloseTab },
    { label: "오른쪽 탭 닫기", onClick: onCloseTabsToRight, show: !!onCloseTabsToRight },
    { label: "다른 탭 닫기", onClick: onCloseOtherTabs, show: !!onCloseOtherTabs },
  ].filter(item => item.show)

  return createPortal(
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        zIndex: 50,
      }}
      className={cn(
        "min-w-[140px] rounded-[5px] border border-slate-100 dark:border-slate-600",
        "bg-white/90 dark:bg-slate-800/90 backdrop-blur-[12px]",
        "p-[5px] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.1)]",
        "animate-in fade-in-0 zoom-in-95"
      )}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => {
            item.onClick?.()
            onClose()
          }}
          className={cn(
            "flex w-full h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[8px]",
            "text-xs text-slate-600 dark:text-slate-300 outline-none transition-colors",
            "hover:bg-slate-100 dark:hover:bg-slate-700"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>,
    document.body
  )
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
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
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

  // TabsContent 없이 사용할 때 (네비게이션/필터 용도) aria-controls 제거
  React.useEffect(() => {
    const el = triggerRef.current
    if (el) {
      const target = el.getAttribute("aria-controls")
      if (target && !document.getElementById(target)) {
        el.removeAttribute("aria-controls")
      }
    }
  }, [])

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
        className={cn(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-pointer",
          "flex-grow-0", // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "border border-b-0 border-border", // 모든 탭에 테두리 표시
          // 비활성 탭: 축소 가능, minWidth/maxWidth 적용
          "data-[state=inactive]:flex-shrink",
          minWidthClasses[minWidth],
          maxWidthClasses[maxWidth],
          // 활성 탭: 축소 안 함, maxWidth 유지하여 말줄임 처리
          "data-[state=active]:flex-shrink-0",
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
        <span className="truncate min-w-0">
          {children}
        </span>
        {closable && (
          <span
            onPointerDown={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
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
      <PortalTooltip targetRef={triggerRef} show={isHovering}>
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
  /** 오른쪽 탭 닫기 핸들러 */
  onCloseTabsToRight?: () => void
  /** 다른 탭 닫기 핸들러 */
  onCloseOtherTabs?: () => void
}

/** 드래그 앤 드롭 가능한 탭 트리거 */
const SortableTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  SortableTabsTriggerProps
>(({ id, className, closable, onClose, onCloseTabsToRight, onCloseOtherTabs, children, onKeyDown, maxWidth = 120, minWidth = 60, ...props }, ref) => {
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

  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
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

  // TabsContent 없이 사용할 때 (네비게이션/필터 용도) aria-controls 제거
  React.useEffect(() => {
    const el = triggerRef.current
    if (el) {
      const target = el.getAttribute("aria-controls")
      if (target && !document.getElementById(target)) {
        el.removeAttribute("aria-controls")
      }
    }
  }, [])

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
  }

  // 컨텍스트 메뉴 표시 여부 (closable이면서 핸들러가 있을 때만)
  const hasContextMenu = closable && (onClose || onCloseTabsToRight || onCloseOtherTabs)
  const [contextMenuOpen, setContextMenuOpen] = React.useState(false)
  const [contextMenuPosition, setContextMenuPosition] = React.useState({ x: 0, y: 0 })

  const handleContextMenu = (e: React.MouseEvent) => {
    if (!hasContextMenu) return
    e.preventDefault()
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
    setContextMenuOpen(true)
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
          "border border-b-0 border-border", // 모든 탭에 테두리 표시
          // 비활성 탭: 축소 가능, minWidth/maxWidth 적용
          "data-[state=inactive]:flex-shrink",
          minWidthClasses[minWidth],
          maxWidthClasses[maxWidth],
          // 활성 탭: 축소 안 함, maxWidth 유지하여 말줄임 처리
          "data-[state=active]:flex-shrink-0",
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
        onContextMenu={handleContextMenu}
        {...sortableAttributes}
        {...listeners}
        {...props}
      >
        <span className="truncate min-w-0">
          {children}
        </span>
        {closable && (
          <span
            onPointerDown={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
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
      <PortalTooltip targetRef={triggerRef} show={isHovering && !isDragging}>
        {children}
      </PortalTooltip>
      {hasContextMenu && contextMenuOpen && (
        <TabContextMenu
          position={contextMenuPosition}
          onClose={() => setContextMenuOpen(false)}
          onCloseTab={onClose}
          onCloseTabsToRight={onCloseTabsToRight}
          onCloseOtherTabs={onCloseOtherTabs}
        />
      )}
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
