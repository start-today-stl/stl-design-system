import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

export interface LineSeries {
  /** 시리즈가 참조할 data 필드 key */
  dataKey: string
  /** 선 / 도트 색상 (지정 안 하면 기본 팔레트 사용) */
  color?: string
  /** 툴팁에 표시할 이름 (지정 안 하면 dataKey 사용) */
  name?: string
}

export interface LineChartProps<T extends Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  /** 차트 타이틀 (좌상단) */
  title?: React.ReactNode
  /** 차트 데이터 */
  data: T[]
  /** X 축 key (data 의 필드명) */
  xKey: keyof T & string
  /** 시리즈 정의 (여러 라인 지원) */
  lines: LineSeries[]
  /** 차트 높이 */
  height?: number | `${number}%`
  /** 툴팁 라벨 (선택) */
  tooltipLabel?: React.ReactNode
  /** 툴팁 값 포맷터 */
  tooltipFormatter?: (value: number, series: LineSeries, payload: Record<string, unknown>) => React.ReactNode
  /** X 축 표시 여부 */
  showXAxis?: boolean
  /** Y 축 표시 여부 */
  showYAxis?: boolean
  /** 가로 그리드 표시 여부 */
  showGrid?: boolean
  /** 데이터 포인트 dot 표시 여부 */
  showDots?: boolean
  /** 선 보간 방식 (기본 linear) */
  curveType?: "linear" | "monotone" | "step" | "natural"
}

// 기본 팔레트 — 시리즈 색상 미지정 시 순서대로 할당
const DEFAULT_PALETTE = [
  "var(--color-primary)",
  "var(--color-muted-foreground)",
  "var(--color-green-500)",
  "var(--color-red-500)",
]

const GRID_STROKE = "var(--color-border)"
const AXIS_STROKE = "var(--color-muted-foreground)"
const TEXT_COLOR = "var(--color-muted-foreground)"
const CURSOR_STROKE = "var(--color-primary)"

export function LineChart<T extends Record<string, unknown>>({
  title,
  data,
  xKey,
  lines,
  height = 240,
  tooltipLabel,
  tooltipFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showDots = true,
  curveType = "linear",
  className,
  ...props
}: LineChartProps<T>) {
  const resolvedLines = React.useMemo<Array<Required<Pick<LineSeries, "dataKey" | "color">> & LineSeries>>(
    () =>
      lines.map((line, index) => ({
        ...line,
        color: line.color ?? DEFAULT_PALETTE[index % DEFAULT_PALETTE.length],
      })),
    [lines]
  )

  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-3",
        className
      )}
      {...props}
    >
      {title && (
        <div className="text-sm font-medium text-slate-700 dark:text-slate-100">
          {title}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
          {showGrid && (
            <CartesianGrid
              stroke={GRID_STROKE}
              strokeDasharray="0"
              horizontal
              vertical={false}
            />
          )}
          {showXAxis && (
            <XAxis
              dataKey={xKey as never}
              stroke={AXIS_STROKE}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: TEXT_COLOR }}
            />
          )}
          {showYAxis && (
            <YAxis
              stroke={AXIS_STROKE}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: TEXT_COLOR }}
              width={32}
            />
          )}
          <Tooltip
            cursor={{ stroke: CURSOR_STROKE, strokeWidth: 1 }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const raw = (payload[0]?.payload ?? {}) as Record<string, unknown>
              return (
                <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md">
                  {tooltipLabel && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">{tooltipLabel}</div>
                  )}
                  <div className="flex flex-col gap-1">
                    {payload.map((item) => {
                      const series = resolvedLines.find((l) => l.dataKey === item.dataKey)
                      if (!series) return null
                      const value = item.value as number
                      return (
                        <div
                          key={String(item.dataKey)}
                          className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100"
                        >
                          <span
                            aria-hidden
                            className="size-2 rounded-full shrink-0"
                            style={{ backgroundColor: series.color }}
                          />
                          {payload.length > 1 && series.name && (
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {series.name}
                            </span>
                          )}
                          <span className="font-medium">
                            {tooltipFormatter ? tooltipFormatter(value, series, raw) : value}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }}
          />
          {resolvedLines.map((series) => (
            <Line
              key={series.dataKey}
              type={curveType}
              dataKey={series.dataKey as never}
              stroke={series.color}
              strokeWidth={2}
              dot={
                showDots
                  ? {
                      r: 3,
                      fill: series.color,
                      stroke: "none",
                      strokeWidth: 0,
                    }
                  : false
              }
              activeDot={{ r: 5, fill: series.color, stroke: "none", strokeWidth: 0 }}
              name={series.name ?? series.dataKey}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
