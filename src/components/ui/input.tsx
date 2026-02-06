"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const inputBaseStyles = [
  "flex rounded-[5px] border bg-gray-50/50 dark:bg-dark-400",
  "h-9 px-3 text-xs text-gray-900 dark:text-gray-100",
  "outline-none transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const inputDefaultStyles = [
  "border-gray-100 dark:border-dark-100",
  "placeholder:text-gray-300 dark:placeholder:text-gray-100",
  "focus:border-gray-500 dark:focus:border-gray-100",
].join(" ");

const inputErrorStyles = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive dark:focus:border-red-500",
].join(" ");

const inputSizeStyles = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full",
} as const;

export type InputSize = keyof typeof inputSizeStyles;

/** 순수 Input 컴포넌트 - label/error 없이 input만 렌더링 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 에러 상태 */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        inputBaseStyles,
        error ? inputErrorStyles : inputDefaultStyles,
        className,
      )}
      aria-invalid={error}
      {...props}
    />
  ),
);
Input.displayName = "Input";

/** InputField - label과 error 메시지를 포함한 Input 래퍼 */
export interface InputFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** 라벨 텍스트 */
  label?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 너비 크기 */
  size?: InputSize;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { className, label, error, errorMessage, size = "full", id, ...props },
    ref,
  ) => {
    const inputId = id || React.useId();

    return (
      <div className={cn("flex flex-col gap-1", inputSizeStyles[size])}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[length:var(--text-body-2)] text-gray-600 dark:text-gray-50"
          >
            {label}
          </label>
        )}
        <Input
          id={inputId}
          ref={ref}
          error={error}
          className={cn("w-full", className)}
          {...props}
        />
        {error && errorMessage && (
          <span className="text-[length:var(--text-body-2)] text-destructive dark:text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);
InputField.displayName = "InputField";

export { Input, InputField, inputSizeStyles };
