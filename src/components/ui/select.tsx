"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { UpIcon, SearchIcon, XIcon } from "@/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { inputSizeStyles, type InputSize } from "./input";

/** @deprecated Use InputSize instead */
export type SelectSize = InputSize;

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

// Base props shared by all variants
interface SelectBaseProps {
  /** 라벨 텍스트 */
  label?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 옵션 목록 */
  options: SelectOption[];
  /** 너비 크기 */
  size?: SelectSize;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 추가 className */
  className?: string;
  /** 접근성 라벨 (label이 없을 때 사용) */
  "aria-label"?: string;
  /** 테이블 모드 (파란 glow 대신 border 강조) */
  tableMode?: boolean;
  /** 라벨이 없어도 라벨 공간 유지 */
  reserveLabelSpace?: boolean;
  /** 필수 입력 표시 (라벨 앞에 점 표시) */
  required?: boolean;
  /** 검색 기능 활성화 */
  searchable?: boolean;
  /** 검색 플레이스홀더 */
  searchPlaceholder?: string;
  /** 전체 삭제 버튼 표시 (기본: true) */
  clearable?: boolean;
  /** 로딩 상태 (스피너 표시) */
  loading?: boolean;
}

// Single select props (default)
interface SingleSelectProps extends SelectBaseProps {
  /** 다중 선택 모드 */
  multiple?: false;
  /** 선택된 값 */
  value?: string;
  /** 기본 선택 값 */
  defaultValue?: string;
  /** 값 변경 핸들러 */
  onValueChange?: (value: string) => void;
}

/** 칩 오버플로우 처리 방식 */
export type ChipOverflowMode = "wrap" | "truncate";

// Multiple select props
interface MultipleSelectProps extends SelectBaseProps {
  /** 다중 선택 모드 */
  multiple: true;
  /** 선택된 값 배열 */
  value?: string[];
  /** 기본 선택 값 배열 */
  defaultValue?: string[];
  /** 값 변경 핸들러 */
  onValueChange?: (value: string[]) => void;
  /** 칩 오버플로우 처리 방식 (기본: truncate) */
  overflowMode?: ChipOverflowMode;
  /** truncate 모드에서 최대 표시할 칩 개수 (기본: 2) */
  maxDisplayCount?: number;
}

export type SelectProps = SingleSelectProps | MultipleSelectProps;

// Internal props for sub-components
interface InternalSelectProps {
  id: string;
  ariaLabel?: string;
}

// Basic Select (non-searchable, single)
const BasicSelect = React.forwardRef<
  HTMLButtonElement,
  Omit<SingleSelectProps, "aria-label"> & InternalSelectProps
