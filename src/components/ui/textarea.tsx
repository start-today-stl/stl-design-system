"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const textareaBaseStyles = [
  "flex w-full rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  // 높이는 `rows` prop 이 결정. 기본값은 컴포넌트 레벨에서 rows=3.
  // min-h 는 !important 로 지정 — resize-y 로 유저가 드래그해 min-h 이하로 축소하는
  // 브라우저 동작(일부 브라우저에서 min-h 무시)을 원천 차단.
  // 이전엔 min-h-[80px] 로 강제해 rows 프롭이 무력화되던 문제 있어 조정.
  "!min-h-9 px-3 py-2 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors resize-y",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ")

const textareaDefaultStyles = [
  "border-slate-200 dark:border-slate-500",
  "placeholder:text-slate-500 dark:placeholder:text-slate-500",
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
  /**
   * 내용에 따라 세로가 자동 확장.
   * - 켜면 유저 드래그 리사이즈는 꺼짐 (`resize-none`)
   * - `maxHeight` 지정 시 그 이상은 내부 스크롤
   * - `rows` 로 초기(=최소) 높이 조절 (기본 3)
   */
  autoGrow?: boolean
  /** autoGrow 최대 높이(px). 없으면 무제한 (뷰포트까지 늘어남) */
  maxHeight?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      errorMessage,
      id,
      reserveLabelSpace,
      required,
      tableMode,
      rows = 3,
      autoGrow,
      maxHeight,
      value,
      defaultValue,
      onInput,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId()

    // auto-grow 용 내부 ref. 외부 ref 와 병합해서 소비자도 계속 ref 접근 가능.
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null)
    const setRefs = React.useCallback(
      (el: HTMLTextAreaElement | null) => {
        innerRef.current = el
        if (typeof ref === "function") ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el
      },
      [ref]
    )

    // auto-grow: value 변경/입력마다 scrollHeight 로 높이 재계산.
    // controlled 는 value effect 로, uncontrolled 는 onInput 이벤트로 커버.
    const recalcHeight = React.useCallback(() => {
      if (!autoGrow) return
      const el = innerRef.current
      if (!el) return
      el.style.height = "auto"
      const next = maxHeight ? Math.min(el.scrollHeight, maxHeight) : el.scrollHeight
      el.style.height = `${next}px`
    }, [autoGrow, maxHeight])

    React.useLayoutEffect(() => {
      recalcHeight()
    }, [recalcHeight, value, defaultValue])

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoGrow) recalcHeight()
      onInput?.(e)
    }

    // 스타일 결정
    const getStyleVariant = () => {
      if (error) return textareaErrorStyles
      if (tableMode) return textareaTableModeStyles
      return textareaDefaultStyles
    }

    // autoGrow 시 유저 드래그 리사이즈 무효화, maxHeight 도달 시 내부 스크롤 허용
    const autoGrowClass = autoGrow ? "!resize-none overflow-y-auto" : ""

    // tableMode이고 label/errorMessage가 없으면 textarea만 렌더링 (wrapper 없음)
    const isMinimalMode = tableMode && !label && !reserveLabelSpace && !errorMessage

    if (isMinimalMode) {
      return (
        <textarea
          id={textareaId}
          ref={setRefs}
          required={required}
          className={cn(textareaBaseStyles, getStyleVariant(), autoGrowClass, className)}
          aria-invalid={error}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          onInput={handleInput}
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
              "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
              !label && "invisible"
            )}
          >
            {required && (
              <span className="size-2 rounded-full bg-red-400" aria-hidden="true" />
            )}
            {label || " "}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={setRefs}
          required={required}
          className={cn(textareaBaseStyles, getStyleVariant(), autoGrowClass, className)}
          aria-invalid={error}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          onInput={handleInput}
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
