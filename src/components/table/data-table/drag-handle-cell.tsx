import { cn } from "@/lib/utils"
import { DragHandleIcon } from "@/icons"
import { DRAG_HANDLE_WIDTH, type DragHandleProps } from "./types"

interface DragHandleCellProps {
  isSelected?: boolean
  hasLeftStickyColumns?: boolean
  dragHandleProps?: DragHandleProps
}

export function DragHandleCell({
  isSelected,
  hasLeftStickyColumns,
  dragHandleProps,
}: DragHandleCellProps) {
  const { listeners, attributes, setActivatorNodeRef } = dragHandleProps ?? {}

  return (
    <td
      className={cn(
        "p-0 align-middle",
        hasLeftStickyColumns && (isSelected
          ? "transition-colors bg-blue-50 dark:bg-blue-900"
          : "transition-colors bg-slate-100 dark:bg-slate-800"
        )
      )}
      style={hasLeftStickyColumns ? {
        position: "sticky",
        left: 0,
        zIndex: 10,
        width: `${DRAG_HANDLE_WIDTH}px`,
        minWidth: `${DRAG_HANDLE_WIDTH}px`,
        maxWidth: `${DRAG_HANDLE_WIDTH}px`,
      } : {
        width: `${DRAG_HANDLE_WIDTH}px`,
        minWidth: `${DRAG_HANDLE_WIDTH}px`,
        maxWidth: `${DRAG_HANDLE_WIDTH}px`,
      }}
    >
      <div
        ref={setActivatorNodeRef}
        className="flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
        aria-label="행 순서 변경"
        {...listeners}
        {...attributes}
      >
        <DragHandleIcon size={16} />
      </div>
    </td>
  )
}
