import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { RightIcon } from "@/icons"

// ============================================================================
// Tree
// ============================================================================

export interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {}

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tree"
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Tree.displayName = "Tree"

// ============================================================================
// TreeItem
// ============================================================================

export interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 아이템 아이콘 */
  icon?: React.ReactNode
  /** 아이템 라벨 */
  label: string
  /** 선택 상태 */
  selected?: boolean
  /** 펼침 상태 (controlled) */
  expanded?: boolean
  /** 기본 펼침 상태 (uncontrolled) */
  defaultExpanded?: boolean
  /** 선택 핸들러 */
  onSelect?: () => void
  /** 펼침 상태 변경 핸들러 */
  onExpandedChange?: (expanded: boolean) => void
  /** 호버/선택 시 표시될 액션 버튼 */
  actions?: React.ReactNode
  /** 들여쓰기 깊이 (내부용) */
  depth?: number
}

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      className,
      icon,
      label,
      selected = false,
      expanded: controlledExpanded,
      defaultExpanded = false,
      onSelect,
      onExpandedChange,
      actions,
      depth = 0,
      children,
      ...props
    },
    ref
  ) => {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
    const hasChildren = React.Children.count(children) > 0

    // controlled vs uncontrolled
    const isControlled = controlledExpanded !== undefined
    const expanded = isControlled ? controlledExpanded : internalExpanded

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation()
      const newValue = !expanded
      if (!isControlled) {
        setInternalExpanded(newValue)
      }
      onExpandedChange?.(newValue)
    }

    const handleSelect = () => {
      onSelect?.()
    }

    // children에 depth 전달
    const childrenWithDepth = React.Children.map(children, (child) => {
      if (React.isValidElement<TreeItemProps>(child)) {
        return React.cloneElement(child, { depth: depth + 1 })
      }
      return child
    })

    return (
      <div ref={ref} role="treeitem" aria-expanded={hasChildren ? expanded : undefined} {...props}>
        {/* 아이템 행 */}
        <div
          className={cn(
            "group flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg",
            "transition-colors",
            selected
              ? "bg-accent text-primary"
              : "hover:bg-muted",
            className
          )}
          style={{ paddingLeft: `${12 + depth * 20}px` }}
          onClick={handleSelect}
        >
          {/* 펼치기/접기 버튼 */}
          {hasChildren ? (
            <button
              type="button"
              className={cn(
                "flex-shrink-0 p-0.5 rounded hover:bg-muted",
                "transition-transform",
                expanded && "rotate-90"
              )}
              onClick={handleToggle}
              aria-label={expanded ? "접기" : "펼치기"}
            >
              <RightIcon size={16} className="text-muted-foreground" />
            </button>
          ) : (
            <span className="w-5 flex-shrink-0" /> // placeholder for alignment
          )}

          {/* 아이콘 */}
          {icon && (
            <span className="flex-shrink-0 text-muted-foreground">{icon}</span>
          )}

          {/* 라벨 */}
          <span className="flex-1 truncate text-sm font-medium">{label}</span>

          {/* 액션 버튼 */}
          {actions && (
            <div
              className={cn(
                "flex items-center gap-1 flex-shrink-0",
                "opacity-0 group-hover:opacity-100",
                selected && "opacity-100"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {actions}
            </div>
          )}
        </div>

        {/* 하위 아이템 */}
        {hasChildren && expanded && (
          <div role="group">{childrenWithDepth}</div>
        )}
      </div>
    )
  }
)
TreeItem.displayName = "TreeItem"

export { Tree, TreeItem }
