import * as React from "react"
import {
  Cell,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import { cn } from "@/lib/utils"
import { ChartLegend, type ChartLegendItem } from "./chart-legend"

export interface RadialChartItem {
  /** 카테고리 이름 (범례 / 툴팁 표시) */
  name: string
  /** 값 (0 ~ max, 기본 max = 100) */
  value: number
  /** 색상 (지정 안 하면 기본 팔레트) */
  color?: string
}

export interface RadialChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 데이터 (각 항목이 동심원 1개) */
  data: RadialChartItem[]
  /** 값의 최댓값 (기본 100 — 퍼센트) */
  max?: number
  /** 차트 크기 (정사각형, px) */
  size?: number
  /** 호 두께 (px) */
  barSize?: number
  /** 호 사이 간격 (px) */
  barGap?: number
  /** 트랙 (배경 호) 표시 여부 (기본 false — 디자인 매칭) */
  showTrack?: boolean
  /** 중앙 라벨 — 큰 값 (예: "90%"). formatter 있으면 무시 */
  centerLabel?: React.ReactNode
  /** 중앙 라벨 아래 보조 텍스트. formatter 있으면 무시 */
  centerSubLabel?: React.ReactNode
  /** 중앙 라벨 동적 생성 — 활성 항목 (호버/pin) 따라 변경. null 일 때는 비활성 상태 표시 */
  centerLabelFormatter?: (active: RadialChartItem | null) => React.ReactNode
  /** 중앙 보조 라벨 동적 생성 — 활성 항목 따라 변경 */
  centerSubLabelFormatter?: (active: RadialChartItem | null) => React.ReactNode
  /** 범례 (entry 배열, color 생략 시 시리즈 색 자동 매칭) */
  legend?: ChartLegendItem[]
  /** 툴팁 라벨 */
  tooltipLabel?: React.ReactNode
  /** 툴팁 값 포맷터 */
  tooltipFormatter?: (value: number, item: RadialChartItem) => React.ReactNode
  /** 활성 항목 변경 시 호출 (호버 / 클릭 pin) — 사용처가 centerLabel 등을 동기화하는 용도 */
  onActiveChange?: (item: RadialChartItem | null) => void
}

const DEFAULT_PALETTE = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)",
]

const TRACK_COLOR = "var(--color-slate-100)"

export function RadialChart({
  data,
  max = 100,
  size = 240,
  barSize = 6,
  barGap = 2,
  showTrack = false,
  centerLabel,
  centerSubLabel,
  centerLabelFormatter,
  centerSubLabelFormatter,
  legend,
  tooltipLabel,
  tooltipFormatter,
  onActiveChange,
  className,
  ...props
}: RadialChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null)
  const activeIndex = hoveredIndex ?? pinnedIndex

  const resolvedItems = React.useMemo(
    () =>
      data.map((item, i) => ({
        ...item,
        color: item.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length],
      })),
    [data]
  )

  // data 는 안정적으로 유지 (color 는 Cell 에서 조건부 적용)
  const rechartsData = React.useMemo(
    () =>
      resolvedItems.map((item) => ({
        name: item.name,
        value: item.value,
      })),
    [resolvedItems]
  )

  // activeIndex 변경 시 콜백 호출
  React.useEffect(() => {
    if (!onActiveChange) return
    const active = activeIndex !== null ? resolvedItems[activeIndex] : null
    onActiveChange(active)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  // 자동 범례: color 미지정 시 series 색 순서 매칭
  const resolvedLegend = React.useMemo<ChartLegendItem[] | undefined>(() => {
    if (!legend?.length) return undefined
    return legend.map((item, i) => ({
      label: item.label,
      color: item.color ?? resolvedItems[i]?.color,
    }))
  }, [legend, resolvedItems])

  // 차트 반지름 계산
  const outerRadius = size / 2 - 8
  const totalBarSpace = barSize + barGap
  const innerRadius = Math.max(outerRadius - resolvedItems.length * totalBarSpace, 8)

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
      <div
        className="relative flex items-center justify-center"
        style={{ width: "100%", height: size }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <ResponsiveContainer width={size} height={size}>
          <RadialBarChart
            data={rechartsData}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            barSize={barSize}
            startAngle={-90}
            endAngle={270}
          >
            <PolarAngleAxis type="number" domain={[0, max]} tick={false} />
            <Tooltip
              cursor={{ fill: "transparent", stroke: "transparent" }}
              wrapperStyle={{ zIndex: 50, pointerEvents: "none" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const datum = payload[0]
                const value = datum.value as number
                const item = resolvedItems.find((it) => it.name === datum.payload.name)
                if (!item) return null
                return (
                  <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md">
                    {tooltipLabel && (
                      <div className="text-xs text-slate-500 dark:text-slate-400">{tooltipLabel}</div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-100">
                      <span
                        aria-hidden
                        className="size-2 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-slate-500 dark:text-slate-400">{item.name}</span>
                      <span className="font-medium">
                        {tooltipFormatter ? tooltipFormatter(value, item) : value}
                      </span>
                    </div>
                  </div>
                )
              }}
            />
            <RadialBar
              dataKey="value"
              background={showTrack ? { fill: TRACK_COLOR } : false}
              cornerRadius={0}
              isAnimationActive={false}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(_, index) =>
                setPinnedIndex((prev) => (prev === index ? null : index))
              }
              style={{ cursor: "pointer" }}
            >
              {resolvedItems.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </RadialBar>
          </RadialBarChart>
        </ResponsiveContainer>
        {(() => {
          const activeItem = activeIndex !== null ? resolvedItems[activeIndex] : null
          // 우선순위: formatter > 활성 항목 값 (호버/pin) > 정적 centerLabel (fallback)
          const resolvedCenter = centerLabelFormatter
            ? centerLabelFormatter(activeItem)
            : activeItem
              ? `${activeItem.value}`
              : centerLabel
          const resolvedSub = centerSubLabelFormatter
            ? centerSubLabelFormatter(activeItem)
            : activeItem
              ? activeItem.name
              : centerSubLabel
          if (!resolvedCenter && !resolvedSub) return null
          return (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-0">
              {resolvedCenter && (
                <div
                  className="text-3xl text-slate-700 dark:text-slate-100"
                  style={{ fontFamily: '"STL Gothic R", sans-serif' }}
                >
                  {resolvedCenter}
                </div>
              )}
              {resolvedSub && (
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{resolvedSub}</div>
              )}
            </div>
          )
        })()}
      </div>
    </div>
  )
}
