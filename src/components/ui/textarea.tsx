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
  "placeholder:text-slate-300 dark:placeholder:text-slate-500",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
].join(" ")

const textareaErrorStyles = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500",
].join(" ")

const textareaTableModeStyles = [
  "border-slate-300 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-500",
  "focus:border-slate-500 focus:border-[1.5px] focus:shadow-none dark:focus:border-slate-300",
].join(" ")

/** Textarea 컴포넌트 Props */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 라벨 텍스트 */
  label?: string
  /** 에러 상태 */
  error?: boolean
  /** 에러 메시지 */
  errorMessage?: string
  /** 라벨이 없어도 라벨 공간 유지 */
  reserveLabelSpace?: boolean
  /** 필수 입력 표시 (라벨 앞에 점 표시) */
  required?: boolean
  /** 테이블 모드 (파란 glow 대신 border 강조, wrapper 최소화) */
  tableMode?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, errorMessage, id, reserveLabelSpace, required, tableMode, ...props }, ref) => {
    const textareaId = id || React.useId()

    // 스타일 결정
    const getStyleVariant = () => {
      if (error) return textareaErrorStyles
      if (tableMode) return textareaTableModeStyles
      return textareaDefaultStyles
    }

    // tableMode이고 label/errorMessage가 없으면 textarea만 렌더링 (wrapper 없음)
    const isMinimalMode = tableMode && !label && !reserveLabelSpace && !errorMessage

    if (isMinimalMode) {
      return (
        <textarea
          id={textareaId}
          ref={ref}
          required={required}
          className={cn(textareaBaseStyles, getStyleVariant(), className)}
          aria-invalid={error}
          {...props}
        />
      )
    }

    return (
      <div className="flex flex-col gap-1 w-full">
        {(label || reserveLabelSpace) && (
          <label
            htmlFor={textareaId}
            className={cn(
              "flex items-center gap-1 text-xs text-slate-700 dark:text-slate-400",
              !label && "invisible"
            )}
          >
            {required && (
              <span className="size-2 rounded-full bg-red-400" aria-hidden="true" />
            )}
            {label || "\u00A0"}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          required={required}
          className={cn(textareaBaseStyles, getStyleVariant(), className)}
          aria-invalid={error}
          {...props}
        />
        {error && errorMessage && (
          <span className="text-xs text-destructive dark:text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

/**
 * @deprecated Textarea를 사용하세요 (동일한 기능)
 */
const TextareaField = Textarea

export { Textarea, TextareaField }
