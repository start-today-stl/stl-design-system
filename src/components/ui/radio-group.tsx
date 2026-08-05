"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export type RadioGroupItemSize = "sm" | "md" | "lg"

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** 라벨 텍스트 */
  label?: string
  /** 색상 변형 */
  variant?: "primary" | "success" | "danger"
  /**
   * 크기 (기본: md)
   * - sm: 12px — 이전 기본 크기
   * - md: 16px — 기본
   * - lg: 20px — Checkbox(20px) 와 동일 박스 크기
   */
  size?: RadioGroupItemSize
}

/** 바깥 원 / 안쪽 점 크기. 안쪽 점은 바깥의 절반. */
const sizeStyles: Record<RadioGroupItemSize, { root: string; dot: string }> = {
  sm: { root: "size-3", dot: "size-1.5" },
  md: { root: "size-4", dot: "size-2" },
  lg: { root: "size-5", dot: "size-2.5" },
}

const checkedVariantStyles = {
  primary: "group-data-[state=checked]:bg-blue-500 dark:group-data-[state=checked]:bg-blue-400",
  success: "group-data-[state=checked]:bg-green-500 dark:group-data-[state=checked]:bg-green-400",
  danger: "group-data-[state=checked]:bg-red-500 dark:group-data-[state=checked]:bg-red-400",
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, variant = "primary", size = "md", ...props }, ref) => {
  const checkedStyle = checkedVariantStyles[variant]
  const { root: rootSize, dot: dotSize } = sizeStyles[size]

  const radio = (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // 원형. rounded-full 을 쓰는 이유: 기존 rounded-md(6px) 는 12px 크기에서만 우연히
        // 정원으로 보이고(6px = 절반), 크기를 키우면 모서리 둥근 사각형이 된다.
        // sm 에서는 렌더 결과가 기존과 동일하다.
        "peer shrink-0 rounded-full border flex items-center justify-center cursor-pointer group",
        rootSize,
        // Default 상태: bg-slate-50, border-slate-200
        "bg-slate-50 border-slate-200",
        // Hover 상태: bg-slate-400, border-slate-400
        "hover:bg-slate-400 hover:border-slate-400",
        // 포커스 상태
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        // 비활성화 상태
        "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:border-slate-200",
        // 다크모드: 배경 어둡게, hover시 바깥원이 내부원보다 어둡게
        "dark:bg-slate-800 dark:border-slate-500 dark:hover:bg-slate-600 dark:hover:border-slate-500",
        className
      )}
      {...props}
    >
      {/* 내부 원 - 항상 표시, 선택 시 색상 변경 */}
      <span
        className={cn(
          "rounded-full transition-colors",
          dotSize,
          // 기본: 회색, Hover: 회색 유지
          "bg-slate-200 group-hover:bg-slate-200",
          // 선택 시: 색상 변경 (variant에 따라)
          checkedStyle,
          // 다크모드
          "dark:bg-slate-500 dark:group-hover:bg-slate-400"
        )}
      />
    </RadioGroupPrimitive.Item>
  )

  if (label) {
    return (
      <label className="inline-flex items-center gap-1.5 cursor-pointer align-middle">
        {radio}
        <span className="text-xs text-slate-700 tracking-[-0.12px] dark:text-slate-200 leading-none">
          {label}
        </span>
      </label>
    )
  }

  return radio
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

/** RadioGroupField - label을 포함한 RadioGroup 래퍼 */
export interface RadioGroupFieldProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** 라벨 텍스트 */
  label?: string
  /** 필수 입력 표시 (라벨 앞에 점 표시) */
  required?: boolean
}

const RadioGroupField = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupFieldProps
>(({ className, label, children, required, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400">
          {required && (
            <span className="size-2 rounded-full bg-red-400" aria-hidden="true" />
          )}
          {label}
        </span>
      )}
      <RadioGroup ref={ref} className={className} required={required} {...props}>
        {children}
      </RadioGroup>
    </div>
  )
})
RadioGroupField.displayName = "RadioGroupField"

export { RadioGroup, RadioGroupItem, RadioGroupField }
