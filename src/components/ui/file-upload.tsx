"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input, inputSizeStyles, type InputSize } from "./input";
import { Button } from "./button";
import { UploadIcon, XIcon } from "@/icons";

export interface FileUploadProps {
  /** 라벨 텍스트 */
  label?: string;
  /** 선택된 파일 배열 */
  files: File[];
  /** 파일 변경 콜백 */
  onChange: (files: File[]) => void;
  /** 최대 파일 개수 (기본 1) */
  maxFiles?: number;
  /** 최대 파일 크기 (bytes, 기본 10MB) */
  maxSize?: number;
  /** 허용 확장자 (예: "image/jpg,image/jpeg,image/png") */
  accept?: string;
  /** 커스텀 도움말 (없으면 자동 생성) */
  helperText?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 너비 크기 */
  size?: InputSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 필수 입력 표시 (라벨 앞에 점 표시) */
  required?: boolean;
  /** 추가 className */
  className?: string;
}

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))}${sizes[i]}`;
};

/**
 * accept 문자열에서 확장자 추출
 */
const getExtensionsFromAccept = (accept: string): string => {
  return accept
    .split(",")
    .map((type) => {
      const ext = type.trim().split("/")[1];
      return ext || type;
    })
    .join(", ");
};

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      label,
      files,
      onChange,
      maxFiles = 1,
      maxSize = 10 * 1024 * 1024, // 10MB
      accept = "image/*",
      helperText,
      error,
      errorMessage,
      size = "full",
      disabled,
      required,
      className,
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // 파일 선택 버튼 클릭
    const handleButtonClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    // 파일 선택 처리
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length === 0) return;

      // 파일 크기 필터링
      const validFiles = selectedFiles.filter((file) => file.size <= maxSize);

      if (validFiles.length > 0) {
        if (maxFiles === 1) {
          // 단일 파일: 교체
          onChange([validFiles[0]]);
        } else {
          // 다중 파일: 추가 (최대 개수 제한)
          const remainingSlots = maxFiles - files.length;
          const filesToAdd = validFiles.slice(0, remainingSlots);
          onChange([...files, ...filesToAdd]);
        }
      }

      // input 초기화 (같은 파일 재선택 가능하도록)
      e.target.value = "";
    };

    // 파일 삭제
    const handleRemoveFile = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      onChange(newFiles);
    };

    // 자동 생성 도움말
    const generatedHelperText = React.useMemo(() => {
      if (helperText) return helperText;

      const lines: string[] = [];
      lines.push(`*파일 크기 ${formatFileSize(maxSize)} 이하`);
      if (accept && accept !== "*") {
        lines.push(`*업로드 가능한 확장자 : ${getExtensionsFromAccept(accept)}`);
      }
      return lines.join("\n");
    }, [helperText, maxSize, accept]);

    // 파일 추가 가능 여부 (단일 파일일 때는 교체 가능)
    const canAddMore = maxFiles === 1 || files.length < maxFiles;

    // 인풋에 표시할 텍스트
    const inputDisplayText =
      maxFiles === 1 && files.length > 0 ? files[0].name : "";

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2", inputSizeStyles[size], className)}
      >
        {/* 라벨 */}
        {label && (
          <label className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50">
            {required && (
              <span className="size-2 rounded-full bg-stone-400" aria-hidden="true" />
            )}
            {label}
          </label>
        )}

        {/* 인풋 + 버튼 */}
        <div
          className={cn(
            "flex",
            "[&>*:first-child]:rounded-r-none",
            "[&>*:last-child]:rounded-l-none",
            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
            "[&>*:not(:last-child)]:border-r-0"
          )}
        >
          <Input
            value={inputDisplayText}
            placeholder=""
            readOnly
            disabled={disabled}
            error={error}
            className="flex-1"
            aria-label={label || "선택된 파일"}
          />
          <Button
            type="button"
            variant="primary"
            size="default"
            onClick={handleButtonClick}
            disabled={disabled || !canAddMore}
          >
            <UploadIcon size={20} />
            파일 선택
          </Button>
        </div>

        {/* 숨겨진 파일 인풋 */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
          aria-label={label || "파일 선택"}
        />

        {/* 에러 메시지 */}
        {error && errorMessage && (
          <span className="text-xs text-destructive dark:text-red-400">
            {errorMessage}
          </span>
        )}

        {/* 도움말 */}
        {generatedHelperText && (
          <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-pre-line leading-5">
            {generatedHelperText}
          </div>
        )}

        {/* 파일 리스트 (다중 파일일 때) */}
        {maxFiles > 1 && files.length > 0 && (
          <div className="flex flex-col gap-1">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between py-1"
              >
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  {index + 1}. {file.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    [{formatFileSize(file.size)}]
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    disabled={disabled}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-50"
                    aria-label={`${file.name} 삭제`}
                  >
                    <XIcon size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload };
