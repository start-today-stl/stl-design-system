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

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** 라벨 텍스트 */
  label?: string
  /** 색상 변형 */
  variant?: "primary" | "success" | "danger"
}

const checkedVariantStyles = {
  primary: "group-data-[state=checked]:bg-blue-500",
  success: "group-data-[state=checked]:bg-green-500",
  danger: "group-data-[state=checked]:bg-red-500",
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, variant = "primary", ...props }, ref) => {
  const checkedStyle = checkedVariantStyles[variant]

  const radio = (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // 기본 스타일 (12x12, 원형) - Figma 기준
        "peer size-3 shrink-0 rounded-md border flex items-center justify-center cursor-pointer group",
        // Default 상태: bg-slate-50, border-slate-200
        "bg-slate-50 border-slate-200",
        // Hover 상태: bg-slate-400, border-slate-400
        "hover:bg-slate-400 hover:border-slate-400",
        // 포커스 상태
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        // 비활성화 상태
        "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:border-slate-200",
        // 다크모드
        "dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-500 dark:hover:border-slate-500",
        className
      )}
      {...props}
    >
      {/* 내부 원 (6x6) - 항상 표시, 선택 시 색상 변경 */}
      <span
        className={cn(
          "size-1.5 rounded-full transition-colors",
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
        <span className="text-xs text-slate-600 tracking-[-0.12px] dark:text-slate-200 leading-none">
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
}

const RadioGroupField = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupFieldProps
>(({ className, label, children, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-xs text-slate-600 dark:text-slate-50">
          {label}
        </span>
      )}
      <RadioGroup ref={ref} className={className} {...props}>
        {children}
      </RadioGroup>
    </div>
  )
})
RadioGroupField.displayName = "RadioGroupField"

export { RadioGroup, RadioGroupItem, RadioGroupField }
