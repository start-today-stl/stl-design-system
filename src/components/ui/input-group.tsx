"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { inputSizeStyles, type InputSize } from "./input"

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 라벨 텍스트 */
  label?: string
  /** 에러 상태 */
  error?: boolean
  /** 에러 메시지 */
  errorMessage?: string
  /** 너비 크기 */
  size?: InputSize
  /** 라벨이 없어도 라벨 공간 유지 */
  reserveLabelSpace?: boolean
  /** 필수 입력 표시 (라벨 앞에 점 표시) */
  required?: boolean
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, label, error, errorMessage, size = "full", reserveLabelSpace, required, children, ...props }, ref) => {
    const groupId = React.useId()

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", inputSizeStyles[size], className)} {...props}>
        {(label || reserveLabelSpace) && (
          <label
            htmlFor={groupId}
            className={cn(
              "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50",
              !label && "invisible"
            )}
          >
            {required && (
              <span className="size-2 rounded-full bg-stone-400" aria-hidden="true" />
            )}
            {label || "\u00A0"}
          </label>
        )}
        <div
          className={cn(
            "flex",
            "[&>*:first-child]:rounded-r-none",
            "[&>*:last-child]:rounded-l-none",
            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
            "[&>*:not(:last-child)]:border-r-0"
          )}
        >
          {children}
        </div>
        {error && errorMessage && (
          <span className="text-xs text-destructive dark:text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"

export { InputGroup }
