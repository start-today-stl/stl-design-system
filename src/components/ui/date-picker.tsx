"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";

import { cn } from "@/lib/utils";
import { InputField, type InputSize } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@/icons";

export interface DatePickerProps {
  /** 선택된 날짜 */
  value?: Date;
  /** 날짜 변경 핸들러 */
  onChange?: (date: Date | undefined) => void;
  /** 라벨 텍스트 */
  label?: string;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 날짜 포맷 (기본: yyyy-MM-dd) */
  dateFormat?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 너비 크기 */
  size?: InputSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 추가 className */
  className?: string;
  /** 라벨이 없어도 라벨 공간 유지 */
  reserveLabelSpace?: boolean;
  /** 필수 입력 표시 (라벨 앞에 점 표시) */
  required?: boolean;
}

const DatePicker = ({
  value,
  onChange,
  label,
  placeholder = "yyyy-mm-dd",
  dateFormat = "yyyy-MM-dd",
  error,
  errorMessage,
  size = "md",
  disabled,
  className,
  reserveLabelSpace,
  required,
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(value || new Date());
  const [inputValue, setInputValue] = React.useState(
    value ? format(value, dateFormat) : ""
  );

  // value prop이 변경되면 inputValue 동기화
  React.useEffect(() => {
    setInputValue(value ? format(value, dateFormat) : "");
  }, [value, dateFormat]);

  // 직접 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // 입력값이 유효한 날짜인지 확인
    const parsed = parse(newValue, dateFormat, new Date());
    if (isValid(parsed) && newValue.length === dateFormat.length) {
      onChange?.(parsed);
    }
  };

  // 입력 완료 시 (blur) 유효성 검사
  const handleInputBlur = () => {
    if (!inputValue) {
      onChange?.(undefined);
      return;
    }

    const parsed = parse(inputValue, dateFormat, new Date());
    if (isValid(parsed)) {
      setInputValue(format(parsed, dateFormat));
      onChange?.(parsed);
    } else {
      // 유효하지 않은 날짜면 이전 값으로 복원
      setInputValue(value ? format(value, dateFormat) : "");
    }
  };

  // 캘린더에서 날짜 선택
  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      setInputValue(format(date, dateFormat));
      onChange?.(date);
    }
    setOpen(false);
  };

  // 팝오버 열림/닫힘 처리
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // 선택된 날짜가 있으면 해당 월로 캘린더 이동
      setMonth(value || new Date());
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild disabled={disabled}>
        <div role="combobox" aria-haspopup="dialog" className={cn("inline-block", className)}>
          <InputField
            label={label}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            error={error}
            errorMessage={errorMessage}
            size={size}
            disabled={disabled}
            autoComplete="off"
            rightIcon={<CalendarIcon size={24} />}
            onRightIconClick={() => !disabled && setOpen(true)}
            reserveLabelSpace={reserveLabelSpace}
            required={required}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-0 bg-transparent p-0 shadow-none" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleCalendarSelect}
          month={month}
          onMonthChange={setMonth}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
