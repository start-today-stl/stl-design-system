import * as React from "react"

import { cn } from "@/lib/utils"

export interface HeatmapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  /** 차트 타이틀 (좌상단) */
  title?: React.ReactNode
  /** 2D 데이터 행렬 — data[row][col] (row = Y, col = X) */
  data: number[][]
  /** X축 라벨 (data[0].length 와 같은 길이) */
  xLabels: Array<string | number>
  /** Y축 라벨 (data.length 와 같은 길이) */
  yLabels: Array<string | number>
  /** 셀 색상 (기본 var(--color-primary) = blue-500) */
  color?: string
  /** 셀 크기 px (기본 15) */
  cellSize?: number
  /** 셀 간격 px (기본 0 — 셀이 서로 붙어있음, 피그마 매칭) */
  cellGap?: number
  /** 값의 최댓값 (생략 시 데이터 max 자동) */
  max?: number
  /** 값의 최솟값 (기본 0) */
  min?: number
  /** 최저 강도 opacity (기본 0.05 — 피그마 매칭) */
  minOpacity?: number
  /** 최고 강도 opacity (기본 1) */
  maxOpacity?: number
  /** 우측 범례 표시 (기본 true) */
  showLegend?: boolean
  /** 범례 단계 수 (기본 6 — 피그마 매칭) */
  legendSteps?: number
  /** 범례 항목 라벨 함수 (기본 "Sort Deep Blue") */
  legendLabel?: (stepIndex: number) => React.ReactNode
  /** X 축 라벨 표시 (기본 true) */
  showXAxis?: boolean
  /** Y 축 라벨 표시 (기본 true) */
  showYAxis?: boolean
  /** 툴팁 포맷터 */
  tooltipFormatter?: (
    value: number,
    xLabel: string | number,
    yLabel: string | number
  ) => React.ReactNode
}

const DEFAULT_LEGEND_LABEL = (): React.ReactNode => "Sort Deep Blue"

export function Heatmap({
  title,
  data,
  xLabels,
  yLabels,
  color = "var(--color-primary)",
  cellSize = 15,
  cellGap = 0,
  max,
  min = 0,
  minOpacity = 0.05,
  maxOpacity = 1,
  showLegend = true,
  legendSteps = 6,
  legendLabel = DEFAULT_LEGEND_LABEL,
  showXAxis = true,
  showYAxis = true,
  tooltipFormatter,
  className,
  ...props
}: HeatmapProps) {
  const [hovered, setHovered] = React.useState<{
    row: number
    col: number
    x: number
    y: number
  } | null>(null)

  // 데이터 min/max 계산 (max 미지정 시)
  const computedMax = React.useMemo(() => {
    if (max !== undefined) return max
    let m = -Infinity
    for (const row of data) {
      for (const v of row) {
        if (v > m) m = v
      }
    }
    return m === -Infinity ? 1 : m
  }, [data, max])

  const range = computedMax - min || 1

  // 값 → opacity 매핑
  const valueToOpacity = (value: number) => {
    const ratio = Math.max(0, Math.min(1, (value - min) / range))
    return minOpacity + ratio * (maxOpacity - minOpacity)
  }

  const cols = xLabels.length
  const rows = yLabels.length
  const gridWidth = cols * cellSize + (cols - 1) * cellGap
  const gridHeight = rows * cellSize + (rows - 1) * cellGap

  const containerRef = React.useRef<HTMLDivElement>(null)

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
      <div className="flex gap-3">
        {/* 메인 영역: Y축 + 그리드 + X축 */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex gap-1">
            {/* Y 축 라벨 (왼쪽) */}
            {showYAxis && (
              <div
                className="flex flex-col text-[10px] text-slate-500 dark:text-slate-400 tabular-nums"
                style={{ gap: `${cellGap}px` }}
              >
                {yLabels.map((label, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-end pr-1"
                    style={{ height: `${cellSize}px`, minWidth: "16px" }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
            {/* 셀 그리드 (SVG) */}
            <div className="relative">
              <svg
                width={gridWidth}
                height={gridHeight}
                onMouseLeave={() => setHovered(null)}
                style={{ display: "block" }}
              >
                {data.map((row, rowIdx) =>
                  row.map((value, colIdx) => {
                    const x = colIdx * (cellSize + cellGap)
                    const y = rowIdx * (cellSize + cellGap)
                    return (
                      <rect
                        key={`${rowIdx}-${colIdx}`}
                        x={x}
                        y={y}
                        width={cellSize}
                        height={cellSize}
                        fill={color}
                        fillOpacity={valueToOpacity(value)}
                        onMouseEnter={() =>
                          setHovered({ row: rowIdx, col: colIdx, x, y })
                        }
                        style={{ cursor: "pointer" }}
                      />
                    )
                  })
                )}
              </svg>
              {/* 툴팁 (다른 차트와 동일한 박스 스타일) */}
              {hovered && (
                <div
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-md whitespace-nowrap z-10"
                  style={{
                    left: `${hovered.x + cellSize / 2}px`,
                    top: `${hovered.y - 4}px`,
                  }}
                >
                  {tooltipFormatter ? (
                    <div className="text-sm text-slate-700 dark:text-slate-100">
                      {tooltipFormatter(
                        data[hovered.row][hovered.col],
                        xLabels[hovered.col],
                        yLabels[hovered.row]
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0.5 text-sm text-slate-700 dark:text-slate-100">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {yLabels[hovered.row]} / {xLabels[hovered.col]}
                      </span>
                      <span className="font-medium">{data[hovered.row][hovered.col]}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* X 축 라벨 (아래) */}
          {showXAxis && (
            <div className="flex gap-1" style={{ marginLeft: showYAxis ? "20px" : 0 }}>
              <div
                className="flex text-[10px] text-slate-500 dark:text-slate-400 tabular-nums"
                style={{ gap: `${cellGap}px` }}
              >
                {xLabels.map((label, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center"
                    style={{ width: `${cellSize}px` }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* 우측 범례 */}
        {showLegend && (
          <div className="flex flex-col gap-1 shrink-0">
            {Array.from({ length: legendSteps }, (_, i) => {
              // i=0 가장 진한 (top), i=legendSteps-1 가장 옅은 (bottom)
              const ratio = 1 - i / Math.max(1, legendSteps - 1)
              const opacity = minOpacity + ratio * (maxOpacity - minOpacity)
              return (
                <div key={i} className="flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="block size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color, opacity }}
                  />
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">
                    {legendLabel(i)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
