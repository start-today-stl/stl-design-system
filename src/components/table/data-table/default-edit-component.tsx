import * as React from "react"

import { Input } from "@/components/ui/input"
import type { EditComponentProps } from "./types"

/** 기본 편집 컴포넌트 (Input) */
export function DefaultEditComponent<T>({
  value,
  onChange,
  onComplete,
  onCancel,
  error,
}: EditComponentProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null)

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

  return (
    <div className="flex flex-col gap-0.5">
      <Input
        ref={inputRef}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value as T[keyof T])}
        onKeyDown={handleKeyDown}
        onBlur={onComplete}
        error={!!error}
        tableMode
        className="w-full px-2 text-xs"
      />
      {error && (
        <span className="text-[10px] text-destructive dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  )
}
