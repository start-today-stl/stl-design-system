"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"

export interface ToggleGroupOption {
  label: string
  value: string
  disabled?: boolean
}

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
      className,
    },
    ref
  ) => {
    return (
      <div className={cn("inline-flex flex-col gap-1 w-fit", className)}>
        {label && (
          <label className="text-xs text-slate-600 dark:text-slate-50">
            {label}
          </label>
        )}
        <ToggleGroupPrimitive.Root
          ref={ref}
          type="single"
          value={value}
          defaultValue={defaultValue}
          onValueChange={(val) => {
            // Radix는 deselect 시 빈 문자열 전달, 우리는 항상 선택 유지
            if (val) onValueChange?.(val)
          }}
          disabled={disabled}
          className="inline-flex"
        >
          {options.map((option, index) => {
            const isFirst = index === 0
            const isLast = index === options.length - 1

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
                  // 활성 상태
                  "data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:border-blue-500",
                  "dark:data-[state=on]:bg-blue-600 dark:data-[state=on]:border-blue-600",
                  // 위치별 border-radius
                  isFirst && "rounded-l-[5px]",
                  isLast && "rounded-r-[5px]",
                  !isFirst && "border-l-0"
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
