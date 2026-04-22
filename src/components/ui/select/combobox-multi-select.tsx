"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { UpIcon, XIcon } from "@/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import type { MultipleSelectProps, InternalSelectProps } from "./types";

const ComboboxMultiSelect = React.forwardRef<
  HTMLInputElement,
  Omit<MultipleSelectProps, "aria-label"> & InternalSelectProps
>(
  (
    {
      id,
      placeholder = "입력 또는 선택",
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
    const [inputText, setInputText] = React.useState("");
    const [isHovered, setIsHovered] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue || []);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    const isSelectingRef = React.useRef(false);
    const isComposingRef = React.useRef(false);

    const currentValue = value !== undefined ? value : internalValue;

    const filteredOptions = options.filter((option) =>
      !inputText || option.label.toLowerCase().includes(inputText.toLowerCase()),
    );

    // 드롭다운 열릴 때 하이라이트 초기화
    React.useEffect(() => {
      if (open && filteredOptions.length > 0) {
        setHighlightedIndex(0);
      }
    }, [open]);

    // 하이라이트된 아이템 스크롤
    React.useEffect(() => {
      if (open && highlightedIndex >= 0 && listRef.current) {
        const el = listRef.current.children[highlightedIndex] as HTMLElement;
        el?.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex, open]);

    const updateValue = (newValue: string[]) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handleToggle = (optionValue: string) => {
      isSelectingRef.current = true;
      const newValue = currentValue.includes(optionValue)
        ? currentValue.filter((v) => v !== optionValue)
        : [...currentValue, optionValue];
      updateValue(newValue);
      setInputText("");
      setTimeout(() => {
        inputRef.current?.focus();
        isSelectingRef.current = false;
      }, 0);
    };

    const handleAddFreeform = (text: string) => {
      if (!text.trim()) return;
      if (currentValue.includes(text)) {
        setInputText("");
        return;
      }
      const match = options.find(
        (opt) => opt.label.toLowerCase() === text.toLowerCase(),
      );
      const val = match ? match.value : text;
      if (!currentValue.includes(val)) {
        updateValue([...currentValue, val]);
      }
      setInputText("");
    };

    const handleRemove = (val: string, e: React.MouseEvent) => {
      e.stopPropagation();
      updateValue(currentValue.filter((v) => v !== val));
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      updateValue([]);
      setInputText("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
      if (!open) setOpen(true);
      setHighlightedIndex(0);
    };

    const handleFocus = () => {
      if (isSelectingRef.current) return;
      setOpen(true);
    };

    const handleBlur = () => {
      if (isSelectingRef.current) return;
      if (inputText) {
        handleAddFreeform(inputText);
      }
      setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      // IME 조합 중이면 무시 (한글 입력 시 중복 방지)
      if (isComposingRef.current) return;

      // Backspace로 마지막 칩 삭제
      if (e.key === "Backspace" && !inputText && currentValue.length > 0) {
        updateValue(currentValue.slice(0, -1));
        return;
      }

      if (!open) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      const enabledIndices = filteredOptions
        .map((opt, i) => (!opt.disabled ? i : -1))
        .filter((i) => i !== -1);

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const cur = enabledIndices.indexOf(highlightedIndex);
          setHighlightedIndex(enabledIndices[(cur + 1) % enabledIndices.length]);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const cur = enabledIndices.indexOf(highlightedIndex);
          setHighlightedIndex(enabledIndices[(cur - 1 + enabledIndices.length) % enabledIndices.length]);
          break;
        }
        case "Enter": {
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex] && !filteredOptions[highlightedIndex].disabled) {
            handleToggle(filteredOptions[highlightedIndex].value);
          } else if (inputText) {
            handleAddFreeform(inputText);
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          setOpen(false);
          inputRef.current?.blur();
          break;
        }
      }
    };

    const showClearButton = clearable && currentValue.length > 0 && isHovered && !disabled && !loading;

    // 칩 표시용: 옵션에 있는 값은 label, 없는 값은 값 자체
    const getDisplayLabel = (val: string) => {
      const opt = options.find((o) => o.value === val);
      return opt ? opt.label : val;
    };

    const allDisplayItems = currentValue.map((v) => ({
      value: v,
      label: getDisplayLabel(v),
    }));

    return (
      <PopoverPrimitive.Root open={open}>
        <PopoverPrimitive.Anchor asChild>
          <div
            className={cn(
              "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
              "px-3 py-1.5 text-xs outline-none transition-colors",
              "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
              error
                ? "border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]"
                : tableMode
                  ? "border-slate-300 dark:border-slate-500 focus-within:border-slate-500 focus-within:border-[1.5px] dark:focus-within:border-slate-300"
                  : "border-slate-100 dark:border-slate-600 focus-within:border-blue-500 focus-within:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => inputRef.current?.focus()}
          >
            <div className={cn(
              "flex flex-1 items-center gap-1",
              overflowMode === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
            )}>
              {overflowMode === "truncate" ? (
                <>
                  {allDisplayItems.slice(0, maxDisplayCount).map((item) => (
                    <span
                      key={item.value}
                      className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0"
                    >
                      <span className="truncate max-w-[80px]">{item.label}</span>
                      <span
                        role="img"
                        aria-label={`${item.label} 삭제`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => handleRemove(item.value, e)}
                        className="cursor-pointer flex-shrink-0"
                      >
                        <XIcon size={18} />
                      </span>
                    </span>
                  ))}
                  {allDisplayItems.length > maxDisplayCount && (
                    <span className="inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0">
                      +{allDisplayItems.length - maxDisplayCount}
                    </span>
                  )}
                </>
              ) : (
                allDisplayItems.map((item) => (
                  <span
                    key={item.value}
                    className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs"
                  >
                    {item.label}
                    <span
                      role="img"
                      aria-label={`${item.label} 삭제`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => handleRemove(item.value, e)}
                      className="cursor-pointer"
                    >
                      <XIcon size={18} />
                    </span>
                  </span>
                ))
              )}
              <input
                ref={(node) => {
                  (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
                  if (typeof ref === "function") ref(node);
                  else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
                }}
                id={id}
                type="text"
                disabled={disabled || loading}
                value={inputText}
                placeholder={currentValue.length === 0 ? placeholder : ""}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => { isComposingRef.current = true; }}
                onCompositionEnd={() => { isComposingRef.current = false; }}
                className={cn(
                  "flex-1 bg-transparent text-xs outline-none min-w-[60px]",
                  "placeholder:text-slate-500 dark:placeholder:text-slate-500",
                  "text-slate-900 dark:text-slate-50",
                )}
                aria-invalid={error}
                aria-label={ariaLabel}
                autoComplete="off"
              />
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {showClearButton && (
                <span
                  role="button"
                  aria-label="전체 선택 초기화"
                  onMouseDown={(e) => e.preventDefault()}
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
          </div>
        </PopoverPrimitive.Anchor>

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
            onCloseAutoFocus={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div ref={listRef} className="flex flex-col gap-[5px] max-h-[240px] overflow-y-auto" role="listbox">
              {filteredOptions.length === 0 ? (
                <div className="py-2 text-center text-xs text-slate-500">
                  {inputText ? "검색 결과가 없습니다. Enter로 직접 추가" : "옵션이 없습니다."}
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = currentValue.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => !option.disabled && handleToggle(option.value)}
                      className={cn(
                        "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                        "text-xs text-slate-800 dark:text-slate-50 outline-none",
                        "hover:bg-slate-100 dark:hover:bg-slate-700",
                        option.disabled && "pointer-events-none opacity-50",
                        highlightedIndex === index && "bg-slate-100 dark:bg-slate-700",
                      )}
                    >
                      <Checkbox
                        checked={isSelected}
                        className="pointer-events-none h-4 w-4"
                      />
                      {option.label}
                    </div>
                  );
                })
              )}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);
ComboboxMultiSelect.displayName = "ComboboxMultiSelect";

export { ComboboxMultiSelect };
