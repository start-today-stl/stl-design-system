import * as React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { RectangleProps } from "recharts"

import { cn } from "@/lib/utils"
import { ChartLegend, type ChartLegendItem } from "./chart-legend"

export interface StackBarSeries {
  /** 시리즈 data 필드 key */
  dataKey: string
  /** 색상 (지정 안 하면 기본 팔레트 사용) */
  color?: string
  /** 툴팁 / 범례에 표시할 이름 (지정 안 하면 dataKey 사용) */
  name?: string
}

export interface StackBarChartProps<T extends Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 차트 데이터 */
  data: T[]
  /** 카테고리 축 key (세로: X, 가로: Y) */
  xKey: keyof T & string
  /** 시리즈 정의 (누적할 segment 들) */
  bars: StackBarSeries[]
  /** 바 방향. vertical = 세로 (기본), horizontal = 가로 */
  orientation?: "vertical" | "horizontal"
  /** 차트 높이 */
  height?: number | `${number}%`
  /** 그라디언트 채움 (기본 ON) */
  gradient?: boolean
  /** 바 코너 라운드 px (보이는 segment 의 첫/마지막에만 적용, 기본 0) */
  barRadius?: number
  /** 툴팁 라벨 */
  tooltipLabel?: React.ReactNode
  /** 툴팁 값 포맷터 (시리즈별) */
  tooltipFormatter?: (value: number, series: StackBarSeries, payload: Record<string, unknown>) => React.ReactNode
  /** 카테고리 축 표시 */
  showXAxis?: boolean
  /** 값 축 표시 */
  showYAxis?: boolean
  /** 그리드 표시 */
  showGrid?: boolean
  /** 범례 (entry 배열, color 생략 시 시리즈 색 자동 매칭) */
  legend?: ChartLegendItem[]
}

const DEFAULT_PALETTE = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
]

const GRID_STROKE = "var(--color-border)"
const AXIS_STROKE = "var(--color-muted-foreground)"
const TEXT_COLOR = "var(--color-muted-foreground)"

const STACK_ID = "stack"

/**
 * 보이는 segment 의 첫/마지막에만 코너 라운드를 적용하는 shape factory.
 * 값이 0 인 segment 는 "안 보임" 으로 간주.
 */
const makeStackShape =
  (
    currentKey: string,
    seriesKeys: string[],
    radius: number,
    isHorizontal: boolean
  ) =>
  (props: RectangleProps & { payload?: unknown }) => {
    const payload = props.payload as Record<string, number> | undefined
    const visibleKeys = seriesKeys.filter((k) => Number(payload?.[k] ?? 0) > 0)
    const isFirst = visibleKeys[0] === currentKey
    const isLast = visibleKeys[visibleKeys.length - 1] === currentKey
    const cornerRadius = isHorizontal
      ? [
          isFirst ? radius : 0, // top-left
          isLast ? radius : 0, // top-right
          isLast ? radius : 0, // bottom-right
          isFirst ? radius : 0, // bottom-left
        ]
      : [
          isLast ? radius : 0, // top-left
          isLast ? radius : 0, // top-right
          isFirst ? radius : 0, // bottom-right
          isFirst ? radius : 0, // bottom-left
        ]
    return <Rectangle {...props} radius={cornerRadius as never} />
  }

export function StackBarChart<T extends Record<string, unknown>>({
  data,
  xKey,
  bars,
  orientation = "vertical",
  height = 240,
  gradient = true,
  barRadius = 0,
  tooltipLabel,
  tooltipFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  legend,
  className,
  ...props
}: StackBarChartProps<T>) {
  const baseGradientId = React.useId()
  const isHorizontal = orientation === "horizontal"

  // 시리즈 색상 해석 (미지정 시 팔레트)
  const resolvedBars = React.useMemo(
    () =>
      bars.map((bar, i) => ({
        ...bar,
        color: bar.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length],
      })),
    [bars]
  )

  const gradientIdFor = (key: string) => `${baseGradientId}-${key}`

  // legend item 색 자동 매칭 (시리즈 색 순서)
  const resolvedLegend = React.useMemo<ChartLegendItem[] | undefined>(() => {
    if (!legend?.length) return undefined
    return legend.map((item, i) => ({
      label: item.label,
      color: item.color ?? resolvedBars[i]?.color,
    }))
  }, [legend, resolvedBars])

  const seriesKeys = resolvedBars.map((b) => b.dataKey)

  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4",
        className
      )}
      {...props}
    >
      {resolvedLegend && <ChartLegend items={resolvedLegend} />}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={isHorizontal ? "vertical" : "horizontal"}
          margin={{ top: 12, right: 12, left: -8, bottom: 0 }}
        >
          {gradient && (
            <defs>
              {resolvedBars.map((bar) => (
                <linearGradient
                  key={bar.dataKey}
                  id={gradientIdFor(bar.dataKey)}
                  x1="0"
                  y1="0"
                  x2={isHorizontal ? "1" : "0"}
                  y2={isHorizontal ? "0" : "1"}
                >
                  <stop offset="0%" stopColor={bar.color} stopOpacity={isHorizontal ? 0.2 : 0.9} />
                  <stop offset="100%" stopColor={bar.color} stopOpacity={isHorizontal ? 0.9 : 0.2} />
                </linearGradient>
              ))}
            </defs>
          )}
          {showGrid && (
            <CartesianGrid
              stroke={GRID_STROKE}
              strokeDasharray="0"
              horizontal={!isHorizontal}
              vertical={isHorizontal}
            />
          )}
          {showXAxis && (
            <XAxis
              type={isHorizontal ? "number" : "category"}
              dataKey={(isHorizontal ? undefined : xKey) as never}
              stroke={AXIS_STROKE}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: TEXT_COLOR }}
            />
          )}
          {showYAxis && (
            <YAxis
              type={isHorizontal ? "category" : "number"}
              dataKey={(isHorizontal ? xKey : undefined) as never}
              stroke={AXIS_STROKE}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: TEXT_COLOR }}
              width={isHorizontal ? 64 : 32}
            />
          )}
          <Tooltip
            cursor={{ fill: "var(--color-muted)", opacity: 0.5 }}
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
                      const series = resolvedBars.find((b) => b.dataKey === item.dataKey)
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
                          {series.name && (
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
          {resolvedBars.map((series) => (
            <Bar
              key={series.dataKey}
              dataKey={series.dataKey as never}
              stackId={STACK_ID}
              fill={gradient ? `url(#${gradientIdFor(series.dataKey)})` : series.color}
              name={series.name ?? series.dataKey}
              shape={
                barRadius > 0
                  ? makeStackShape(series.dataKey, seriesKeys, barRadius, isHorizontal)
                  : undefined
              }
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
