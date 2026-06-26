import * as React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"
import { ChartLegend, type ChartLegendItem } from "./chart-legend"

export interface BarChartProps<T extends Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  /** 차트 타이틀 (좌상단) */
  title?: React.ReactNode
  /** 차트 데이터 */
  data: T[]
  /** 카테고리 축 key (세로 바: X, 가로 바: Y) */
  xKey: keyof T & string
  /** 값 축 key (세로 바: Y, 가로 바: X) */
  yKey: keyof T & string
  /** 바 방향. vertical = 세로 (기본), horizontal = 가로 */
  orientation?: "vertical" | "horizontal"
  /** 차트 높이 */
  height?: number | `${number}%`
  /** 단일 색상 (colorBy 없을 때) */
  color?: string
  /** 데이터 row 마다 색 지정 (예: 연도별 다른 색) */
  colorBy?: (row: T, index: number) => string
  /** 그라디언트 채움 (기본 ON) */
  gradient?: boolean
  /** 가장 큰 값 강조 (살짝 진한 색) */
  highlightMax?: boolean
  /** 툴팁 라벨 */
  tooltipLabel?: React.ReactNode
  /** 툴팁 값 포맷터 */
  tooltipFormatter?: (value: number, payload: Record<string, unknown>) => React.ReactNode
  /** 카테고리 축 표시 */
  showXAxis?: boolean
  /** 값 축 표시 */
  showYAxis?: boolean
  /** 그리드 표시 */
  showGrid?: boolean
  /** 바 코너 라운드 px (기본 0 — 직각) */
  barRadius?: number
  /** 차트 우측 상단 범례 (entry 배열) */
  legend?: ChartLegendItem[]
}

const DEFAULT_COLOR = "var(--color-primary)"
const GRID_STROKE = "var(--color-border)"
const AXIS_STROKE = "var(--color-muted-foreground)"
const TEXT_COLOR = "var(--color-muted-foreground)"

export function BarChart<T extends Record<string, unknown>>({
  title,
  data,
  xKey,
  yKey,
  orientation = "vertical",
  height = 240,
  color = DEFAULT_COLOR,
  colorBy,
  gradient = true,
  highlightMax = false,
  tooltipLabel,
  tooltipFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  barRadius = 0,
  legend,
  className,
  ...props
}: BarChartProps<T>) {
  const baseGradientId = React.useId()
  const isHorizontal = orientation === "horizontal"

  // highlightMax: 최댓값 인덱스 계산
  const maxIndex = React.useMemo(() => {
    if (!highlightMax) return -1
    let max = -Infinity
    let idx = -1
    data.forEach((row, i) => {
      const v = Number(row[yKey])
      if (Number.isFinite(v) && v > max) {
        max = v
        idx = i
      }
    })
    return idx
  }, [data, yKey, highlightMax])

  // 각 셀에 적용될 raw 색 (그라디언트 처리 전)
  const resolveRawColor = (row: T, index: number): string => {
    if (colorBy) return colorBy(row, index)
    return color
  }

  // 사용된 unique 색 목록 (gradient 정의용)
  const uniqueColors = React.useMemo(() => {
    const set = new Set<string>()
    data.forEach((row, i) => set.add(resolveRawColor(row, i)))
    return Array.from(set)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, color, colorBy])

  // raw 색 → gradient ID 매핑
  const gradientIdFor = (rawColor: string) => `${baseGradientId}-${uniqueColors.indexOf(rawColor)}`

  const resolveCellFill = (row: T, index: number) => {
    const raw = resolveRawColor(row, index)
    if (highlightMax && index === maxIndex) return raw
    return gradient ? `url(#${gradientIdFor(raw)})` : raw
  }

  // legend item 의 color 가 비어있으면 colorBy unique 색 순서대로 자동 매칭
  const resolvedLegend = React.useMemo<ChartLegendItem[] | undefined>(() => {
    if (!legend?.length) return undefined
    return legend.map((item, i) => ({
      label: item.label,
      color: item.color ?? uniqueColors[i] ?? color,
    }))
  }, [legend, uniqueColors, color])

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
      {resolvedLegend && <ChartLegend items={resolvedLegend} />}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={isHorizontal ? "vertical" : "horizontal"}
          margin={{ top: 12, right: 12, left: -8, bottom: 0 }}
        >
          {gradient && (
            <defs>
              {uniqueColors.map((c) => (
                <linearGradient
                  key={c}
                  id={gradientIdFor(c)}
                  x1="0"
                  y1="0"
                  x2={isHorizontal ? "1" : "0"}
                  y2={isHorizontal ? "0" : "1"}
                >
                  <stop offset="0%" stopColor={c} stopOpacity={isHorizontal ? 0.2 : 0.9} />
                  <stop offset="100%" stopColor={c} stopOpacity={isHorizontal ? 0.9 : 0.2} />
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
              const datum = payload[0]
              const value = datum.value as number
              const raw = datum.payload as Record<string, unknown>
              return (
                <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md">
                  {tooltipLabel && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">{tooltipLabel}</div>
                  )}
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-100">
                    {tooltipFormatter ? tooltipFormatter(value, raw) : value}
                  </div>
                </div>
              )
            }}
          />
          <Bar
            dataKey={yKey as never}
            radius={
              isHorizontal
                ? [0, barRadius, barRadius, 0]
                : [barRadius, barRadius, 0, 0]
            }
            isAnimationActive
          >
            {data.map((row, index) => (
              <Cell key={`cell-${index}`} fill={resolveCellFill(row, index)} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
