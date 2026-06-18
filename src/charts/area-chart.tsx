import * as React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

export interface AreaChartTooltipPayload {
  value: number
  name?: string
  payload: Record<string, unknown>
}

export interface AreaChartProps<T extends Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 차트 데이터 */
  data: T[]
  /** X 축 key (data 의 필드명) */
  xKey: keyof T & string
  /** Y 축 key (data 의 필드명) */
  yKey: keyof T & string
  /** 차트 높이 (px 또는 백분율 문자열, 예: "100%") */
  height?: number | `${number}%`
  /** 툴팁 라벨 (선택) */
  tooltipLabel?: React.ReactNode
  /** 툴팁 값 포맷터 */
  tooltipFormatter?: (value: number, payload: Record<string, unknown>) => React.ReactNode
  /** X 축 표시 여부 */
  showXAxis?: boolean
  /** Y 축 표시 여부 */
  showYAxis?: boolean
  /** 가로 그리드 표시 여부 */
  showGrid?: boolean
  /** 데이터 포인트 dot 표시 여부 */
  showDots?: boolean
  /** 선 보간 방식 (기본 linear — 점과 점을 직선 연결) */
  curveType?: "linear" | "monotone" | "step" | "natural"
  /** 선 / 도트 / 영역 색상 (기본 var(--color-primary), 토큰 사용 권장) */
  color?: string
}

// semantic 토큰 사용 — 라이트/다크 자동 전환
const DEFAULT_COLOR = "var(--color-primary)"
const GRID_STROKE = "var(--color-border)"
const AXIS_STROKE = "var(--color-muted-foreground)"
const TEXT_COLOR = "var(--color-muted-foreground)"

export function AreaChart<T extends Record<string, unknown>>({
  data,
  xKey,
  yKey,
  height = 240,
  tooltipLabel,
  tooltipFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showDots = true,
  curveType = "linear",
  color = DEFAULT_COLOR,
  className,
  ...props
}: AreaChartProps<T>) {
  const gradientId = React.useId()

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
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0.04} />
            </linearGradient>
          </defs>
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
            cursor={{ stroke: color, strokeWidth: 1 }}
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
          <Area
            type={curveType}
            dataKey={yKey as never}
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={
              showDots
                ? {
                    r: 3,
                    fill: color,
                    stroke: "none",
                    strokeWidth: 0,
                    fillOpacity: 1,
                  }
                : false
            }
            activeDot={{ r: 5, fill: color, stroke: "none", strokeWidth: 0, fillOpacity: 1 }}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}
