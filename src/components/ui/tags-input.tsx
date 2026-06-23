"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/chip";

const containerBaseStyles = [
  "flex flex-wrap items-center gap-1.5 rounded-[5px] border bg-slate-50/50 dark:bg-slate-800",
  "min-h-9 px-2 py-1 text-xs text-slate-900 dark:text-slate-100",
  "outline-none transition-colors cursor-text",
].join(" ");

const containerDefaultStyles = [
  "border-slate-200 dark:border-slate-500",
  "focus-within:border-blue-500 focus-within:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
].join(" ");

const containerErrorStyles = [
  "border-destructive dark:border-red-500",
  "focus-within:border-destructive focus-within:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] dark:focus-within:border-red-500",
].join(" ");

const containerDisabledStyles =
  "opacity-50 cursor-not-allowed pointer-events-none";

const tagsInputSizeStyles = {
  sm: "w-[180px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full",
} as const;

export type TagsInputSize = keyof typeof tagsInputSizeStyles;

export interface TagsInputProps {
  /** 칩 배열 값 (controlled) */
  value?: string[];
  /** 초기 값 (uncontrolled) */
  defaultValue?: string[];
  /** 칩 배열 변경 콜백 */
  onValueChange?: (values: string[]) => void;
  /** 라벨 텍스트 */
  label?: string;
  /** placeholder (칩이 없을 때 표시) */
  placeholder?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 너비 크기 */
  size?: TagsInputSize;
  /** 필수 입력 표시 */
  required?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 라벨이 없어도 라벨 공간 유지 */
  reserveLabelSpace?: boolean;
  /** 최대 칩 개수 (도달 시 input 비활성화) */
  maxTags?: number;
  /** 칩 분리 키 패턴 (기본: 쉼표/줄바꿈) */
  delimiterPattern?: RegExp;
  /** 입력값 정규화 (예: trim, toLower) — 기본 trim */
  normalize?: (raw: string) => string;
  /** 중복 허용 여부 (기본 false) */
  allowDuplicates?: boolean;
  /** 컨테이너 최대 높이 — 설정 시 초과하면 내부 세로 스크롤 (예: 120 / "8rem") */
  maxHeight?: number | string;
  /** input id */
  id?: string;
  /** form name */
  name?: string;
  /** 컨테이너 className override */
  className?: string;
}

/**
 * 다건 텍스트를 칩(Chip) 형태로 입력/관리하는 컴포넌트
 *
 * 동작:
 * - Enter / Tab / 쉼표 입력 → 현재 텍스트를 칩으로 추가
 * - 빈 입력 상태에서 Backspace → 마지막 칩 제거
 * - 칩 X 버튼 → 개별 칩 제거
 * - blur 시 남은 텍스트도 칩으로 등록
 * - 쉼표/줄바꿈이 포함된 텍스트 붙여넣기 → 자동 분리
 * - 빈 값/중복(allowDuplicates=false) 자동 제거
 */
const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      label,
      placeholder,
      error,
      errorMessage,
      size = "full",
      required,
      disabled,
      reserveLabelSpace,
      maxTags,
      delimiterPattern = /[,\n]/,
      normalize = (s) => s.trim(),
      allowDuplicates = false,
      maxHeight,
      id,
      name,
      className,
    },
    ref,
  ) => {
    const reactId = React.useId();
    const inputId = id || reactId;
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>(
      defaultValue ?? [],
    );
    const tags = isControlled ? value : internalValue;

    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(
      ref,
      () => innerRef.current as HTMLInputElement,
    );

    const [text, setText] = React.useState("");

    const commitTags = (next: string[]) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    };

    const addTags = (rawValues: string[]) => {
      const additions: string[] = [];
      for (const raw of rawValues) {
        const v = normalize(raw);
        if (!v) continue;
        if (!allowDuplicates && tags.includes(v)) continue;
        if (additions.includes(v)) continue;
        additions.push(v);
      }
      if (additions.length === 0) return;

      let next = [...tags, ...additions];
      if (maxTags !== undefined && next.length > maxTags) {
        next = next.slice(0, maxTags);
      }
      commitTags(next);
    };

    const removeTag = (idx: number) => {
      commitTags(tags.filter((_, i) => i !== idx));
    };

    const flushInput = () => {
      if (!text) return;
      const parts = text.split(delimiterPattern);
      addTags(parts);
      setText("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // IME 조합 중인 키 입력(한글/일본어/중국어 등)은 무시
      // 조합 중 Enter 는 글자 확정용으로 사용되므로 칩 추가 트리거하지 않음
      if (e.nativeEvent.isComposing) return;

      if (e.key === "Enter" || e.key === ",") {
        if (text) {
          e.preventDefault();
          flushInput();
        }
        return;
      }
      if (e.key === "Tab" && text) {
        e.preventDefault();
        flushInput();
        return;
      }
      if (e.key === "Backspace" && text === "" && tags.length > 0) {
        e.preventDefault();
        removeTag(tags.length - 1);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (delimiterPattern.test(raw)) {
        const parts = raw.split(delimiterPattern);
        const last = parts.pop() ?? "";
        addTags(parts);
        setText(last);
      } else {
        setText(raw);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pasted = e.clipboardData.getData("text");
      if (delimiterPattern.test(pasted)) {
        e.preventDefault();
        const parts = pasted.split(delimiterPattern);
        addTags(parts);
      }
    };

    const handleContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      // 칩 내부 클릭(삭제 버튼 등) 이 아니면 input 으로 포커스 이동
      if ((e.target as HTMLElement).closest("button")) return;
      if (e.target === innerRef.current) return;
      e.preventDefault();
      innerRef.current?.focus();
    };

    const isAtMax = maxTags !== undefined && tags.length >= maxTags;

    return (
      <div className={cn("flex flex-col gap-1", tagsInputSizeStyles[size])}>
        {(label || reserveLabelSpace) && (
          <label
            htmlFor={inputId}
            className={cn(
              "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
              !label && "invisible",
            )}
          >
            {required && (
              <span
                className="size-2 rounded-full bg-red-400"
                aria-hidden="true"
              />
            )}
            {label || " "}
          </label>
        )}
        <div
          className={cn(
            containerBaseStyles,
            error ? containerErrorStyles : containerDefaultStyles,
            disabled && containerDisabledStyles,
            maxHeight !== undefined && "overflow-y-auto",
            className,
          )}
          style={
            maxHeight !== undefined
              ? {
                  maxHeight:
                    typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
                }
              : undefined
          }
          onMouseDown={handleContainerMouseDown}
          aria-invalid={error}
        >
          {tags.map((tag, idx) => (
            <Chip
              key={`${tag}-${idx}`}
              size="sm"
              removable={!disabled}
              onRemove={() => removeTag(idx)}
            >
              {tag}
            </Chip>
          ))}
          <input
            ref={innerRef}
            id={inputId}
            name={name}
            type="text"
            required={required && tags.length === 0}
            disabled={disabled || isAtMax}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={flushInput}
            placeholder={tags.length === 0 ? placeholder : ""}
            className={cn(
              "flex-1 min-w-[80px] border-0 bg-transparent p-0 outline-none",
              "placeholder:text-slate-500 dark:placeholder:text-slate-500",
              "disabled:cursor-not-allowed",
            )}
          />
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
TagsInput.displayName = "TagsInput";

export { TagsInput, tagsInputSizeStyles };
