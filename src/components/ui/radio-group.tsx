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
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, ...props }, ref) => {
  const radio = (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // 기본 스타일 (20x20, 원형)
        "peer h-5 w-5 shrink-0 rounded-full border-[0.75px] flex items-center justify-center cursor-pointer",
        // 미선택 상태
        "border-slate-500 bg-white",
        // 선택 상태 - 테두리와 내부 원 모두 blue
        "data-[state=checked]:border-blue-500",
        // 포커스 상태
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        // 비활성화 상태
        "disabled:cursor-not-allowed disabled:opacity-30",
        // 다크모드
        "dark:border-slate-200 dark:bg-slate-900 dark:data-[state=checked]:border-blue-500",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* 선택된 상태의 내부 원 (10x10) */}
        <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
      </RadioGroupPrimitive.Indicator>
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
