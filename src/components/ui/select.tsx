"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Command as CommandPrimitive } from "cmdk";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { UpIcon, SearchIcon, XIcon } from "@/icons";
import { Checkbox } from "@/components/ui/checkbox";

const selectSizeStyles = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full",
} as const;

export type SelectSize = keyof typeof selectSizeStyles;

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
  /** 검색 기능 활성화 */
  searchable?: boolean;
  /** 검색 플레이스홀더 */
  searchPlaceholder?: string;
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
    },
    ref,
  ) => {
    return (
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          id={id}
          className={cn(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 dark:border-red-500 data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]"
              : tableMode
                ? "border-slate-300 dark:border-slate-500 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300"
                : "border-slate-100 dark:border-slate-600 data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
            "data-[placeholder]:text-slate-500 dark:data-[placeholder]:text-slate-50",
          )}
          aria-invalid={error}
          aria-label={ariaLabel}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <UpIcon
              size={24}
              className="text-slate-900 transition-transform duration-200 group-data-[state=open]:rotate-180 dark:text-slate-50"
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              "relative z-50 overflow-hidden rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-select-trigger-width)]",
              "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
              "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
              "p-[5px]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="flex flex-col gap-[5px] max-h-[240px] overflow-y-auto">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                    "text-xs text-slate-500 dark:text-slate-50 outline-none",
                    "hover:bg-slate-100 dark:hover:bg-slate-700",
                    "focus:bg-slate-100 dark:focus:bg-slate-700",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
                  )}
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
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
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");

    const currentValue = value !== undefined ? value : internalValue;
    const selectedOption = options.find((opt) => opt.value === currentValue);

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );

    const handleSelect = (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      onValueChange?.(optionValue);
      setOpen(false);
      setSearch("");
    };

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger
          ref={ref}
          id={id}
          disabled={disabled}
          className={cn(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 dark:border-red-500 data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]"
              : tableMode
                ? "border-slate-300 dark:border-slate-500 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300"
                : "border-slate-100 dark:border-slate-600 data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
          )}
          aria-invalid={error}
          aria-label={ariaLabel}
        >
          <span
            className={cn(
              "truncate",
              !selectedOption && "text-slate-500 dark:text-slate-50",
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <UpIcon
            size={24}
            className={cn(
              "text-slate-900 transition-transform duration-200 dark:text-slate-50",
              open && "rotate-180",
            )}
          />
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
            <CommandPrimitive className="flex flex-col">
              <div className="flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600">
                <SearchIcon size={20} className="text-slate-400" />
                <CommandPrimitive.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder={searchPlaceholder}
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                />
              </div>
              <CommandPrimitive.List className="flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2">
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
                      "text-xs text-slate-500 dark:text-slate-50 outline-none",
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
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [internalValue, setInternalValue] = React.useState<string[]>(
      defaultValue || [],
    );

    const currentValue = value !== undefined ? value : internalValue;
    const selectedOptions = options.filter((opt) =>
      currentValue.includes(opt.value),
    );

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );

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

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger
          ref={ref}
          id={id}
          disabled={disabled}
          className={cn(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 dark:border-red-500 data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]"
              : tableMode
                ? "border-slate-300 dark:border-slate-500 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300"
                : "border-slate-100 dark:border-slate-600 data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
          )}
          aria-invalid={error}
          aria-label={ariaLabel}
        >
          <div className="flex flex-1 flex-wrap gap-1">
            {selectedOptions.length === 0 ? (
              <span className="text-slate-500 dark:text-slate-50">
                {placeholder}
              </span>
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
          <UpIcon
            size={24}
            className={cn(
              "text-slate-900 transition-transform duration-200 dark:text-slate-50 flex-shrink-0",
              open && "rotate-180",
            )}
          />
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
            <CommandPrimitive className="flex flex-col">
              <div className="flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600">
                <SearchIcon size={20} className="text-slate-400" />
                <CommandPrimitive.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder={searchPlaceholder}
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                />
              </div>
              <CommandPrimitive.List className="flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2">
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
                        "text-xs text-slate-500 dark:text-slate-50 outline-none",
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
          selectSizeStyles[size],
          className,
        )}
      >
        {(label || reserveLabelSpace) && (
          <label
            htmlFor={id}
            className={cn(
              "text-xs text-slate-600 dark:text-slate-50",
              !label && "invisible",
            )}
          >
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

export { Select, selectSizeStyles };
