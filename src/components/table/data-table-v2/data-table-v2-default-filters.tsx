import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import type { FilterOption } from "./types"

/**
 * v2 컬럼 헤더 필터에서 사용하는 기본 프리셋 컴포넌트 5종.
 * 사용처는 column.filter.type 만 지정하면 이 컴포넌트가 자동으로 렌더됨.
 * 특수 케이스는 { type: "custom", component } 이스케이프 해치로 처리.
 */

interface DefaultFilterProps<V = unknown> {
  value: V | undefined
  onChange: (value: V | undefined) => void
  onClose: () => void
}

/** 텍스트 필터 — 단순 문자열 검색 */
export function DefaultTextFilter({
  value,
  onChange,
  onClose,
  placeholder,
}: DefaultFilterProps<string> & { placeholder?: string }) {
  const [draft, setDraft] = React.useState<string>(value ?? "")
  React.useEffect(() => setDraft(value ?? ""), [value])
  return (
    <div className="flex flex-col gap-2">
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={placeholder ?? "검색"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange(draft || undefined)
            onClose()
          }
        }}
        aria-label="필터 검색"
      />
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => { onChange(undefined); onClose() }}>
          초기화
        </Button>
        <Button size="sm" onClick={() => { onChange(draft || undefined); onClose() }}>
          적용
        </Button>
      </div>
    </div>
  )
}

/** 셀렉트 필터 — 단일 값 선택 */
export function DefaultSelectFilter({
  value,
  onChange,
  onClose,
  options,
  placeholder,
}: DefaultFilterProps<string> & { options: FilterOption[]; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Select
        options={options}
        value={value}
        onValueChange={(v) => onChange(v || undefined)}
        placeholder={placeholder ?? "선택"}
        clearable
        aria-label="필터 선택"
      />
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => { onChange(undefined); onClose() }}>
          초기화
        </Button>
        <Button size="sm" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  )
}

/** 멀티셀렉트 필터 — 여러 값 선택 */
export function DefaultMultiSelectFilter({
  value,
  onChange,
  onClose,
  options,
  placeholder,
}: DefaultFilterProps<string[]> & { options: FilterOption[]; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Select
        multiple
        options={options}
        value={value ?? []}
        onValueChange={(v) => onChange(v.length ? v : undefined)}
        placeholder={placeholder ?? "선택"}
        aria-label="필터 다중 선택"
      />
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => { onChange(undefined); onClose() }}>
          초기화
        </Button>
        <Button size="sm" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  )
}

/** 날짜 범위 필터 */
export function DefaultDateRangeFilter({
  value,
  onChange,
  onClose,
}: DefaultFilterProps<DateRange>) {
  return (
    <div className="flex flex-col gap-2">
      <DateRangePicker
        value={value}
        onChange={(range) => onChange(range && (range.from || range.to) ? range : undefined)}
      />
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => { onChange(undefined); onClose() }}>
          초기화
        </Button>
        <Button size="sm" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  )
}

/** 숫자 범위 필터 — from/to 두 개 입력 */
export function DefaultNumberRangeFilter({
  value,
  onChange,
  onClose,
}: DefaultFilterProps<{ from?: number; to?: number }>) {
  const [draft, setDraft] = React.useState<{ from?: number; to?: number }>(
    value ?? {}
  )
  React.useEffect(() => setDraft(value ?? {}), [value])
  const apply = () => {
    const clean: { from?: number; to?: number } = {}
    if (draft.from !== undefined && !Number.isNaN(draft.from)) clean.from = draft.from
    if (draft.to !== undefined && !Number.isNaN(draft.to)) clean.to = draft.to
    onChange(clean.from !== undefined || clean.to !== undefined ? clean : undefined)
    onClose()
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={draft.from ?? ""}
          onChange={(e) => setDraft((p) => ({ ...p, from: e.target.value === "" ? undefined : Number(e.target.value) }))}
          placeholder="최소"
          aria-label="최소값"
        />
        <span className="text-xs text-slate-500 dark:text-slate-400">~</span>
        <Input
          type="number"
          value={draft.to ?? ""}
          onChange={(e) => setDraft((p) => ({ ...p, to: e.target.value === "" ? undefined : Number(e.target.value) }))}
          placeholder="최대"
          aria-label="최대값"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => { onChange(undefined); onClose() }}>
          초기화
        </Button>
        <Button size="sm" onClick={apply}>
          적용
        </Button>
      </div>
    </div>
  )
}
