"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { UpIcon, XIcon } from "@/icons";
import { Spinner } from "@/components/ui/spinner";
import type { SingleSelectProps, InternalSelectProps } from "./types";

const ComboboxSelect = React.forwardRef<
  HTMLInputElement,
  Omit<SingleSelectProps, "aria-label"> & InternalSelectProps
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
      clearable = true,
      loading,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [inputText, setInputText] = React.useState("");
    const [isHovered, setIsHovered] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    const isSelectingRef = React.useRef(false);
    const isComposingRef = React.useRef(false);

    const currentValue = value !== undefined ? value : internalValue;
    const selectedOption = options.find((opt) => opt.value === currentValue);

    // 입력 중이 아닐 때 선택된 옵션 라벨 표시
    const [isEditing, setIsEditing] = React.useState(false);

    const displayText = isEditing ? inputText : (selectedOption?.label || currentValue || "");

    const filteredOptions = options.filter((option) =>
      !isEditing || option.label.toLowerCase().includes(inputText.toLowerCase()),
    );

    // 드롭다운 열릴 때 하이라이트 초기화
    React.useEffect(() => {
      if (open && filteredOptions.length > 0) {
        const selectedIndex = filteredOptions.findIndex((opt) => opt.value === currentValue);
        setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      }
    }, [open]);

    // 하이라이트된 아이템 스크롤
    React.useEffect(() => {
      if (open && highlightedIndex >= 0 && listRef.current) {
        const el = listRef.current.children[highlightedIndex] as HTMLElement;
        el?.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex, open]);

    const commitValue = (val: string) => {
      if (value === undefined) {
        setInternalValue(val);
      }
      onValueChange?.(val);
    };

    const handleSelect = (optionValue: string) => {
      isSelectingRef.current = true;
      commitValue(optionValue);
      setIsEditing(false);
      setInputText("");
      setOpen(false);
      setTimeout(() => {
        isSelectingRef.current = false;
      }, 0);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      commitValue("");
      setInputText("");
      setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
      setIsEditing(true);
      if (!open) setOpen(true);
      setHighlightedIndex(0);
    };

    const handleFocus = () => {
      if (isSelectingRef.current) return;
      setIsEditing(true);
      setInputText(selectedOption?.label || currentValue || "");
      setOpen(true);
    };

    const handleBlur = () => {
      if (isSelectingRef.current) return;
      if (isEditing && inputText) {
        const match = options.find(
          (opt) => opt.label.toLowerCase() === inputText.toLowerCase(),
        );
        commitValue(match ? match.value : inputText);
      } else if (isEditing && !inputText) {
        commitValue("");
      }
      setIsEditing(false);
      setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      // IME 조합 중이면 무시 (한글 입력 시 중복 방지)
      if (isComposingRef.current) return;

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
            handleSelect(filteredOptions[highlightedIndex].value);
          } else if (inputText) {
            const match = options.find(
              (opt) => opt.label.toLowerCase() === inputText.toLowerCase(),
            );
            commitValue(match ? match.value : inputText);
            setIsEditing(false);
            setOpen(false);
          }
          inputRef.current?.blur();
          break;
        }
        case "Escape": {
          e.preventDefault();
          setIsEditing(false);
          setInputText("");
          setOpen(false);
          inputRef.current?.blur();
          break;
        }
      }
    };

    const showClearButton = clearable && currentValue && isHovered && !disabled && !loading;

    return (
      <PopoverPrimitive.Root open={open}>
        <PopoverPrimitive.Anchor asChild>
          <div
            className={cn(
              "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
              "px-3 text-xs outline-none transition-colors",
              "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
              error
                ? "border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]"
                : tableMode
                  ? "border-slate-300 dark:border-slate-500 focus-within:border-slate-500 focus-within:border-[1.5px] dark:focus-within:border-slate-300"
                  : "border-slate-200 dark:border-slate-600 focus-within:border-blue-500 focus-within:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <input
              ref={(node) => {
                (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
              }}
              id={id}
              type="text"
              disabled={disabled || loading}
              value={displayText}
              placeholder={placeholder}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => { isComposingRef.current = true; }}
              onCompositionEnd={() => { isComposingRef.current = false; }}
              className={cn(
                "flex-1 bg-transparent text-xs outline-none min-w-0",
                "placeholder:text-slate-500 dark:placeholder:text-slate-500",
                "text-slate-900 dark:text-slate-50",
              )}
              aria-invalid={error}
              aria-label={ariaLabel}
              autoComplete="off"
            />
            <div className="flex items-center gap-1 flex-shrink-0">
              {showClearButton && (
                <span
                  role="button"
                  aria-label="선택 초기화"
                  onMouseDown={(e) => e.preventDefault()}
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
          </div>
        </PopoverPrimitive.Anchor>

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
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div ref={listRef} className="flex flex-col gap-[5px] max-h-[240px] overflow-y-auto" role="listbox">
              {filteredOptions.length === 0 ? (
                <div className="py-2 text-center text-xs text-slate-500">
                  검색 결과가 없습니다.
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={currentValue === option.value}
                    aria-disabled={option.disabled}
                    onMouseDown={(e) => e.preventDefault()}
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
                ))
              )}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);
ComboboxSelect.displayName = "ComboboxSelect";

export { ComboboxSelect };
