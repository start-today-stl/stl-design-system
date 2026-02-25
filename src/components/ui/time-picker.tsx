"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { InputField, type InputSize } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimeSpinner } from "@/components/ui/date-time-picker";
import { BellIcon } from "@/icons";

export interface TimePickerProps {
  /** 선택된 시간 (HH:mm:ss 형식 문자열 또는 Date) */
  value?: string | Date;
  /** 시간 변경 핸들러 */
  onChange?: (time: string) => void;
  /** 라벨 텍스트 */
  label?: string;
  /** placeholder 텍스트 */
  placeholder?: string;
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
  /** 초 단위 표시 여부 */
  showSeconds?: boolean;
  /** 필수 입력 표시 (라벨 앞에 점 표시) */
  required?: boolean;
}

const TimePicker = ({
  value,
  onChange,
  label,
  placeholder = "00:00:00",
  error,
  errorMessage,
  size = "sm",
  disabled,
  className,
  reserveLabelSpace,
  showSeconds = true,
  required,
}: TimePickerProps) => {
  const [open, setOpen] = React.useState(false);

  // value를 파싱하여 시/분/초 추출
  const parseTime = (val: string | Date | undefined): { hours: number; minutes: number; seconds: number } => {
    if (!val) return { hours: 0, minutes: 0, seconds: 0 };

    if (val instanceof Date) {
      return {
        hours: val.getHours(),
        minutes: val.getMinutes(),
        seconds: val.getSeconds(),
      };
    }

    const parts = val.split(":");
    return {
      hours: parseInt(parts[0] || "0", 10) || 0,
      minutes: parseInt(parts[1] || "0", 10) || 0,
      seconds: parseInt(parts[2] || "0", 10) || 0,
    };
  };

  const { hours: initialHours, minutes: initialMinutes, seconds: initialSeconds } = parseTime(value);

  const [hours, setHours] = React.useState(initialHours);
  const [minutes, setMinutes] = React.useState(initialMinutes);
  const [seconds, setSeconds] = React.useState(initialSeconds);

  // value prop 변경 시 동기화
  React.useEffect(() => {
    const { hours: h, minutes: m, seconds: s } = parseTime(value);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  }, [value]);

  // 시간 문자열 생성
  const formatTime = (h: number, m: number, s: number): string => {
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");
    return showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
  };

  const [inputValue, setInputValue] = React.useState(
    value ? formatTime(initialHours, initialMinutes, initialSeconds) : ""
  );

  React.useEffect(() => {
    if (value) {
      const { hours: h, minutes: m, seconds: s } = parseTime(value);
      setInputValue(formatTime(h, m, s));
    } else {
      setInputValue("");
    }
  }, [value, showSeconds]);

  // 직접 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // HH:mm:ss 또는 HH:mm 형식 파싱
    const parts = newValue.split(":");
    if (parts.length >= 2) {
      const h = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const s = parts[2] ? parseInt(parts[2], 10) : 0;

      if (!isNaN(h) && !isNaN(m) && h >= 0 && h <= 23 && m >= 0 && m <= 59 && s >= 0 && s <= 59) {
        setHours(h);
        setMinutes(m);
        setSeconds(s);
        onChange?.(formatTime(h, m, s));
      }
    }
  };

  // 입력 완료 시 유효성 검사
  const handleInputBlur = () => {
    if (!inputValue) {
      onChange?.("");
      return;
    }

    const parts = inputValue.split(":");
    if (parts.length >= 2) {
      const h = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const s = parts[2] ? parseInt(parts[2], 10) : 0;

      if (!isNaN(h) && !isNaN(m) && h >= 0 && h <= 23 && m >= 0 && m <= 59 && s >= 0 && s <= 59) {
        const formatted = formatTime(h, m, s);
        setInputValue(formatted);
        onChange?.(formatted);
        return;
      }
    }

    // 유효하지 않으면 이전 값으로 복원
    setInputValue(value ? formatTime(hours, minutes, seconds) : "");
  };

  // 시간 변경 핸들러
  const handleHoursChange = (newHours: number) => {
    setHours(newHours);
    const formatted = formatTime(newHours, minutes, seconds);
    setInputValue(formatted);
    onChange?.(formatted);
  };

  const handleMinutesChange = (newMinutes: number) => {
    setMinutes(newMinutes);
    const formatted = formatTime(hours, newMinutes, seconds);
    setInputValue(formatted);
    onChange?.(formatted);
  };

  const handleSecondsChange = (newSeconds: number) => {
    setSeconds(newSeconds);
    const formatted = formatTime(hours, minutes, newSeconds);
    setInputValue(formatted);
    onChange?.(formatted);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <div role="combobox" aria-haspopup="dialog" className={cn("inline-block", className)}>
          <InputField
            label={label}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={showSeconds ? placeholder : "00:00"}
            error={error}
            errorMessage={errorMessage}
            size={size}
            disabled={disabled}
            autoComplete="off"
            rightIcon={<BellIcon size={24} />}
            onRightIconClick={() => !disabled && setOpen(true)}
            reserveLabelSpace={reserveLabelSpace}
            required={required}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto border-0 bg-transparent p-0 shadow-none"
        align="start"
      >
        <div className="overflow-hidden rounded-[5px] border border-slate-100 bg-white/95 p-3 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-slate-600 dark:bg-slate-800/95">
          <div className="flex items-center justify-center">
            <TimeSpinner
              value={hours}
              onChange={handleHoursChange}
              max={23}
              disabled={disabled}
            />
            <span className="flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300">:</span>
            <TimeSpinner
              value={minutes}
              onChange={handleMinutesChange}
              max={59}
              disabled={disabled}
            />
            {showSeconds && (
              <>
                <span className="flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300">:</span>
                <TimeSpinner
                  value={seconds}
                  onChange={handleSecondsChange}
                  max={59}
                  disabled={disabled}
                />
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { TimePicker };
