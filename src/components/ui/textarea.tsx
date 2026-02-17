"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const textareaBaseStyles = [
  "flex w-full rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "min-h-[80px] px-3 py-2 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors resize-y",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ")

const textareaDefaultStyles = [
  "border-slate-100 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
].join(" ")

const textareaErrorStyles = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500",
].join(" ")

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 에러 상태 */
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          textareaBaseStyles,
          error ? textareaErrorStyles : textareaDefaultStyles,
          className
        )}
        aria-invalid={error}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

/** TextareaField - label과 error 메시지를 포함한 Textarea 래퍼 */
export interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 라벨 텍스트 */
  label?: string
  /** 에러 상태 */
  error?: boolean
  /** 에러 메시지 */
  errorMessage?: string
  /** 라벨이 없어도 라벨 공간 유지 */
  reserveLabelSpace?: boolean
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ className, label, error, errorMessage, id, reserveLabelSpace, ...props }, ref) => {
    const textareaId = id || React.useId()

    return (
      <div className="flex flex-col gap-1 w-full">
        {(label || reserveLabelSpace) && (
          <label
            htmlFor={textareaId}
            className={cn(
              "text-[length:var(--text-body-2)] text-slate-600 dark:text-slate-50",
              !label && "invisible"
            )}
          >
            {label || "\u00A0"}
          </label>
        )}
        <Textarea
          id={textareaId}
          ref={ref}
          error={error}
          className={className}
          {...props}
        />
        {error && errorMessage && (
          <span className="text-[length:var(--text-body-2)] text-destructive dark:text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)
TextareaField.displayName = "TextareaField"

export { Textarea, TextareaField }
