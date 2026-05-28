import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { cn } from "@/lib/utils"
import { DragHandleIcon } from "@/icons"

interface SortableHeaderCellProps {
  id: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}

export function SortableHeaderCell({
  id,
  children,
  className,
  style,
  disabled,
}: SortableHeaderCellProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled })

  const dragStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: disabled ? undefined : "grab",
  }

  return (
    <th
      ref={setNodeRef}
      style={dragStyle}
      className={cn(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-600 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        isDragging && "z-50",
        className
      )}
      {...attributes}
      {...listeners}
    >
      <span className="flex items-center gap-0.5">
        <DragHandleIcon
          size={16}
          className="opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
        />
        {children}
      </span>
    </th>
  )
}
