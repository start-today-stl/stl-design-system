import * as React from "react"

import { Input } from "@/components/ui/input"
import type { EditComponentProps } from "./types"

/**
 * 숫자 편집 컴포넌트.
 * - 콤마 포맷 자동 적용 (1,234)
 * - 숫자 외 문자 입력 차단
 * - 우측 정렬 (숫자 컬럼 관례)
 * - Enter: onComplete / Escape: onCancel / blur: onComplete
 *
 * 사용처는 `column.editComponent = DataTableV2NumberEdit` 로 지정.
 * 기본 문자열 편집(DataTableV2DefaultEdit) 대체.
 */

const formatWithComma = (value: string | number | null | undefined): string => {
  if (value === "" || value === null || value === undefined) return ""
  const num = String(value).replace(/,/g, "")
  if (isNaN(Number(num))) return String(value)
  return Number(num).toLocaleString()
}

const removeComma = (value: string): string => value.replace(/,/g, "")

export function DataTableV2NumberEdit<T>({
  value,
  onChange,
  onComplete,
  onCancel,
  error,
}: EditComponentProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [displayValue, setDisplayValue] = React.useState(() =>
    formatWithComma(value as string | number)
  )

  React.useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onComplete()
    } else if (e.key === "Escape") {
      e.preventDefault()
      onCancel()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const numericValue = removeComma(inputValue)

    // 숫자 외 문자는 차단 (빈 문자열은 허용)
    if (numericValue !== "" && isNaN(Number(numericValue))) return

    setDisplayValue(formatWithComma(numericValue))
    // 실제 값은 콤마 없는 문자열로 저장 (사용처가 Number 변환)
    onChange(numericValue as T[keyof T])
  }

  return (
    <div className="flex flex-col gap-0.5 w-full">
      <Input
        ref={inputRef}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={onComplete}
        error={!!error}
        tableMode
        className="w-full px-2 text-xs text-right"
      />
      {error && (
        <span className="text-[10px] text-destructive dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  )
}
