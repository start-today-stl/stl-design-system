import * as React from "react"

import { cn } from "@/lib/utils"

export interface BoxPlotItem {
  /** 카테고리 이름 (툴팁/X축) */
  name: string
  /** Q1 (박스 하단) */
  q1: number
  /** 중앙값 (median, 박스 분할선) */
  median: number
  /** Q3 (박스 상단) */
  q3: number
  /** 최솟값 (선택, 툴팁 표시용) */
  min?: number
  /** 최댓값 (선택, 툴팁 표시용) */
  max?: number
}

export interface BoxPlotProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  /** 차트 타이틀 (좌상단) */
  title?: React.ReactNode
  /** 데이터 (각 항목 = 하나의 box) */
  data: BoxPlotItem[]
  /** 차트 높이 (px, 기본 200) */
  height?: number
  /** 박스 너비 px (생략 시 그리드 간격의 50% — 피그마 매칭) */
  boxWidth?: number
  /** Y 도메인 (생략 시 자동) */
  yDomain?: [number, number]
  /** Y 라벨 포맷터 */
  yTickFormatter?: (value: number) => string
  /** 박스 상반부 색상 (median~Q3, 기본 blue-200) */
  upperColor?: string
  /** 박스 하반부 색상 (Q1~median, 기본 slate-300) */
  lowerColor?: string
  /** 활성 박스 상반부 색상 (기본 blue-500) — 피그마: 호버 시 상반부만 강조 */
  activeUpperColor?: string
  /** 그리드 라인 표시 (기본 true) */
  showGrid?: boolean
  /** Y 축 표시 (기본 false — 피그마 매칭) */
  showYAxis?: boolean
  /** X 축 라벨 표시 (기본 false — 피그마 매칭) */
  showXAxis?: boolean
  /** 툴팁 포맷터 (생략 시 median 값만 표시 — 피그마 매칭) */
  tooltipFormatter?: (item: BoxPlotItem) => React.ReactNode
}

const PADDING_LEFT_WITH_Y = 40 // y axis 영역
const PADDING_LEFT_NONE = 0
const PADDING_RIGHT = 12
const PADDING_TOP = 12
const PADDING_BOTTOM_WITH_X = 28 // x axis 영역
const PADDING_BOTTOM_NONE = 0

