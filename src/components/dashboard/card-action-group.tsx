import * as React from "react"

import { cn } from "@/lib/utils"
import { CardAction } from "./card-action"

export interface CardActionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 옵션 목록 */
  options: string[]
  /** 선택된 값 */
  value?: string
  /** 값 변경 핸들러 */
  onValueChange?: (value: string) => void
  /** 기본 선택 값 (비제어 컴포넌트용) */
  defaultValue?: string
}

const CardActionGroup = React.forwardRef<HTMLDivElement, CardActionGroupProps>(
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
          <CardAction
            key={option}
            selected={currentValue === option}
            onClick={() => handleClick(option)}
          >
            {option}
          </CardAction>
        ))}
      </div>
    )
  }
)
CardActionGroup.displayName = "CardActionGroup"

export { CardActionGroup }
