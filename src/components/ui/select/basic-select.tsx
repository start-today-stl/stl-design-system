"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { UpIcon, XIcon } from "@/icons";
import { Spinner } from "@/components/ui/spinner";
import type { SingleSelectProps, InternalSelectProps } from "./types";

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
                    "text-xs text-slate-800 dark:text-slate-50 outline-none",
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

export { BasicSelect };
