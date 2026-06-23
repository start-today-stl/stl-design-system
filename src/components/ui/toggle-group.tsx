"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"

export interface ToggleGroupOption {
  label: string
  value: string
  disabled?: boolean
}

export type ToggleGroupVariant = "box" | "pill"

export interface ToggleGroupProps {
  /** 라벨 텍스트 */
  label?: string
  /** 옵션 목록 */
  options: ToggleGroupOption[]
  /** 선택된 값 */
  value?: string
  /** 기본 선택 값 */
  defaultValue?: string
  /** 값 변경 핸들러 */
  onValueChange?: (value: string) => void
  /** 비활성화 */
  disabled?: boolean
  /** 크기 (full: 부모 너비 100%) */
  size?: "full"
  /** 시각 스타일 (box: 기본 박스, pill: 회색 컨테이너 + 떠오르는 셀) */
  variant?: ToggleGroupVariant
  /** 추가 className */
  className?: string
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      label,
      options,
      value,
      defaultValue,
      onValueChange,
      disabled,
      size,
      variant = "box",
      className,
    },
    ref
  ) => {
    const isFull = size === "full"
    const isPill = variant === "pill"

    return (
      <div className={cn("flex flex-col gap-1", isFull ? "w-full" : "w-fit", className)}>
        {label && (
          <label className="text-xs text-slate-700 dark:text-slate-400">
            {label}
          </label>
        )}
        <ToggleGroupPrimitive.Root
          ref={ref}
          type="single"
          value={value}
          defaultValue={defaultValue}
          onValueChange={(val) => {
            if (val) onValueChange?.(val)
          }}
          disabled={disabled}
          className={cn(
            "inline-flex",
            isFull && "w-full",
            // pill: 회색 컨테이너 + 패딩
            isPill && "rounded-md bg-slate-100 dark:bg-slate-800 p-1 gap-1"
          )}
        >
          {options.map((option, index) => {
            const isFirst = index === 0
            const isLast = index === options.length - 1

            if (isPill) {
              return (
                <ToggleGroupPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "inline-flex h-7 items-center justify-center px-3 cursor-pointer",
                    "rounded-[4px]",
                    "text-xs text-slate-500 dark:text-slate-400",
                    "transition-all",
                    "hover:text-slate-700 dark:hover:text-slate-200",
                    "focus:outline-none",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    // 활성: 흰 배경으로 떠오름
                    "data-[state=on]:bg-white dark:data-[state=on]:bg-slate-700",
                    "data-[state=on]:text-slate-900 dark:data-[state=on]:text-slate-50",
                    "data-[state=on]:shadow-sm",
                    isFull && "flex-1"
                  )}
                >
                  {option.label}
                </ToggleGroupPrimitive.Item>
              )
            }

            // box (default)
            return (
              <ToggleGroupPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={cn(
                  "inline-flex h-9 items-center justify-center px-4 cursor-pointer",
                  "border border-slate-200 dark:border-slate-600",
                  "bg-white dark:bg-slate-800",
                  "text-xs text-slate-600 dark:text-slate-300",
                  "transition-colors",
                  "hover:bg-slate-50 dark:hover:bg-slate-700",
                  "focus:outline-none",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:border-blue-500",
                  "dark:data-[state=on]:bg-blue-600 dark:data-[state=on]:border-blue-600",
                  isFirst && "rounded-l-[5px]",
                  isLast && "rounded-r-[5px]",
                  !isFirst && "border-l-0",
                  isFull && "flex-1"
                )}
              >
                {option.label}
              </ToggleGroupPrimitive.Item>
            )
          })}
        </ToggleGroupPrimitive.Root>
      </div>
    )
  }
)
ToggleGroup.displayName = "ToggleGroup"

export { ToggleGroup }
