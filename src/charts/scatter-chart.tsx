import * as React from "react"
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"

import { cn } from "@/lib/utils"
import { ChartLegend, type ChartLegendItem } from "./chart-legend"

export interface ScatterChartPoint {
  x: number
  y: number
  /** 이름 (툴팁 표시용, 선택) */
  name?: string
}

export interface ScatterChartSeries {
  /** 표시명 (범례 / 툴팁) */
  name: string
  /** 데이터 포인트 배열 */
  data: ScatterChartPoint[]
  /** 색상 (지정 안 하면 기본 팔레트) */
  color?: string
}

export interface ScatterChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  /** 차트 타이틀 (좌상단) */
  title?: React.ReactNode
  /** 시리즈 배열 (다중 시리즈 지원) */
  series: ScatterChartSeries[]
  /** 차트 높이 (px, 기본 280) */
  height?: number
  /** 점 크기 (기본 8) */
  pointSize?: number
  /** 호버 시 점 크기 (기본 16) */
  activePointSize?: number
  /** 기본 점 색상 (지정 안 하면 회색 slate-400) — series.color 는 활성/범례에 사용 */
  pointColor?: string
  /** X축 도메인 (생략 시 자동) */
  xDomain?: [number | "auto", number | "auto"]
  /** Y축 도메인 (생략 시 자동) */
  yDomain?: [number | "auto", number | "auto"]
  /** X축 라벨 포맷터 */
  xTickFormatter?: (value: number) => string
  /** Y축 라벨 포맷터 */
  yTickFormatter?: (value: number) => string
  /** X축 표시 (기본 true) */
  showXAxis?: boolean
  /** Y축 표시 (기본 true) */
  showYAxis?: boolean
  /** 그리드 표시 (기본 true) */
  showGrid?: boolean
  /** 추세선 표시 (기본 true) — y = x 대각선 참조선 */
  trendLine?: boolean
  /** 추세선 시작점 (기본 [xDomain.min, yDomain.min]) */
  trendLineFrom?: { x: number; y: number }
  /** 추세선 끝점 (기본 [xDomain.max, yDomain.max]) */
  trendLineTo?: { x: number; y: number }
  /** 범례 (생략 시 series 정보로 자동 생성, 단일 시리즈면 미표시) */
  legend?: ChartLegendItem[]
  /** 툴팁 라벨 (포맷터 우선) */
  tooltipLabel?: React.ReactNode
  /** 툴팁 포맷터 — point 와 series name 받아서 ReactNode 반환 */
  tooltipFormatter?: (point: ScatterChartPoint, seriesName: string) => React.ReactNode
}

const DEFAULT_PALETTE = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)",
]

const GRID_STROKE = "var(--color-border)" // 자동 전환: slate-200 (light) / slate-700 (dark)
const AXIS_STROKE = "var(--color-border)"
const TEXT_COLOR = "var(--color-muted-foreground)"

