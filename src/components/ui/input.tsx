"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { EyeIcon } from "@/icons";

const inputBaseStyles = [
  "flex rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "h-9 px-3 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const inputDefaultStyles = [
  "border-slate-100 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-blue-500 focus:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
].join(" ");

const inputTableModeStyles = [
  "border-slate-300 dark:border-slate-500",
  "placeholder:text-slate-300 dark:placeholder:text-slate-100",
  "focus:border-slate-500 focus:border-[1.5px] focus:shadow-none dark:focus:border-slate-300",
].join(" ");

const inputErrorStyles = [
  "border-destructive dark:border-red-500",
  "placeholder:text-destructive dark:placeholder:text-red-400",
  "focus:border-destructive focus:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus:border-red-500",
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
  /** 테이블 모드 (파란 glow 대신 border 강조) */
  tableMode?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, tableMode, ...props }, ref) => {
    const getStyleVariant = () => {
      if (error) return inputErrorStyles;
      if (tableMode) return inputTableModeStyles;
      return inputDefaultStyles;
    };

    return (
      <input
        ref={ref}
        className={cn(inputBaseStyles, getStyleVariant(), className)}
        aria-invalid={error}
        {...props}
      />
    );
  },
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
  /** 우측 아이콘 (ReactNode) */
  rightIcon?: React.ReactNode;
  /** 우측 아이콘 클릭 핸들러 */
  onRightIconClick?: () => void;
  /** 우측 아이콘 버튼의 접근성 라벨 */
  rightIconLabel?: string;
  /** 라벨이 없어도 라벨 공간 유지 */
  reserveLabelSpace?: boolean;
  /** 로딩 상태 (스피너 표시) */
  loading?: boolean;
  /** 비밀번호 보기 토글 표시 (type="password"일 때 기본 true) */
  showPasswordToggle?: boolean;
  /** 필수 입력 표시 (라벨 앞에 점 표시) */
  required?: boolean;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { className, label, error, errorMessage, size = "full", id, rightIcon, onRightIconClick, rightIconLabel = "아이콘 버튼", reserveLabelSpace, loading, showPasswordToggle, required, type, ...props },
    ref,
  ) => {
    const inputId = id || React.useId();
    const [showPassword, setShowPassword] = React.useState(false);

    // type="password"이고 showPasswordToggle이 명시적으로 false가 아니면 토글 표시
    const isPasswordType = type === "password";
    const shouldShowPasswordToggle = isPasswordType && showPasswordToggle !== false;

    const hasRightContent = rightIcon || loading || shouldShowPasswordToggle;

    // 실제 input type 결정
    const inputType = isPasswordType && showPassword ? "text" : type;

    // 우측 콘텐츠 렌더링
    const renderRightContent = () => {
      if (loading) {
        return (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Spinner size="sm" />
          </div>
        );
      }

      if (shouldShowPasswordToggle) {
        return (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white",
              showPassword && "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            )}
            tabIndex={-1}
          >
            <EyeIcon size={24} />
          </button>
        );
      }

      if (rightIcon) {
        return (
          <button
            type="button"
            onClick={onRightIconClick}
            aria-label={rightIconLabel}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-900 hover:text-slate-600 dark:text-slate-50 dark:hover:text-white"
            tabIndex={-1}
          >
            {rightIcon}
          </button>
        );
      }

      return null;
    };

    return (
      <div className={cn("flex flex-col gap-1", inputSizeStyles[size])}>
        {(label || reserveLabelSpace) && (
          <label
            htmlFor={inputId}
            className={cn(
              "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50",
              !label && "invisible"
            )}
          >
            {required && (
              <span className="size-2 rounded-full bg-stone-400" aria-hidden="true" />
            )}
            {label || "\u00A0"}
          </label>
        )}
        <div className="relative">
          <Input
            id={inputId}
            ref={ref}
            type={inputType}
            error={error}
            required={required}
            className={cn("w-full", hasRightContent && "pr-9", className)}
            {...props}
          />
          {renderRightContent()}
        </div>
        {error && errorMessage && (
          <span className="text-xs text-destructive dark:text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);
InputField.displayName = "InputField";

export { Input, InputField, inputSizeStyles };
