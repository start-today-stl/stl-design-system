"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { DuplicationIcon } from "@/icons"

/** 값 표시 타입 */
export type DisplayFieldType = "text" | "email" | "phone" | "number" | "date"

/** 텍스트 오버플로우 처리 방식 */
export type TextOverflow = "wrap" | "ellipsis" | "truncate"

/** 너비 크기 */
export type DisplayFieldSize = "sm" | "md" | "lg" | "full"

const sizeStyles = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full",
} as const

/** 레이아웃 방향 */
export type DisplayFieldLayout = "vertical" | "horizontal"

export interface DisplayFieldProps {
  /** 라벨 텍스트 */
  label?: string
  /** 표시할 값 */
  value?: React.ReactNode
  /** 값이 비어있을 때 표시할 텍스트 (기본: "-") */
  emptyText?: string
  /** 너비 크기 */
  size?: DisplayFieldSize
  /** 값 타입에 따른 자동 포맷팅 */
  type?: DisplayFieldType
  /** 값 앞에 붙는 접두사 (예: "$", "₩") */
  prefix?: string
  /** 값 뒤에 붙는 접미사 (예: "원", "개", "%") */
  suffix?: string
  /** 텍스트 오버플로우 처리 (기본: "wrap") */
  textOverflow?: TextOverflow
  /** 복사 버튼 표시 */
  copyable?: boolean
  /** 복사 완료 시 콜백 */
  onCopy?: (value: string) => void
  /** 필수 필드 표시 (라벨 앞 점) */
  required?: boolean
  /** 도움말 텍스트 */
  helper?: string
  /** 추가 className (값 영역) */
  className?: string
  /** 라벨 className */
  labelClassName?: string
  /** 라벨이 없어도 라벨 공간 유지 */
  reserveLabelSpace?: boolean
  /** 커스텀 값 렌더러 (value를 완전히 커스텀) */
  renderValue?: (value: React.ReactNode) => React.ReactNode
  /** 레이아웃 방향 (기본: "vertical") */
  layout?: DisplayFieldLayout
  /** 라벨 너비 - horizontal 레이아웃에서만 적용 (기본: 100) */
  labelWidth?: number | string
}

interface FormatOptions {
  type?: DisplayFieldType
  prefix?: string
  suffix?: string
}

/**
 * 값 포맷팅 함수
 */
const formatValue = (value: React.ReactNode, options: FormatOptions = {}): React.ReactNode => {
  const { type, prefix, suffix } = options

  if (value === null || value === undefined || value === "") return null

  // ReactNode가 string이 아닌 경우 그대로 반환
  if (typeof value !== "string" && typeof value !== "number") return value

  const stringValue = String(value)

  let formattedValue: string

  switch (type) {
    case "phone":
      // 전화번호 포맷: 010-1234-5678
      formattedValue = stringValue.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      break

    case "number": {
      // 숫자 포맷: 1,234,567 (천단위 구분자)
      const numValue = typeof value === "number" ? value : parseFloat(stringValue.replace(/[^0-9.-]/g, ""))
      if (isNaN(numValue)) {
        formattedValue = stringValue
      } else {
        formattedValue = `${prefix || ""}${numValue.toLocaleString("ko-KR")}${suffix || ""}`
        return formattedValue
      }
      break
    }

    case "date": {
      // 날짜 포맷: YYYY.MM.DD
      const date = new Date(stringValue)
      if (isNaN(date.getTime())) {
        formattedValue = stringValue
      } else {
        formattedValue = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
      }
      break
    }

    case "email":
    case "text":
    default:
      formattedValue = stringValue
  }

  // prefix/suffix 적용 (money 제외 - 위에서 처리됨)
  return `${prefix || ""}${formattedValue}${suffix || ""}`
}

/** 상세 화면(View Mode)에서 라벨과 값을 표시하는 컴포넌트 */
export const DisplayField = React.forwardRef<HTMLDivElement, DisplayFieldProps>(
  (
    {
      label,
      value,
      emptyText = "-",
      size = "full",
      type = "text",
      prefix,
      suffix,
      textOverflow = "wrap",
      copyable = false,
      onCopy,
      required,
      helper,
      className,
      labelClassName,
      reserveLabelSpace,
      renderValue,
      layout = "vertical",
      labelWidth = 100,
    },
    ref
  ) => {
    const isHorizontal = layout === "horizontal"
    const labelWidthStyle = typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth
    const [copied, setCopied] = React.useState(false)

    // 값이 비어있는지 확인
    const isEmpty = value === null || value === undefined || value === ""

    // 포맷된 값
    const formattedValue = isEmpty ? emptyText : formatValue(value, { type, prefix, suffix })

    // 최종 표시 값 (커스텀 렌더러 적용)
    const displayValue = renderValue ? renderValue(formattedValue) : formattedValue

    // 복사 처리
    const handleCopy = async () => {
      if (isEmpty || typeof value !== "string" && typeof value !== "number") return

      const textToCopy = String(value)
      try {
        await navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        onCopy?.(textToCopy)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }

    // 텍스트 오버플로우 스타일
    const textOverflowStyles = {
      wrap: "whitespace-normal break-words",
      ellipsis: "whitespace-nowrap overflow-hidden text-ellipsis",
      truncate: "truncate",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-1",
          isHorizontal ? "flex-row items-center" : "flex-col",
          sizeStyles[size]
        )}
      >
        {/* 라벨 */}
        {(label || reserveLabelSpace) && (
          <span
            className={cn(
              "flex items-center gap-1 text-xs text-slate-700 dark:text-slate-400",
              !label && "invisible",
              isHorizontal && "shrink-0",
              labelClassName
            )}
            style={isHorizontal ? { width: labelWidthStyle } : undefined}
          >
            {required && (
              <span className="size-2 rounded-full bg-red-400" aria-hidden="true" />
            )}
            {label || "\u00A0"}
          </span>
        )}

        {/* 값 영역 */}
        <div className="relative flex items-center gap-2 flex-1">
          <span
            className={cn(
              "text-sm text-slate-900 dark:text-slate-100",
              // 최소 높이 확보 (InputField와 동일한 높이감) + 너비 채우기
              "min-h-[36px] flex items-center flex-1",
              isEmpty && "text-slate-400 dark:text-slate-500",
              textOverflowStyles[textOverflow],
              className
            )}
          >
            {displayValue}
          </span>

          {/* 복사 버튼 */}
          {copyable && !isEmpty && (
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "shrink-0 p-1 rounded transition-colors cursor-pointer",
                "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300",
                copied && "text-green-500 dark:text-green-400"
              )}
              aria-label={copied ? "복사됨" : "복사"}
            >
              <DuplicationIcon size={20} />
            </button>
          )}
        </div>

        {/* 도움말 텍스트 - vertical에서만 표시 */}
        {helper && !isHorizontal && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {helper}
          </span>
        )}
      </div>
    )
  }
)

DisplayField.displayName = "DisplayField"
