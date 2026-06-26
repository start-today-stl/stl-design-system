import * as React from "react"
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts"

import { cn } from "@/lib/utils"
import { ChartLegend, type ChartLegendItem } from "./chart-legend"

export interface PieChartItem {
  /** 카테고리 이름 (범례 / 툴팁 표시) */
  name: string
  /** 값 (segment 크기에 비례) */
  value: number
  /** 색상 (지정 안 하면 기본 팔레트) */
  color?: string
}

export interface PieChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  /** 차트 타이틀 (좌상단) */
  title?: React.ReactNode
  /** segment 데이터 */
  data: PieChartItem[]
  /** 차트 크기 (정사각형, px) */
  size?: number
  /** 도넛 안쪽 반지름 비율 (0~1, 기본 0.75 — 얇은 ring, 0 = 풀 파이) */
  innerRadiusRatio?: number
  /** 중앙 라벨 — 정적 (formatter 있으면 무시) */
  centerLabel?: React.ReactNode
  /** 중앙 보조 라벨 — 정적 */
  centerSubLabel?: React.ReactNode
  /** 중앙 라벨 동적 생성 — 활성 항목 (호버/pin) 따라 변경 */
  centerLabelFormatter?: (active: PieChartItem | null) => React.ReactNode
  /** 중앙 보조 라벨 동적 생성 */
  centerSubLabelFormatter?: (active: PieChartItem | null) => React.ReactNode
  /** 범례 (entry 배열, color 생략 시 segment 색 자동 매칭) */
  legend?: ChartLegendItem[]
  /** 범례 위치 (기본 bottom — 도넛 아래 세로 stack) */
  legendPosition?: "right" | "bottom"
  /** 우측 상단 뱃지 (보조 KPI) */
  badge?: React.ReactNode
  /** 툴팁 라벨 */
  tooltipLabel?: React.ReactNode
  /** 툴팁 값 포맷터 */
  tooltipFormatter?: (value: number, item: PieChartItem) => React.ReactNode
  /** 활성 항목 변경 시 호출 */
  onActiveChange?: (item: PieChartItem | null) => void
  /** segment 그려지는 enter 애니메이션 (기본 true) */
  animated?: boolean
}

const DEFAULT_PALETTE = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)",
]

export function PieChart({
  title,
  data,
  size = 220,
  innerRadiusRatio = 0.75,
  centerLabel,
  centerSubLabel,
  centerLabelFormatter,
  centerSubLabelFormatter,
  legend,
  legendPosition = "bottom",
  badge,
  tooltipLabel,
  tooltipFormatter,
  onActiveChange,
  animated = true,
  className,
  ...props
}: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [pinnedIndex, setPinnedIndex] = React.useState<number | null>(null)
  const activeIndex = hoveredIndex ?? pinnedIndex

  // 색상 해석 (미지정 시 팔레트)
  const resolvedItems = React.useMemo(
    () =>
      data.map((item, i) => ({
        ...item,
        color: item.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length],
      })),
    [data]
  )

  // onActiveChange 의 stale closure 방지
  const onActiveChangeRef = React.useRef(onActiveChange)
  React.useEffect(() => {
    onActiveChangeRef.current = onActiveChange
  })

  React.useEffect(() => {
    const active = activeIndex !== null ? resolvedItems[activeIndex] : null
    onActiveChangeRef.current?.(active)
  }, [activeIndex, resolvedItems])

  // 자동 범례: color 미지정 시 segment 색 순서 매칭
  const resolvedLegend = React.useMemo<ChartLegendItem[] | undefined>(() => {
    if (!legend?.length) return undefined
    return legend.map((item, i) => ({
      label: item.label,
      color: item.color ?? resolvedItems[i]?.color,
    }))
  }, [legend, resolvedItems])

  // 반지름 계산
  const outerRadius = size / 2 - 8
  const innerRadius = outerRadius * innerRadiusRatio

  // 이벤트 핸들러 안정화
  const handleSegmentEnter = React.useCallback(
    (_: unknown, index: number) => setHoveredIndex(index),
    []
  )
  const handleSegmentLeave = React.useCallback(() => setHoveredIndex(null), [])
  const handleSegmentClick = React.useCallback(
    (_: unknown, index: number) =>
      setPinnedIndex((prev) => (prev === index ? null : index)),
    []
  )
  const handleWrapperLeave = React.useCallback(() => setHoveredIndex(null), [])

  const isLegendBottom = legendPosition === "bottom"
  const activeItem = activeIndex !== null ? resolvedItems[activeIndex] : null

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
      <div
        className={cn(
          "flex",
          isLegendBottom ? "flex-col items-center gap-3" : "flex-row items-center gap-4"
        )}
      >
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
        onMouseLeave={handleWrapperLeave}
      >
        <ResponsiveContainer width={size} height={size}>
          <RechartsPieChart>
            <Tooltip
              cursor={false}
              wrapperStyle={{ zIndex: 50, pointerEvents: "none" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const datum = payload[0]
                const value = datum.value as number
                const item = resolvedItems.find((it) => it.name === datum.name)
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
            <Pie
              data={resolvedItems}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              isAnimationActive={animated}
              onMouseEnter={handleSegmentEnter}
              onMouseLeave={handleSegmentLeave}
              onClick={handleSegmentClick}
              style={{ cursor: "pointer" }}
            >
              {resolvedItems.map((item) => (
                <Cell key={item.name} fill={item.color} stroke="none" />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>

        {/* 중앙 라벨 */}
        {(resolvedCenter || resolvedSub) && (
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
        )}

        {/* 우측 상단 뱃지 */}
        {badge !== undefined && badge !== null && (
          <div
            className="absolute flex items-center justify-center whitespace-nowrap border border-slate-200 bg-white/50 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400"
            style={{
              right: `${size * 0.07}px`,
              top: `${size * 0.07}px`,
              minWidth: `${size * 0.15}px`,
              height: `${size * 0.13}px`,
              padding: `0 ${size * 0.04}px`,
              borderRadius: `${size * 0.04}px`,
              boxShadow: "4px 4px 10px 0 var(--color-border)",
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* 범례 — 우측 세로 또는 하단 가로 */}
      {resolvedLegend && (
        <div
          className={cn(
            isLegendBottom
              ? "flex flex-row flex-wrap items-center justify-center gap-3"
              : "flex flex-col gap-2"
          )}
        >
          {resolvedLegend.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300"
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
      )}
      </div>
    </div>
  )
}

// 사용처에서 export 위해 default ChartLegend 도 별도 export
export { ChartLegend }
