"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { SearchIcon, STLArrowIcon } from "@/icons"

export interface SearchHistoryItem {
  id: string
  text: string
}

export interface SearchBarProps {
  /** 플레이스홀더 텍스트 */
  placeholder?: string
  /** 검색어 */
  value?: string
  /** 검색어 변경 핸들러 */
  onChange?: (value: string) => void
  /** 검색 실행 핸들러 (Enter 키) */
  onSearch?: (value: string) => void
  /** 최근 검색어 목록 */
  recentSearches?: SearchHistoryItem[]
  /** 최근 검색어 클릭 핸들러 */
  onRecentSearchClick?: (item: SearchHistoryItem) => void
  /** 추가 className */
  className?: string
  /** 비활성화 */
  disabled?: boolean
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      placeholder = "검색어를 입력하세요",
      value,
      onChange,
      onSearch,
      recentSearches = [],
      onRecentSearchClick,
      className,
      disabled,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState("")
    const containerRef = React.useRef<HTMLDivElement>(null)

    const searchValue = value !== undefined ? value : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(searchValue)
        setOpen(false)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    const handleRecentClick = (item: SearchHistoryItem) => {
      if (value === undefined) {
        setInternalValue(item.text)
      }
      onChange?.(item.text)
      onRecentSearchClick?.(item)
      setOpen(false)
    }

    // 외부 클릭 감지
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [open])

    const showDropdown = open && recentSearches.length > 0

    return (
      <div ref={containerRef} className="relative">
        <div
          className={cn(
            "relative flex h-9 items-center gap-2 rounded-[20px] border",
            "bg-white dark:bg-slate-800",
            "border-slate-100 dark:border-slate-600",
            "px-3 cursor-text",
            "focus-within:border-slate-500 dark:focus-within:border-slate-100",
            "transition-colors",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <SearchIcon size={20} className="text-slate-500 dark:text-slate-50 shrink-0" />
          <input
            ref={ref}
            type="text"
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => !disabled && setOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "flex-1 bg-transparent text-xs outline-none",
              "text-slate-900 dark:text-slate-50",
              "placeholder:text-slate-300 dark:placeholder:text-slate-50",
              "disabled:cursor-not-allowed"
            )}
          />
          <STLArrowIcon size={24} className="text-blue-500 dark:text-slate-50 shrink-0" />
        </div>

        {showDropdown && (
          <div
            className={cn(
              "absolute left-0 right-0 top-full mt-[13px] z-[100]",
              "overflow-hidden rounded-[5px] border",
              "border-slate-100 dark:border-slate-600",
              "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
              "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
              "p-[5px]",
              "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
            )}
          >
            {recentSearches.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleRecentClick(item)}
                className={cn(
                  "flex h-[29px] w-full cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                  "text-xs text-slate-500 dark:text-slate-300 text-left",
                  "hover:bg-slate-100 dark:hover:bg-slate-700",
                  "focus:bg-slate-100 dark:focus:bg-slate-700 outline-none",
                  "transition-colors"
                )}
              >
                {item.text}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"

export { SearchBar }
