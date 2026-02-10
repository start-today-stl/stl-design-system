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
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, label, error, errorMessage, size = "full", children, ...props }, ref) => {
    const groupId = React.useId()

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", inputSizeStyles[size], className)} {...props}>
        {label && (
          <label
            htmlFor={groupId}
            className="text-[length:var(--text-body-2)] text-slate-600 dark:text-slate-50"
          >
            {label}
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
          <span className="text-[length:var(--text-body-2)] text-destructive dark:text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"

export { InputGroup }
