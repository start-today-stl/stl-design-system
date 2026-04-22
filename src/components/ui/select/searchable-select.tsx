"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { UpIcon, SearchIcon, XIcon } from "@/icons";
import { Spinner } from "@/components/ui/spinner";
import type { SingleSelectProps, InternalSelectProps } from "./types";

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
        if (currentIndex === enabledOptions.length - 1) {
          e.preventDefault();
          const targetLabel = enabledOptions[0].label;
          setHighlightedValue(targetLabel);
          scrollToItem(targetLabel);
        }
      } else if (e.key === "ArrowUp") {
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
                : "border-slate-200 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
          )}
          aria-invalid={error}
          aria-label={ariaLabel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span
            className={cn(
              "truncate",
              !selectedOption && "text-slate-500 dark:text-slate-500",
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
              "z-50 rounded-[5px] border border-slate-200 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
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
              <div className="flex items-center gap-2 px-2 pb-2 border-b border-slate-200 dark:border-slate-600">
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
                      "text-xs text-slate-800 dark:text-slate-50 outline-none",
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

export { SearchableSelect };