export function ScatterChart({
  title,
  series,
  height = 280,
  pointSize = 8,
  activePointSize = 16,
  pointColor,
  xDomain,
  yDomain,
  xTickFormatter,
  yTickFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  trendLine = true,
  trendLineFrom,
  trendLineTo,
  legend,
  tooltipLabel,
  tooltipFormatter,
  className,
  ...props
}: ScatterChartProps) {
  // 색상 해석 (미지정 시 팔레트)
  const resolvedSeries = React.useMemo(
    () =>
      series.map((s, i) => ({
        ...s,
        color: s.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length],
      })),
    [series]
  )

  // 자동 범례 (다중 시리즈만)
  const resolvedLegend = React.useMemo<ChartLegendItem[] | undefined>(() => {
    if (legend) {
      return legend.map((item, i) => ({
        label: item.label,
        color: item.color ?? resolvedSeries[i]?.color,
      }))
    }
    if (resolvedSeries.length <= 1) return undefined
    return resolvedSeries.map((s) => ({ label: s.name, color: s.color }))
  }, [legend, resolvedSeries])

  // 추세선 기본값 계산 (xDomain/yDomain 미지정 시 데이터에서 산정)
  const allPoints = React.useMemo(
    () => resolvedSeries.flatMap((s) => s.data),
    [resolvedSeries]
  )
  const dataMinX = allPoints.length ? Math.min(...allPoints.map((p) => p.x)) : 0
  const dataMaxX = allPoints.length ? Math.max(...allPoints.map((p) => p.x)) : 1
  const dataMinY = allPoints.length ? Math.min(...allPoints.map((p) => p.y)) : 0
  const dataMaxY = allPoints.length ? Math.max(...allPoints.map((p) => p.y)) : 1
  // 추세선 기본값: (0, 0) → (xMax, yMax) (피그마 매칭, 차트 좌하단 → 우상단 대각선)
  const trendFrom = trendLineFrom ?? { x: 0, y: 0 }
  const trendTo = trendLineTo ?? { x: dataMaxX, y: dataMaxY }
  // unused dataMin warnings
  void dataMinX
  void dataMinY

  // gradient id (다중 시리즈 대응)
  const gradientIdPrefix = React.useId()
  const activeGradientIds = resolvedSeries.map(
    (_, i) => `${gradientIdPrefix}-scatter-active-${i}`
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
      {resolvedLegend && <ChartLegend items={resolvedLegend} />}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsScatterChart margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
          <defs>
            {resolvedSeries.map((s, i) => (
              <linearGradient
                key={activeGradientIds[i]}
                id={activeGradientIds[i]}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={s.color} />
                <stop offset="100%" stopColor="var(--color-blue-200)" />
              </linearGradient>
            ))}
          </defs>
          {showGrid && (
            <CartesianGrid
              stroke={GRID_STROKE}
              strokeDasharray="0"
              strokeWidth={0.5}
            />
          )}
          {showXAxis && (
            <XAxis
              type="number"
              dataKey="x"
              domain={xDomain}
              stroke={AXIS_STROKE}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: TEXT_COLOR }}
              tickFormatter={xTickFormatter}
            />
          )}
          {showYAxis && (
            <YAxis
              type="number"
              dataKey="y"
              domain={yDomain}
              stroke={AXIS_STROKE}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: TEXT_COLOR }}
              tickFormatter={yTickFormatter}
              width={40}
            />
          )}
          {/* ZAxis 로 점 크기 통제 (range 로 기본/활성 크기) */}
          <ZAxis type="number" range={[pointSize * pointSize, pointSize * pointSize]} />
          <Tooltip
            cursor={{ stroke: "transparent" }}
            isAnimationActive={false}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const entry = payload[0]
              const point = entry.payload as ScatterChartPoint
              const seriesName = (entry.name as string) ?? ""
              return (
                <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md">
                  {tooltipLabel && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {tooltipLabel}
                    </div>
                  )}
                  {tooltipFormatter ? (
                    <div className="text-sm text-slate-700 dark:text-slate-100">
                      {tooltipFormatter(point, seriesName)}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0.5 text-sm text-slate-700 dark:text-slate-100">
                      {resolvedSeries.length > 1 && (
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {seriesName}
                        </div>
                      )}
                      {point.name && (
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {point.name}
                        </div>
                      )}
                      <div className="flex gap-3 font-medium">
                        <span>
                          <span className="text-slate-500 dark:text-slate-400 mr-1">x:</span>
                          {xTickFormatter ? xTickFormatter(point.x) : point.x}
                        </span>
                        <span>
                          <span className="text-slate-500 dark:text-slate-400 mr-1">y:</span>
                          {yTickFormatter ? yTickFormatter(point.y) : point.y}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            }}
          />
          {trendLine && (
            <ReferenceLine
              ifOverflow="extendDomain"
              segment={[trendFrom, trendTo]}
              stroke="var(--color-border)"
              strokeWidth={0.5}
            />
          )}
          {resolvedSeries.map((s, i) => {
            // muted-foreground: light=slate-500 / dark=slate-400 (다크에서도 가시성 확보)
            const restColor = pointColor ?? "var(--color-muted-foreground)"
            return (
              <Scatter
                key={s.name}
                name={s.name}
                data={s.data}
                fill={restColor}
                shape={(props: unknown) => {
                  const { cx, cy } = props as { cx?: number; cy?: number }
                  if (cx === undefined || cy === undefined) return <g />
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={pointSize / 2}
                      fill={restColor}
                      fillOpacity={0.5}
                    />
                  )
                }}
                activeShape={(props: unknown) => {
                  const { cx, cy } = props as { cx?: number; cy?: number }
                  if (cx === undefined || cy === undefined) return <g />
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={activePointSize / 2}
                      fill={`url(#${activeGradientIds[i]})`}
                    />
                  )
                }}
              />
            )
          })}
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
