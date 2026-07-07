import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { cn } from "@/lib/utils"
import { DragHandleIcon } from "@/icons"

interface SortableHeaderCellProps {
  id: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

/**
 * 드래그 가능한 헤더 셀 wrapper.
 * - 좌측에 drag handle 아이콘 (항상 30% opacity, hover 시 70%)
 * - 드래그 중에는 opacity 하락 + transform 이동 피드백
 */
export function DataTableV2SortableHeaderCell({
  id,
  disabled,
  className,
  style,
  children,
}: SortableHeaderCellProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled })

  const combinedStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      role="columnheader"
      style={combinedStyle}
      className={cn("group/drag gap-0.5", className)}
    >
      <div
        aria-label="컬럼 순서 변경"
        className="flex-shrink-0 flex items-center cursor-grab active:cursor-grabbing opacity-30 group-hover/drag:opacity-70 transition-opacity"
        {...attributes}
        {...listeners}
      >
        <DragHandleIcon size={16} />
      </div>
      {children}
    </div>
  )
}
