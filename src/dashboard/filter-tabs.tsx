import * as React from "react"

import { cn } from "@/lib/utils"

export interface FilterTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 탭 옵션 목록 */
  options: string[]
  /** 선택된 값 */
  value?: string
  /** 값 변경 핸들러 */
  onValueChange?: (value: string) => void
  /** 기본 선택 값 (비제어 컴포넌트용) */
  defaultValue?: string
}

const FilterTabs = React.forwardRef<HTMLDivElement, FilterTabsProps>(
  ({ className, options, value, onValueChange, defaultValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || options[0])
    const currentValue = value !== undefined ? value : internalValue

    const handleClick = (option: string) => {
      if (value === undefined) {
        setInternalValue(option)
      }
      onValueChange?.(option)
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleClick(option)}
            className={cn(
              "h-[18px] px-[5px] rounded-[2px] border border-gray-200 text-[10px] tracking-[-0.1px] text-gray-700 transition-colors cursor-pointer",
              "dark:border-dark-300 dark:text-gray-100",
              currentValue === option
                ? "bg-gray-100 dark:bg-dark-300"
                : "hover:bg-gray-50 dark:hover:bg-dark-400"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    )
  }
)
FilterTabs.displayName = "FilterTabs"

export { FilterTabs }
