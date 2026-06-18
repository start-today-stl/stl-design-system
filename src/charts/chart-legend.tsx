import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChartLegendItem {
  /** 범례 마커 색상 — 생략 시 차트에서 자동 매칭 */
  color?: string
  /** 범례 라벨 */
  label: React.ReactNode
}

export interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ChartLegendItem[]
}

/** 차트 우측 상단 범례 — 차트 컴포넌트 내부에서 사용 */
export const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ items, className, ...props }, ref) => {
    if (!items?.length) return null
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center justify-end gap-4 px-2 py-1",
          className
        )}
        {...props}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300"
          >
            <span
              aria-hidden
              className="size-2 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    )
  }
)
ChartLegend.displayName = "ChartLegend"
