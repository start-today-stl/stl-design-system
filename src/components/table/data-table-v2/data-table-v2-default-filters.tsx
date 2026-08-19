import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

/**
 * 옵션 목록 공용 셸 — 검색 + 스크롤 영역 + 하단 버튼
 *
 * 컬럼 헤더가 이미 "무엇을 거르는지" 를 말해주므로 팝오버 안에 Select 를 한 번 더
 * 두지 않는다. Select 를 쓰면 팝오버 위에 드롭다운이 겹쳐 뜨는 이중 구조가 된다.
 */
function FilterOptionShell({
  description,
  searchable,
  keyword,
  onKeywordChange,
  isEmpty,
  emptyMessage,
  onReset,
  onClose,
  children,
}: {
  description?: string
  searchable?: boolean
  keyword: string
  onKeywordChange: (v: string) => void
  isEmpty: boolean
  emptyMessage?: React.ReactNode
  onReset: () => void
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {searchable && (
        <Input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="검색"
          aria-label="필터 옵션 검색"
        />
      )}
      {isEmpty ? (
        <FilterEmptyMessage>{emptyMessage}</FilterEmptyMessage>
      ) : (
        // 옵션이 많아도 팝오버가 늘어나지 않도록 목록만 스크롤한다
        <div className="max-h-60 overflow-y-auto pr-1">{children}</div>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onReset}>
          초기화
        </Button>
        <Button size="sm" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  )
}

/** 키워드로 옵션 필터링 (대소문자 무시) */
function useFilteredOptions(options: FilterOption[], keyword: string) {
  return React.useMemo(() => {
    const q = keyword.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, keyword])
}

/** 셀렉트 필터 — 단일 값 선택 */
export function DefaultSelectFilter({
  value,
  onChange,
  onClose,
  options,
  emptyMessage,
  searchable,
  description,
}: DefaultFilterProps<string> & {
  options: FilterOption[]
  placeholder?: string
  emptyMessage?: string
  searchable?: boolean
  description?: string
}) {
  const [keyword, setKeyword] = React.useState("")
  const visible = useFilteredOptions(options, keyword)

  return (
    <FilterOptionShell
      description={description}
      searchable={searchable}
      keyword={keyword}
      onKeywordChange={setKeyword}
      // 다른 필터에 종속돼서 아직 옵션이 없을 수 있다. 검색 결과가 없는 경우와 구분한다.
      isEmpty={visible.length === 0}
      emptyMessage={options.length === 0 ? emptyMessage : "검색 결과가 없습니다."}
      onReset={() => {
        onChange(undefined)
        onClose()
      }}
      onClose={onClose}
    >
      <RadioGroup
        value={value ?? ""}
        onValueChange={(v) => onChange(v || undefined)}
        className="flex flex-col gap-1.5"
        aria-label="필터 선택"
      >
        {visible.map((option) => (
          <RadioGroupItem
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FilterOptionShell>
  )
}

/** 선택지가 없을 때 팝오버에 띄우는 안내 문구 */
function FilterEmptyMessage({ children }: { children?: React.ReactNode }) {
  return (
    <p className="text-xs text-slate-500 dark:text-slate-400">
      {children ?? "선택할 수 있는 항목이 없습니다."}
    </p>
  )
}

/** 멀티셀렉트 필터 — 여러 값 선택 */
export function DefaultMultiSelectFilter({
  value,
  onChange,
  onClose,
  options,
  emptyMessage,
  searchable,
  description,
}: DefaultFilterProps<string[]> & {
  options: FilterOption[]
  placeholder?: string
  emptyMessage?: string
  searchable?: boolean
  description?: string
}) {
  const [keyword, setKeyword] = React.useState("")
  const visible = useFilteredOptions(options, keyword)
  const selected = value ?? []
  // 기존 MultiSelect 는 searchable 여부와 무관하게 검색을 제공했다. 그 동작을 유지한다.
  const showSearch = searchable ?? true

  const toggle = (optionValue: string, checked: boolean) => {
    const next = checked
      ? [...selected, optionValue]
      : selected.filter((v) => v !== optionValue)
    onChange(next.length ? next : undefined)
  }

  return (
    <FilterOptionShell
      description={description}
      searchable={showSearch}
      keyword={keyword}
      onKeywordChange={setKeyword}
      isEmpty={visible.length === 0}
      emptyMessage={options.length === 0 ? emptyMessage : "검색 결과가 없습니다."}
      onReset={() => {
        onChange(undefined)
        onClose()
      }}
      onClose={onClose}
    >
      <div className="flex flex-col gap-1.5" role="group" aria-label="필터 다중 선택">
        {visible.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={selected.includes(option.value)}
            onCheckedChange={(checked) => toggle(option.value, checked === true)}
          />
        ))}
      </div>
    </FilterOptionShell>
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
