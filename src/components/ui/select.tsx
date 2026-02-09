"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@/lib/utils";
import { UpIcon } from "@/icons";

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

export interface SelectProps {
  /** 라벨 텍스트 */
  label?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 옵션 목록 */
  options: SelectOption[];
  /** 선택된 값 */
  value?: string;
  /** 기본 선택 값 */
  defaultValue?: string;
  /** 값 변경 핸들러 */
  onValueChange?: (value: string) => void;
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
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      placeholder = "선택하세요",
      options,
      value,
      defaultValue,
      onValueChange,
      size = "full",
      error,
      errorMessage,
      disabled,
      className,
      "aria-label": ariaLabel,
    },
    ref,
  ) => {
    const id = React.useId();

    return (
      <div
        className={cn(
          "flex flex-col gap-1",
          selectSizeStyles[size],
          className,
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className="text-xs text-gray-600 dark:text-gray-50"
          >
            {label}
          </label>
        )}
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
              "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-dark-400",
              "px-3 text-xs outline-none transition-colors cursor-pointer",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-destructive dark:border-red-500 data-[state=open]:border-destructive data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]"
                : "border-gray-100 dark:border-dark-200 data-[state=open]:border-primary data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
              "data-[placeholder]:text-gray-500 dark:data-[placeholder]:text-gray-50",
            )}
            aria-invalid={error}
            aria-label={ariaLabel}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <UpIcon size={24} className="text-gray-900 transition-transform duration-200 group-data-[state=open]:rotate-180 dark:text-gray-50" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className={cn(
                "relative z-50 overflow-hidden rounded-[5px] border border-gray-100 dark:border-dark-200 w-[var(--radix-select-trigger-width)]",
                "bg-white/50 dark:bg-dark-400/30 backdrop-blur-[12px]",
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
              <SelectPrimitive.Viewport className="flex flex-col gap-[5px]">
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                      "text-xs text-gray-500 dark:text-gray-50 outline-none",
                      "hover:bg-gray-100 dark:hover:bg-dark-300",
                      "focus:bg-gray-100 dark:focus:bg-dark-300",
                      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                      "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
                    )}
                  >
                    <SelectPrimitive.ItemText>
                      {option.label}
                    </SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
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
