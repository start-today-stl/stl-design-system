import * as React from "react"

import { cn } from "@/lib/utils"
import type { DataTableV2Column } from "./types"

interface DataTableV2RowProps<T extends { id: string | number }> {
  row: T
  columns: DataTableV2Column<T>[]
  gridTemplateColumns: string
  translateY: number
  onHeightChange: (id: T["id"], height: number) => void
}

const alignClass = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
}

function DataTableV2RowInner<T extends { id: string | number }>({
  row,
  columns,
  gridTemplateColumns,
  translateY,
  onHeightChange,
}: DataTableV2RowProps<T>) {
  const rowRef = React.useRef<HTMLDivElement>(null)

  // 실제 렌더된 높이를 부모로 보고. 초기 마운트 + 크기 변화 시 트리거.
  React.useLayoutEffect(() => {
    const el = rowRef.current
    if (!el) return
    const report = () => onHeightChange(row.id, el.offsetHeight)
    report()
    const observer = new ResizeObserver(report)
    observer.observe(el)
    return () => observer.disconnect()
    // row.id 만 dependency — onHeightChange 는 안정적이라고 가정 (부모에서 useCallback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row.id])

  return (
    <div
      ref={rowRef}
      role="row"
      className="absolute left-0 right-0 top-0 grid border-b border-slate-100 dark:border-slate-700"
      style={{
        gridTemplateColumns,
        transform: `translate3d(0, ${Math.round(translateY)}px, 0)`,
      }}
    >
      {columns.map((col) => {
        const colId = col.id ?? String(col.accessorKey)
        const value = row[col.accessorKey]
        const rendered = col.cell ? col.cell(value, row) : (value as React.ReactNode)
        return (
          <div
            key={colId}
            role="gridcell"
            className={cn(
              "flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-200",
              alignClass[col.align ?? "left"]
            )}
          >
            {rendered}
          </div>
        )
      })}
    </div>
  )
}

/**
 * 행 컴포넌트.
 * - position absolute + translate3d(0, Math.round(y), 0) 로 sub-pixel 제거
 * - ResizeObserver 로 실제 높이 부모에 보고 → 부모가 다음 행 위치 재계산
 */
export const DataTableV2Row = React.memo(DataTableV2RowInner) as typeof DataTableV2RowInner