export function BoxPlot({
  title,
  data,
  height = 200,
  boxWidth,
  yDomain,
  yTickFormatter,
  upperColor = "var(--color-blue-200)",
  lowerColor = "var(--color-slate-300)",
  activeUpperColor = "var(--color-blue-500)",
  showGrid = true,
  showYAxis = false,
  showXAxis = false,
  tooltipFormatter,
  className,
  ...props
}: BoxPlotProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)

  // ResizeObserver 로 width 추적
  React.useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Y 도메인 자동 산정
  const [yMin, yMax] = React.useMemo<[number, number]>(() => {
    if (yDomain) return yDomain
    if (!data.length) return [0, 1]
    let mn = Infinity
    let mx = -Infinity
    for (const d of data) {
      mn = Math.min(mn, d.min ?? d.q1)
      mx = Math.max(mx, d.max ?? d.q3)
    }
    const pad = (mx - mn) * 0.05 || 1
    return [mn - pad, mx + pad]
  }, [data, yDomain])

  const paddingLeft = showYAxis ? PADDING_LEFT_WITH_Y : PADDING_LEFT_NONE
  const paddingBottom = showXAxis ? PADDING_BOTTOM_WITH_X : PADDING_BOTTOM_NONE
  const innerWidth = Math.max(0, width - paddingLeft - PADDING_RIGHT)
  const innerHeight = Math.max(0, height - PADDING_TOP - paddingBottom)
  const range = yMax - yMin || 1

  // 값 → 픽셀 Y (위로 갈수록 값 큼)
  const yToPx = (v: number) => PADDING_TOP + ((yMax - v) / range) * innerHeight

  // step (각 아이템 간격) — 피그마는 box width = step/2
  const step = data.length > 0 ? innerWidth / data.length : 0
  const effectiveBoxWidth = boxWidth ?? Math.max(2, step * 0.5)

  // 아이템 X 위치 (균등 분할)
  const itemX = (i: number) => paddingLeft + step * i + step / 2

  return (
    <div
      ref={containerRef}
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
      <div className="relative" style={{ height: `${height}px` }}>
        {width > 0 && (
          <svg
            width={width}
            height={height}
            onMouseLeave={() => setHovered(null)}
            style={{ display: "block" }}
          >
            {/* Y 축 라벨 (선택) */}
            {showYAxis && (
              <g>
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                  const value = yMax - ratio * range
                  const y = PADDING_TOP + ratio * innerHeight
                  return (
                    <text
                      key={ratio}
                      x={paddingLeft - 6}
                      y={y + 3}
                      textAnchor="end"
                      fontSize="10"
                      fill="var(--color-muted-foreground)"
                      className="tabular-nums"
                    >
                      {yTickFormatter ? yTickFormatter(value) : value.toFixed(0)}
                    </text>
                  )
                })}
              </g>
            )}
            {/* 세로 grid 라인 (각 아이템 위치) */}
            {showGrid &&
              data.map((_, i) => {
                const x = itemX(i)
                return (
                  <line
                    key={`grid-${i}`}
                    x1={x}
                    y1={PADDING_TOP}
                    x2={x}
                    y2={PADDING_TOP + innerHeight}
                    stroke="var(--color-border)"
                    strokeWidth={0.5}
                  />
                )
              })}
            {/* 각 박스 */}
            {data.map((d, i) => {
              const x = itemX(i)
              const isHovered = hovered === i
              const yQ1 = yToPx(d.q1)
              const yMedian = yToPx(d.median)
              const yQ3 = yToPx(d.q3)
              const halfWidth = effectiveBoxWidth / 2
              const upper = isHovered ? activeUpperColor : upperColor
              return (
                <g key={i}>
                  {/* 상반부 (median~Q3) — 호버 시 색상 변경 + drop shadow */}
                  <rect
                    x={x - halfWidth}
                    y={yQ3}
                    width={effectiveBoxWidth}
                    height={Math.max(0, yMedian - yQ3)}
                    fill={upper}
                    style={isHovered ? { filter: "drop-shadow(4px 4px 10px rgba(0,0,0,0.08))" } : undefined}
                  />
                  {/* 하반부 (Q1~median) — 호버 시 색상/투명도 변화 없음 (피그마 매칭) */}
                  <rect
                    x={x - halfWidth}
                    y={yMedian}
                    width={effectiveBoxWidth}
                    height={Math.max(0, yQ1 - yMedian)}
                    fill={lowerColor}
                    fillOpacity={0.5}
                  />
                  {/* 호버 영역 (전체 column) */}
                  <rect
                    x={x - step / 2}
                    y={PADDING_TOP}
                    width={step}
                    height={innerHeight}
                    fill="transparent"
                    onMouseEnter={() => setHovered(i)}
                    style={{ cursor: "pointer" }}
                  />
                </g>
              )
            })}
            {/* X 축 라벨 (선택) */}
            {showXAxis && (
              <g>
                {data.map((d, i) => (
                  <text
                    key={`xlabel-${i}`}
                    x={itemX(i)}
                    y={PADDING_TOP + innerHeight + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fill="var(--color-muted-foreground)"
                    className="tabular-nums"
                  >
                    {d.name}
                  </text>
                ))}
              </g>
            )}
          </svg>
        )}
        {/* 툴팁 (PieChart badge 스타일과 동일) */}
        {hovered !== null && data[hovered] && width > 0 && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full flex items-center justify-center whitespace-nowrap border border-slate-200 bg-white/50 backdrop-blur-[12px] text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400"
            style={{
              left: `${itemX(hovered)}px`,
              top: `${yToPx(data[hovered].q3) - 6}px`,
              minWidth: "33px",
              height: "28.6px",
              padding: "0 8.8px",
              borderRadius: "8.8px",
              boxShadow: "4px 4px 10px 0 var(--color-border)",
            }}
          >
            {tooltipFormatter ? tooltipFormatter(data[hovered]) : data[hovered].median}
          </div>
        )}
      </div>
    </div>
  )
}
