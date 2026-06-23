import * as React from "react"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import { cn } from "@/lib/utils"
import { ChartLegend, type ChartLegendItem } from "./chart-legend"

export interface RadarChartSeries {
  /** data 객체의 키 (예: "sectorA") */
  key: string
  /** 표시명 (범례 / 툴팁) */
  name: string
  /** 색상 (지정 안 하면 기본 팔레트) */
  color?: string
}

export interface RadarChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 차트 타이틀 (좌상단) */
  title?: React.ReactNode
  /** 데이터 (각 항목이 하나의 축) */
  data: Array<{ axis: string } & Record<string, number>>
  /** 시리즈 정의 (다중 시리즈 지원) */
  series: RadarChartSeries[]
  /** 값의 최댓값 (기본 100) */
  max?: number
  /** 차트 크기 (정사각형, px) */
  size?: number
  /** 그리드 표시 (기본 true) */
  showGrid?: boolean
  /** 반지름 축(스케일 숫자) 표시 (기본 false — 일반적인 radar 패턴) */
  showRadiusAxis?: boolean
  /** 축 라벨(텍스트) 표시 (기본 false — 피그마 매칭) */
  showAxisLabels?: boolean
  /** 꼭짓점 점 표시 (기본 true) */
  showDots?: boolean
  /** 그라데이션 채움 사용 (기본 true) */
  gradient?: boolean
  /** 시리즈 면 색상 투명도 (gradient=false 일 때, 기본 0.3) */
  fillOpacity?: number
  /** 범례 (생략 시 series 정보로 자동 생성, 단일 시리즈면 미표시) */
  legend?: ChartLegendItem[]
  /** 툴팁 라벨 */
  tooltipLabel?: React.ReactNode
  /** 툴팁 값 포맷터 */
  tooltipFormatter?: (value: number, name: string) => React.ReactNode
  /** enter 애니메이션 (기본 true) */
  animated?: boolean
}

const DEFAULT_PALETTE = [
  "var(--color-primary)",
  "var(--color-blue-300)",
  "var(--color-green-500)",
  "var(--color-red-500)",
  "var(--color-muted-foreground)",
]

export function RadarChart({
  title,
  data,
  series,
  max = 100,
  size = 280,
  showGrid = true,
  showRadiusAxis = false,
  showAxisLabels = false,
  showDots = true,
  gradient = true,
  fillOpacity = 0.3,
  legend,
  tooltipLabel,
  tooltipFormatter,
  animated = true,
  className,
  ...props
}: RadarChartProps) {
  const gradientIdPrefix = React.useId()

  // 색상 해석 (미지정 시 팔레트)
  // fillStart/fillEnd: 채움 radial gradient (중심 → 가장자리)
  // strokeStart/strokeEnd: 연결선 radial gradient (도형 우측 외부 중심 → 좌측)
  const resolvedSeries = React.useMemo(
    () =>
      series.map((s, i) => {
        const color = s.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length]
        return {
          ...s,
          color,
          // 첫번째 시리즈만 피그마 정확 매칭, 그 외엔 series color 단색
          fillStart: i === 0 ? "var(--color-blue-500)" : color,
          fillEnd: i === 0 ? "var(--color-blue-200)" : color,
          strokeStart: i === 0 ? "var(--color-blue-500)" : color,
          strokeEnd: i === 0 ? "var(--color-slate-200)" : color,
          fillGradientId: `${gradientIdPrefix}-radar-fill-${i}`,
          // strokeGradientId는 hoveredIndex 변경 시 강제 갱신을 위해 따로 useMemo에서 계산
        }
      }),
    [series, gradientIdPrefix]
  )


  // 자동 범례 (다중 시리즈에서만; 단일 시리즈는 의미 없음)
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
      <div
        className="relative flex items-center justify-center"
        style={{ width: "100%", height: size }}
      >
        <ResponsiveContainer width={size} height={size}>
          <RechartsRadarChart data={data} outerRadius="75%">
            <defs>
              {resolvedSeries.map((s) => (
                <radialGradient
                  key={s.fillGradientId}
                  id={s.fillGradientId}
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor={s.fillStart} />
                  <stop offset="89.42%" stopColor={s.fillEnd} />
                </radialGradient>
              ))}
            </defs>
            {showGrid && (
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="var(--color-slate-200)"
              />
            )}
            <PolarAngleAxis
              dataKey="axis"
              tick={
                showAxisLabels
                  ? { fill: "var(--color-muted-foreground)", fontSize: 11 }
                  : false
              }
            />
            <PolarRadiusAxis
              domain={[0, max]}
              angle={90}
              tick={
                showRadiusAxis
                  ? { fill: "var(--color-muted-foreground)", fontSize: 10 }
                  : false
              }
              axisLine={false}
            />
            <Tooltip
              cursor={{ stroke: "var(--color-slate-300)", strokeDasharray: "3 3" }}
              wrapperStyle={{ zIndex: 50, pointerEvents: "none" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                // PieChart 의 badge 디자인과 동일: 작은 pill, 값만 표시
                const entry = payload[0]
                const value = entry.value as number
                const name = (entry.name as string) ?? ""
                return (
                  <div
                    className="flex items-center justify-center whitespace-nowrap border border-slate-200 bg-white/50 backdrop-blur-[12px] text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400"
                    style={{
                      // PieChart badge 기본 사이즈(size=220) 절대값과 동일
                      minWidth: "33px",
                      height: "28.6px",
                      padding: "0 8.8px",
                      borderRadius: "8.8px",
                      boxShadow: "4px 4px 10px 0 var(--color-border)",
                    }}
                  >
                    {tooltipFormatter ? tooltipFormatter(value, name) : value}
                  </div>
                )
              }}
            />
            {resolvedSeries.map((s) => (
              <Radar
                key={s.key}
                name={s.name}
                dataKey={s.key}
                stroke="var(--color-slate-200)"
                strokeWidth={1.5}
                fill={gradient ? `url(#${s.fillGradientId})` : s.color}
                fillOpacity={gradient ? 0.5 : fillOpacity}
                dot={
                  showDots
                    ? { r: 2, fill: "var(--color-slate-600)", stroke: "var(--color-slate-600)", strokeWidth: 0 }
                    : false
                }
                activeDot={
                  showDots
                    ? { r: 4, fill: "var(--color-blue-500)", stroke: "white", strokeWidth: 1 }
                    : false
                }
                isAnimationActive={animated}
              />
            ))}
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