>(
  (
    {
      id,
      placeholder = "선택하세요",
      options,
      value,
      defaultValue,
      onValueChange,
      error,
      disabled,
      ariaLabel,
      tableMode,
      clearable = true,
      loading,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const listRef = React.useRef<HTMLDivElement>(null);

    const currentValue = value !== undefined ? value : internalValue;
    const selectedOption = options.find((opt) => opt.value === currentValue);

    // 드롭다운 열릴 때 현재 선택된 값의 인덱스로 하이라이트 초기화
    React.useEffect(() => {
      if (open) {
        const selectedIndex = options.findIndex((opt) => opt.value === currentValue);
        setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      }
    }, [open, currentValue, options]);

    // 하이라이트된 아이템이 보이도록 스크롤
    React.useEffect(() => {
      if (open && highlightedIndex >= 0 && listRef.current) {
        const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
        if (highlightedElement) {
          highlightedElement.scrollIntoView({ block: "nearest" });
        }
      }
    }, [highlightedIndex, open]);

    const handleSelect = (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      onValueChange?.(optionValue);
      setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (value === undefined) {
        setInternalValue("");
      }
      onValueChange?.("");
    };

    // 키보드 네비게이션 핸들러
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!open) return;

      const enabledIndices = options
        .map((opt, i) => (!opt.disabled ? i : -1))
        .filter((i) => i !== -1);

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const currentEnabledIndex = enabledIndices.indexOf(highlightedIndex);
          const nextEnabledIndex = enabledIndices[
            (currentEnabledIndex + 1) % enabledIndices.length
          ];
          setHighlightedIndex(nextEnabledIndex);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const currentEnabledIndex = enabledIndices.indexOf(highlightedIndex);
          const prevEnabledIndex = enabledIndices[
            (currentEnabledIndex - 1 + enabledIndices.length) % enabledIndices.length
          ];
          setHighlightedIndex(prevEnabledIndex);
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (highlightedIndex >= 0 && !options[highlightedIndex]?.disabled) {
            handleSelect(options[highlightedIndex].value);
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          setOpen(false);
          break;
        }
        case "Home": {
          e.preventDefault();
          if (enabledIndices.length > 0) {
            setHighlightedIndex(enabledIndices[0]);
          }
          break;
        }
        case "End": {
          e.preventDefault();
          if (enabledIndices.length > 0) {
            setHighlightedIndex(enabledIndices[enabledIndices.length - 1]);
          }
          break;
        }
      }
    };

    // X 버튼 표시 여부 (hover 시에만)
    const showClearButton = clearable && currentValue && isHovered && !disabled && !loading;

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger
          ref={ref}
          id={id}
          disabled={disabled || loading}
          className={cn(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]"
              : tableMode
                ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300"
                : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
          )}
          aria-invalid={error}
          aria-label={ariaLabel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={handleKeyDown}
        >
          <span
            className={cn(
              "truncate",
              !selectedOption && "text-slate-300 dark:text-slate-500",
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {showClearButton && (
              <span
                role="button"
                aria-label="선택 초기화"
                onClick={handleClear}
                className="flex items-center"
              >
                <span className="p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                  <XIcon size={20} />
                </span>
              </span>
            )}
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <UpIcon
                size={24}
                className={cn(
                  "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                  open && "rotate-180",
                )}
              />
            )}
          </div>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            className={cn(
              "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
              "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
              "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
              "p-[5px]",
              "animate-in fade-in-0 zoom-in-95",
            )}
            sideOffset={4}
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div ref={listRef} className="flex flex-col gap-[5px] max-h-[240px] overflow-y-auto" role="listbox">
              {options.map((option, index) => (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={currentValue === option.value}
                  aria-disabled={option.disabled}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={cn(
                    "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                    "text-xs text-slate-700 dark:text-slate-50 outline-none",
                    "hover:bg-slate-100 dark:hover:bg-slate-700",
                    option.disabled && "pointer-events-none opacity-50",
                    currentValue === option.value && "bg-accent text-accent-foreground",
                    highlightedIndex === index && "bg-slate-100 dark:bg-slate-700",
                  )}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);
BasicSelect.displayName = "BasicSelect";

// Searchable Select (single)
const SearchableSelect = React.forwardRef<
  HTMLButtonElement,
  Omit<SingleSelectProps, "aria-label"> & InternalSelectProps
>(
  (
    {
      id,
      placeholder = "선택하세요",
      searchPlaceholder = "검색...",
      options,
      value,
      defaultValue,
      onValueChange,
      error,
      disabled,
      ariaLabel,
      tableMode,
      clearable = true,
      loading,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [isHovered, setIsHovered] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const [highlightedValue, setHighlightedValue] = React.useState("");
    const listRef = React.useRef<HTMLDivElement>(null);

    const currentValue = value !== undefined ? value : internalValue;
    const selectedOption = options.find((opt) => opt.value === currentValue);

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );

    // 드롭다운 열릴 때 하이라이트 초기화
    React.useEffect(() => {
      if (open && filteredOptions.length > 0) {
        const selected = filteredOptions.find((opt) => opt.value === currentValue);
        setHighlightedValue(selected?.label || filteredOptions[0].label);
      }
    }, [open]);

    // 아이템으로 스크롤 이동
    const scrollToItem = (label: string) => {
      if (listRef.current) {
        const item = listRef.current.querySelector(`[data-value="${label.toLowerCase()}"]`) as HTMLElement;
        item?.scrollIntoView({ block: "nearest" });
      }
    };

    const handleSelect = (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      onValueChange?.(optionValue);
      setOpen(false);
      setSearch("");
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (value === undefined) {
        setInternalValue("");
      }
      onValueChange?.("");
    };

    // 키보드 핸들러 (Home/End + Arrow 순환)
    const handleKeyDown = (e: React.KeyboardEvent) => {
      const enabledOptions = filteredOptions.filter((opt) => !opt.disabled);
      if (enabledOptions.length === 0) return;

      const currentIndex = enabledOptions.findIndex((opt) => opt.label === highlightedValue);

      if (e.key === "Home") {
        e.preventDefault();
        const targetLabel = enabledOptions[0].label;
        setHighlightedValue(targetLabel);
        scrollToItem(targetLabel);
      } else if (e.key === "End") {
        e.preventDefault();
        const targetLabel = enabledOptions[enabledOptions.length - 1].label;
        setHighlightedValue(targetLabel);
        scrollToItem(targetLabel);
      } else if (e.key === "ArrowDown") {
        // 마지막에서 아래로 가면 첫 번째로 순환
        if (currentIndex === enabledOptions.length - 1) {
          e.preventDefault();
          const targetLabel = enabledOptions[0].label;
          setHighlightedValue(targetLabel);
          scrollToItem(targetLabel);
        }
      } else if (e.key === "ArrowUp") {
        // 첫 번째에서 위로 가면 마지막으로 순환
        if (currentIndex === 0) {
          e.preventDefault();
          const targetLabel = enabledOptions[enabledOptions.length - 1].label;
          setHighlightedValue(targetLabel);
          scrollToItem(targetLabel);
        }
      }
    };

    // X 버튼 표시 여부 (hover 시에만)
    const showClearButton = clearable && currentValue && isHovered && !disabled && !loading;

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger
          ref={ref}
          id={id}
          disabled={disabled || loading}
          className={cn(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]"
              : tableMode
                ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300"
                : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
          )}
          aria-invalid={error}
          aria-label={ariaLabel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span
            className={cn(
              "truncate",
              !selectedOption && "text-slate-300 dark:text-slate-500",
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {showClearButton && (
              <span
                role="button"
                aria-label="선택 초기화"
                onClick={handleClear}
                className="flex items-center"
              >
                <span className="p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                  <XIcon size={20} />
                </span>
              </span>
            )}
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <UpIcon
                size={24}
                className={cn(
                  "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                  open && "rotate-180",
                )}
              />
            )}
          </div>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            className={cn(
              "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
              "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
              "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
              "p-[5px]",
              "animate-in fade-in-0 zoom-in-95",
            )}
            sideOffset={4}
            align="start"
          >
            <CommandPrimitive
              className="flex flex-col"
              value={highlightedValue}
              onValueChange={setHighlightedValue}
            >
              <div className="flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600">
                <SearchIcon size={20} className="text-slate-400" />
                <CommandPrimitive.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder={searchPlaceholder}
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                  onKeyDown={handleKeyDown}
                />
              </div>
              <CommandPrimitive.List ref={listRef} className="flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2">
                <CommandPrimitive.Empty className="py-2 text-center text-xs text-slate-500">
                  검색 결과가 없습니다.
                </CommandPrimitive.Empty>
                {filteredOptions.map((option) => (
                  <CommandPrimitive.Item
                    key={option.value}
                    value={option.label}
                    disabled={option.disabled}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                      "text-xs text-slate-700 dark:text-slate-50 outline-none",
                      "hover:bg-slate-100 dark:hover:bg-slate-700",
                      "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                      currentValue === option.value &&
                        "bg-accent text-accent-foreground",
                    )}
                  >
                    {option.label}
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.List>
            </CommandPrimitive>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);
SearchableSelect.displayName = "SearchableSelect";

// Multi Select (searchable, multiple)
const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  Omit<MultipleSelectProps, "aria-label"> & InternalSelectProps
>(
  (
    {
      id,
      placeholder = "선택하세요",
      searchPlaceholder = "검색...",
      options,
      value,
      defaultValue,
      onValueChange,
      error,
      disabled,
      ariaLabel,
      tableMode,
      overflowMode = "truncate",
      maxDisplayCount = 2,
      clearable = true,
      loading,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [isHovered, setIsHovered] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<string[]>(
      defaultValue || [],
    );
    const [highlightedValue, setHighlightedValue] = React.useState("");
    const listRef = React.useRef<HTMLDivElement>(null);

    const currentValue = value !== undefined ? value : internalValue;
    const selectedOptions = options.filter((opt) =>
      currentValue.includes(opt.value),
    );

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );

    // 드롭다운 열릴 때 하이라이트 초기화
    React.useEffect(() => {
      if (open && filteredOptions.length > 0) {
        setHighlightedValue(filteredOptions[0].label);
      }
    }, [open]);

    // 아이템으로 스크롤 이동
    const scrollToItem = (label: string) => {
      if (listRef.current) {
        const item = listRef.current.querySelector(`[data-value="${label.toLowerCase()}"]`) as HTMLElement;
        item?.scrollIntoView({ block: "nearest" });
      }
    };

    const handleToggle = (optionValue: string) => {
      const newValue = currentValue.includes(optionValue)
        ? currentValue.filter((v) => v !== optionValue)
        : [...currentValue, optionValue];

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handleRemove = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const newValue = currentValue.filter((v) => v !== optionValue);
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (value === undefined) {
        setInternalValue([]);
      }
      onValueChange?.([]);
    };

    // 키보드 핸들러 (Home/End + Arrow 순환)
    const handleKeyDown = (e: React.KeyboardEvent) => {
      const enabledOptions = filteredOptions.filter((opt) => !opt.disabled);
      if (enabledOptions.length === 0) return;

      const currentIndex = enabledOptions.findIndex((opt) => opt.label === highlightedValue);

      if (e.key === "Home") {
        e.preventDefault();
        const targetLabel = enabledOptions[0].label;
        setHighlightedValue(targetLabel);
        scrollToItem(targetLabel);
      } else if (e.key === "End") {
        e.preventDefault();
        const targetLabel = enabledOptions[enabledOptions.length - 1].label;
        setHighlightedValue(targetLabel);
        scrollToItem(targetLabel);
      } else if (e.key === "ArrowDown") {
        // 마지막에서 아래로 가면 첫 번째로 순환
        if (currentIndex === enabledOptions.length - 1) {
          e.preventDefault();
          const targetLabel = enabledOptions[0].label;
          setHighlightedValue(targetLabel);
          scrollToItem(targetLabel);
        }
      } else if (e.key === "ArrowUp") {
        // 첫 번째에서 위로 가면 마지막으로 순환
        if (currentIndex === 0) {
          e.preventDefault();
          const targetLabel = enabledOptions[enabledOptions.length - 1].label;
          setHighlightedValue(targetLabel);
          scrollToItem(targetLabel);
        }
      }
    };

    // X 버튼 표시 여부 (hover 시에만)
    const showClearButton = clearable && currentValue.length > 0 && isHovered && !disabled && !loading;

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger
          ref={ref}
          id={id}
          disabled={disabled || loading}
          className={cn(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]"
              : tableMode
                ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300"
                : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
          )}
          aria-invalid={error}
          aria-label={ariaLabel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={cn(
            "flex flex-1 gap-1",
            overflowMode === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
          )}>
            {selectedOptions.length === 0 ? (
              <span className="text-slate-500 dark:text-slate-50">
                {placeholder}
              </span>
            ) : overflowMode === "truncate" ? (
              <>
                {selectedOptions.slice(0, maxDisplayCount).map((option) => (
                  <span
                    key={option.value}
                    className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0"
                  >
                    <span className="truncate max-w-[80px]">{option.label}</span>
                    <span
                      role="img"
                      aria-label={`${option.label} 삭제`}
                      onClick={(e) => handleRemove(option.value, e)}
                      className="cursor-pointer flex-shrink-0"
                    >
                      <XIcon size={18} />
                    </span>
                  </span>
                ))}
                {selectedOptions.length > maxDisplayCount && (
                  <span className="inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0">
                    +{selectedOptions.length - maxDisplayCount}
                  </span>
                )}
              </>
            ) : (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs"
                >
                  {option.label}
                  <span
                    role="img"
                    aria-label={`${option.label} 삭제`}
                    onClick={(e) => handleRemove(option.value, e)}
                    className="cursor-pointer"
                  >
                    <XIcon size={18} />
                  </span>
                </span>
              ))
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {showClearButton && (
              <span
                role="button"
                aria-label="전체 선택 초기화"
                onClick={handleClearAll}
                className="flex items-center"
              >
                <span className="p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                  <XIcon size={20} />
                </span>
              </span>
            )}
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <UpIcon
                size={24}
                className={cn(
                  "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                  open && "rotate-180",
                )}
              />
            )}
          </div>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            className={cn(
              "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
              "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
              "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
              "p-[5px]",
              "animate-in fade-in-0 zoom-in-95",
            )}
            sideOffset={4}
            align="start"
          >
            <CommandPrimitive
              className="flex flex-col"
              value={highlightedValue}
              onValueChange={setHighlightedValue}
            >
              <div className="flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600">
                <SearchIcon size={20} className="text-slate-400" />
                <CommandPrimitive.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder={searchPlaceholder}
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                  onKeyDown={handleKeyDown}
                />
              </div>
              <CommandPrimitive.List ref={listRef} className="flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2">
                <CommandPrimitive.Empty className="py-2 text-center text-xs text-slate-500">
                  검색 결과가 없습니다.
                </CommandPrimitive.Empty>
                {filteredOptions.map((option) => {
                  const isSelected = currentValue.includes(option.value);
                  return (
                    <CommandPrimitive.Item
                      key={option.value}
                      value={option.label}
                      disabled={option.disabled}
                      onSelect={() => handleToggle(option.value)}
                      className={cn(
                        "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                        "text-xs text-slate-700 dark:text-slate-50 outline-none",
                        "hover:bg-slate-100 dark:hover:bg-slate-700",
                        "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                      )}
                    >
                      <Checkbox
                        checked={isSelected}
                        className="pointer-events-none h-4 w-4"
                      />
                      {option.label}
                    </CommandPrimitive.Item>
                  );
                })}
              </CommandPrimitive.List>
            </CommandPrimitive>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);
MultiSelect.displayName = "MultiSelect";

// Main Select component
const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (props, ref) => {
    const {
      label,
      size = "full",
      error,
      errorMessage,
      className,
      "aria-label": ariaLabel,
      reserveLabelSpace,
      required,
      searchable = false,
      multiple = false,
    } = props;

    const id = React.useId();

    // Render appropriate select variant
    const renderSelect = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { "aria-label": _, ...restProps } = props;

      if (multiple) {
        return (
          <MultiSelect
            ref={ref}
            id={id}
            ariaLabel={ariaLabel}
            {...(restProps as Omit<MultipleSelectProps, "aria-label">)}
          />
        );
      }

      if (searchable) {
        return (
          <SearchableSelect
            ref={ref}
            id={id}
            ariaLabel={ariaLabel}
            {...(restProps as Omit<SingleSelectProps, "aria-label">)}
          />
        );
      }

      return (
        <BasicSelect
          ref={ref}
          id={id}
          ariaLabel={ariaLabel}
          {...(restProps as Omit<SingleSelectProps, "aria-label">)}
        />
      );
    };

    return (
      <div
        className={cn(
          "flex flex-col gap-1",
          inputSizeStyles[size],
          className,
        )}
      >
        {(label || reserveLabelSpace) && (
          <label
            htmlFor={id}
            className={cn(
              "flex items-center gap-1 text-xs text-slate-700 dark:text-slate-400",
              !label && "invisible",
            )}
          >
            {required && (
              <span className="size-2 rounded-full bg-red-400" aria-hidden="true" />
            )}
            {label || "\u00A0"}
          </label>
        )}
        {renderSelect()}
        {error && errorMessage && (
          <span className="text-xs text-destructive dark:text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select, inputSizeStyles };
