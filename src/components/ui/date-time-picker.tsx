"use client";

import * as React from "react";
import { format, parse, isValid, setHours, setMinutes, setSeconds } from "date-fns";
import { cn } from "@/lib/utils";
import { InputField, type InputSize } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalenderIcon, DirectionIcon } from "@/icons";

/** 시간 스피너 컴포넌트 */
interface TimeSpinnerProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  disabled?: boolean;
}

const TimeSpinner = ({ value, onChange, max, disabled }: TimeSpinnerProps) => {
  const increment = () => {
    onChange(value >= max ? 0 : value + 1);
  };

  const decrement = () => {
    onChange(value <= 0 ? max : value - 1);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={increment}
        disabled={disabled}
        className="flex size-[10px] cursor-pointer items-center justify-center text-gray-200 hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <DirectionIcon size={10} className="rotate-180" />
      </button>
      <div className="flex h-[23px] w-[34px] items-center justify-center rounded-[2px] p-[5px]">
        <span className="text-xs font-normal tabular-nums text-gray-500 tracking-[-0.18px] dark:text-gray-300">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <button
        type="button"
        onClick={decrement}
        disabled={disabled}
        className="flex size-[10px] cursor-pointer items-center justify-center text-gray-200 hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <DirectionIcon size={10} />
      </button>
    </div>
  );
};

export interface DateTimePickerProps {
  /** 선택된 날짜/시간 */
  value?: Date;
  /** 날짜/시간 변경 핸들러 */
  onChange?: (date: Date | undefined) => void;
  /** 라벨 텍스트 */
  label?: string;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 날짜/시간 포맷 (기본: yyyy-MM-dd HH:mm:ss) */
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
}

const DateTimePicker = ({
  value,
  onChange,
  label,
  placeholder = "yyyy-mm-dd 00:00:00",
  dateFormat = "yyyy-MM-dd HH:mm:ss",
  error,
  errorMessage,
  size = "md",
  disabled,
  className,
}: DateTimePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(value || new Date());
  const [inputValue, setInputValue] = React.useState(
    value ? format(value, dateFormat) : ""
  );

  // 내부 시간 상태 (캘린더에서 날짜만 선택해도 시간 유지)
  const [hours, setHoursState] = React.useState(value?.getHours() ?? 0);
  const [minutes, setMinutesState] = React.useState(value?.getMinutes() ?? 0);
  const [seconds, setSecondsState] = React.useState(value?.getSeconds() ?? 0);

  // value prop이 변경되면 동기화
  React.useEffect(() => {
    setInputValue(value ? format(value, dateFormat) : "");
    if (value) {
      setHoursState(value.getHours());
      setMinutesState(value.getMinutes());
      setSecondsState(value.getSeconds());
    }
  }, [value, dateFormat]);

  // 직접 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsed = parse(newValue, dateFormat, new Date());
    if (isValid(parsed) && newValue.length === dateFormat.length) {
      setHoursState(parsed.getHours());
      setMinutesState(parsed.getMinutes());
      setSecondsState(parsed.getSeconds());
      onChange?.(parsed);
    }
  };

  // 입력 완료 시 유효성 검사
  const handleInputBlur = () => {
    if (!inputValue) {
      onChange?.(undefined);
      return;
    }

    const parsed = parse(inputValue, dateFormat, new Date());
    if (isValid(parsed)) {
      setInputValue(format(parsed, dateFormat));
      setHoursState(parsed.getHours());
      setMinutesState(parsed.getMinutes());
      setSecondsState(parsed.getSeconds());
      onChange?.(parsed);
    } else {
      setInputValue(value ? format(value, dateFormat) : "");
    }
  };

  // 캘린더에서 날짜 선택 (시간은 유지)
  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      let newDate = setHours(date, hours);
      newDate = setMinutes(newDate, minutes);
      newDate = setSeconds(newDate, seconds);
      setInputValue(format(newDate, dateFormat));
      onChange?.(newDate);
    }
  };

  // 시간 변경
  const handleHoursChange = (newHours: number) => {
    setHoursState(newHours);
    if (value) {
      const newDate = setHours(value, newHours);
      setInputValue(format(newDate, dateFormat));
      onChange?.(newDate);
    }
  };

  const handleMinutesChange = (newMinutes: number) => {
    setMinutesState(newMinutes);
    if (value) {
      const newDate = setMinutes(value, newMinutes);
      setInputValue(format(newDate, dateFormat));
      onChange?.(newDate);
    }
  };

  const handleSecondsChange = (newSeconds: number) => {
    setSecondsState(newSeconds);
    if (value) {
      const newDate = setSeconds(value, newSeconds);
      setInputValue(format(newDate, dateFormat));
      onChange?.(newDate);
    }
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
            rightIcon={<CalenderIcon size={24} />}
            onRightIconClick={() => !disabled && setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[260px] overflow-hidden rounded-[5px] border border-gray-100 bg-white/95 p-0 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-dark-100 dark:bg-dark-500/95"
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleCalendarSelect}
          month={month}
          onMonthChange={setMonth}
          initialFocus
          className="w-full border-0 bg-transparent shadow-none"
        />
        {/* 시간 선택 UI */}
        <div className="flex items-center justify-center px-3 pb-3 pt-1">
          <div className="flex items-center">
            <TimeSpinner
              value={hours}
              onChange={handleHoursChange}
              max={23}
              disabled={disabled}
            />
            <span className="flex h-[23px] w-[9px] items-center justify-center text-xs text-gray-500">:</span>
            <TimeSpinner
              value={minutes}
              onChange={handleMinutesChange}
              max={59}
              disabled={disabled}
            />
            <span className="flex h-[23px] w-[9px] items-center justify-center text-xs text-gray-500">:</span>
            <TimeSpinner
              value={seconds}
              onChange={handleSecondsChange}
              max={59}
              disabled={disabled}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { DateTimePicker, TimeSpinner };
