import * as React from "react"
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts"

import { cn } from "@/lib/utils"

export interface GaugeChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  /** 차트 타이틀 (좌상단) */
  title?: React.ReactNode
  /** 게이지 값 (0 ~ max) */
  value: number
  /** 최댓값 (기본 100) */
  max?: number
  /** 그라디언트 시작 / 끝 색상 (기본 var(--color-primary)) */
  color?: string
  /** 하단 캡션 텍스트 */
  caption?: React.ReactNode
  /** 우측 상단 뱃지 (선택, 별도 KPI 표시용) */
  badge?: React.ReactNode
  /** 차트 가로 크기 (높이는 절반 = 반원 비율) */
  size?: number
  /** 도넛 안쪽 반지름 비율 (0~1, 기본 0.3 — 두꺼운 도넛) */
  innerRadiusRatio?: number
  /** 바닥 그레이 트랙 표시 (기본 true) */
  showTrack?: boolean
  /** 호 그려지는 enter 애니메이션 (기본 true) */
  animated?: boolean
}

const DEFAULT_COLOR = "var(--color-primary)"
const TRACK_COLOR = "var(--color-slate-200)"

export function GaugeChart({
  title,
  value,
  max = 100,
  color = DEFAULT_COLOR,
  caption,
  badge,
  size = 200,
  innerRadiusRatio = 0.3,
  showTrack = true,
  animated = true,
  className,
  ...props
}: GaugeChartProps) {
  const gradientId = React.useId()
  const data = React.useMemo(() => [{ name: "value", value }], [value])
  // 반원 비율 = 가로:세로 2:1
  const chartHeight = size / 2
  const outerRadius = size / 2
  const innerRadius = outerRadius * innerRadiusRatio
  const barSize = outerRadius - innerRadius

  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-900",
        "rounded-2xl border border-slate-100 dark:border-slate-700",
        "p-4 flex flex-col gap-2",
        className
      )}
      {...props}
    >
      {title && (
        <div className="text-sm font-medium text-slate-700 dark:text-slate-100">
          {title}
        </div>
      )}
      <div className="relative" style={{ width: size, height: chartHeight }}>
        <ResponsiveContainer width={size} height={chartHeight}>
          <RadialBarChart
            data={data}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            barSize={barSize}
            startAngle={180}
            endAngle={0}
            cy="100%"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <PolarAngleAxis type="number" domain={[0, max]} tick={false} />
            <RadialBar
              dataKey="value"
              fill={`url(#${gradientId})`}
              background={showTrack ? { fill: TRACK_COLOR } : false}
              cornerRadius={0}
              isAnimationActive={animated}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        {badge !== undefined && badge !== null && (
          <div
            className="absolute flex items-center justify-center whitespace-nowrap border border-slate-200 bg-white/50 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400"
            style={{
              // 우측 상단 — 아치 상단과 살짝 겹치도록
              right: `${size * 0.07}px`,
              top: `${chartHeight * 0.09}px`,
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
      {caption && (
        <div className="text-xs text-slate-700 dark:text-slate-100">{caption}</div>
      )}
    </div>
  )
}
