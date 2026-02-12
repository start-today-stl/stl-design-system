"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** 값 툴팁 표시 */
  showTooltip?: boolean
  /** min/max 라벨 표시 */
  showLabels?: boolean
  /** 라벨 텍스트 */
  label?: string
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showTooltip, showLabels, label, min = 0, max = 100, value, defaultValue, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? [min])
  const currentValue = value ?? internalValue

  const handleValueChange = (newValue: number[]) => {
    if (!value) {
      setInternalValue(newValue)
    }
    props.onValueChange?.(newValue)
  }

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <span className="text-[length:var(--text-body-2)] text-slate-600 dark:text-slate-50">
          {label}
        </span>
      )}
      <div className="relative">
        <SliderPrimitive.Root
          ref={ref}
          min={min}
          max={max}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-400">
            <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-blue-300 to-blue-500" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="group relative block h-[22px] w-[22px] rounded-full bg-blue-500 border-[3px] border-slate-200 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing dark:border-slate-400">
            {/* 툴팁 - hover/active 상태에서만 표시 */}
            {showTooltip && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                <div className="backdrop-blur-[12px] bg-white/50 dark:bg-slate-800/50 border-[0.5px] border-slate-200 dark:border-slate-600 rounded-[5px] px-1.5 py-0.5 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]">
                  <span className="text-[8px] text-slate-500 dark:text-slate-300 tracking-[-0.12px]">
                    {currentValue[0]}
                  </span>
                </div>
              </div>
            )}
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
        {/* Min/Max 라벨 */}
        {showLabels && (
          <div className="flex justify-between mt-1">
            <span className="text-[8px] text-slate-500 dark:text-slate-400 tracking-[-0.12px]">
              {min}
            </span>
            <span className="text-[8px] text-slate-500 dark:text-slate-400 tracking-[-0.12px]">
              {max}
            </span>
          </div>
        )}
      </div>
    </div>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
