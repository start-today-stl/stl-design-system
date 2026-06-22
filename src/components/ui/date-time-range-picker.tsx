"use client";

import * as React from "react";
import { format, parse, isValid, setHours, setMinutes, setSeconds } from "date-fns";
import type { DateRange, Matcher } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Input, type InputSize, inputSizeStyles } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimeSpinner } from "@/components/ui/time-spinner";
import { CalendarIcon } from "@/icons";

export interface DateTimeRangePickerProps {
  /** 선택된 날짜/시간 범위 */
  value?: DateRange;
  /** 변경 핸들러 */
  onChange?: (range: DateRange | undefined) => void;
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
  /** 라벨이 없어도 라벨 공간 유지 */
  reserveLabelSpace?: boolean;
  /** 필수 입력 표시 */
  required?: boolean;
  /** 선택 불가 날짜 */
  disabledDates?: Matcher | Matcher[];
}

const SEPARATOR = " ~ ";

// dateFormat 토큰을 placeholder 표시용으로 변환
// 예: "yy-MM-dd HH:mm:ss" → "yy-mm-dd 00:00:00"
const formatToPlaceholder = (fmt: string): string => {
  const tokens: Record<string, string> = {
    yyyy: "yyyy",
    yy: "yy",
    MM: "mm",
    M: "m",
    dd: "dd",
    d: "d",
    HH: "00",
    H: "0",
    mm: "00",
    m: "0",
    ss: "00",
    s: "0",
  };
  return fmt.replace(/yyyy|yy|MM|dd|HH|mm|ss|[MdHms]/g, (m) => tokens[m] ?? m);
};

const formatRange = (range: DateRange | undefined, dateFormat: string): string => {
  if (!range) return "";
  const from = range.from ? format(range.from, dateFormat) : "";
  const to = range.to ? format(range.to, dateFormat) : "";
  if (from && to) return `${from}${SEPARATOR}${to}`;
  if (from) return `${from}${SEPARATOR}`;
  return "";
};

const DateTimeRangePicker = ({
  value,
  onChange,
  label,
  placeholder,
  dateFormat = "yyyy-MM-dd HH:mm:ss",
  error,
  errorMessage,
  size = "lg",
  disabled,
  className,
  reserveLabelSpace,
  required,
  disabledDates,
}: DateTimeRangePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(formatRange(value, dateFormat));
  // 팝오버 열린 후 사용자가 캘린더에서 선택을 시작했는지 추적
  // (시작했는데 from/to 중 하나만 차있으면 외부 클릭으로 닫히지 않게 방지)
  const selectionStartedRef = React.useRef(false);

  // 좌/우 캘린더가 독립적으로 보여줄 달
  const [fromMonth, setFromMonth] = React.useState<Date>(value?.from ?? new Date());
  const [toMonth, setToMonth] = React.useState<Date>(value?.to ?? new Date());

  // from/to 시간 (date 선택해도 시간 유지)
  const fromHours = value?.from?.getHours() ?? 0;
  const fromMins = value?.from?.getMinutes() ?? 0;
  const fromSecs = value?.from?.getSeconds() ?? 0;
  const toHours = value?.to?.getHours() ?? 0;
  const toMins = value?.to?.getMinutes() ?? 0;
  const toSecs = value?.to?.getSeconds() ?? 0;

  // value 변경 시 input 동기화
  React.useEffect(() => {
    setInputValue(formatRange(value, dateFormat));
  }, [value, dateFormat]);

  const handleChange = (next: DateRange | undefined) => {
    onChange?.(next);
  };

  // 캘린더 disabledDates 머지: 사용자 prop + 반대편 선택에 따른 제약
  const mergeDisabled = (extra: Matcher): Matcher | Matcher[] | undefined => {
    if (!disabledDates) return extra;
    const userMatchers = Array.isArray(disabledDates) ? disabledDates : [disabledDates];
    return [...userMatchers, extra];
  };

  // from 캘린더: to 이후 날짜 비활성화
  const fromDisabled = React.useMemo<Matcher | Matcher[] | undefined>(() => {
    if (!value?.to) return disabledDates;
    const toDateOnly = new Date(value.to.getFullYear(), value.to.getMonth(), value.to.getDate());
    return mergeDisabled({ after: toDateOnly });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.to, disabledDates]);

  // to 캘린더: from 이전 날짜 비활성화
  const toDisabled = React.useMemo<Matcher | Matcher[] | undefined>(() => {
    if (!value?.from) return disabledDates;
    const fromDateOnly = new Date(value.from.getFullYear(), value.from.getMonth(), value.from.getDate());
    return mergeDisabled({ before: fromDateOnly });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.from, disabledDates]);

  // 직접 입력
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parts = newValue.split(SEPARATOR);
    if (parts.length === 2) {
      const from = parse(parts[0].trim(), dateFormat, new Date());
      const to = parse(parts[1].trim(), dateFormat, new Date());
      if (isValid(from) && isValid(to)) {
        handleChange({ from, to });
      }
    }
  };

  const handleInputBlur = () => {
    if (!inputValue) {
      onChange?.(undefined);
      return;
    }
    const parts = inputValue.split(SEPARATOR);
    if (parts.length === 2) {
      const from = parse(parts[0].trim(), dateFormat, new Date());
      const to = parse(parts[1].trim(), dateFormat, new Date());
      if (isValid(from) && isValid(to) && from.getTime() <= to.getTime()) {
        const range = { from, to };
        setInputValue(formatRange(range, dateFormat));
        onChange?.(range);
        return;
      }
    }
    // 유효하지 않거나 from > to 인 경우 이전 값 복원
    setInputValue(formatRange(value, dateFormat));
  };

  // 시간 적용 헬퍼
  const applyTime = (date: Date, h: number, m: number, s: number) => {
    let d = setHours(date, h);
    d = setMinutes(d, m);
    d = setSeconds(d, s);
    return d;
  };

  // from 캘린더에서 날짜 선택
  const handleFromSelect = (date: Date | undefined) => {
    if (!date) return;
    selectionStartedRef.current = true;
    const next = applyTime(date, fromHours, fromMins, fromSecs);
    handleChange({ from: next, to: value?.to });
  };

  // to 캘린더에서 날짜 선택
  const handleToSelect = (date: Date | undefined) => {
    if (!date) return;
    selectionStartedRef.current = true;
    const next = applyTime(date, toHours, toMins, toSecs);
    handleChange({ from: value?.from, to: next });
  };

  // 시간 변경 핸들러
  const handleFromTimeChange = (part: "h" | "m" | "s", v: number) => {
    if (!value?.from) {
      // 날짜 미선택 시 today 기준
      const base = new Date();
      const next = applyTime(
        base,
        part === "h" ? v : fromHours,
        part === "m" ? v : fromMins,
        part === "s" ? v : fromSecs
      );
      handleChange({ from: next, to: value?.to });
      return;
    }
    const next = applyTime(
      value.from,
      part === "h" ? v : fromHours,
      part === "m" ? v : fromMins,
      part === "s" ? v : fromSecs
    );
    handleChange({ from: next, to: value.to });
  };

  const handleToTimeChange = (part: "h" | "m" | "s", v: number) => {
    if (!value?.to) {
      const base = new Date();
      const next = applyTime(
        base,
        part === "h" ? v : toHours,
        part === "m" ? v : toMins,
        part === "s" ? v : toSecs
      );
      handleChange({ from: value?.from, to: next });
      return;
    }
    const next = applyTime(
      value.to,
      part === "h" ? v : toHours,
      part === "m" ? v : toMins,
      part === "s" ? v : toSecs
    );
    handleChange({ from: value.from, to: next });
  };

  // 팝오버 열림 시 캘린더 월 동기화 + 선택 추적 ref 리셋
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      selectionStartedRef.current = false;
      setFromMonth(value?.from ?? new Date());
      setToMonth(value?.to ?? new Date());
      setOpen(true);
      return;
    }
    // 선택 시작했는데 한쪽이라도 비어있으면 닫지 않음
    if (selectionStartedRef.current && (!value?.from || !value?.to)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild disabled={disabled}>
        <div
          role="combobox"
          aria-haspopup="dialog"
          className={cn("block", inputSizeStyles[size], className)}
        >
          <Input
            label={label}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={
              placeholder ??
              `${formatToPlaceholder(dateFormat)}${SEPARATOR}${formatToPlaceholder(dateFormat)}`
            }
            error={error}
            errorMessage={errorMessage}
            size="full"
            disabled={disabled}
            autoComplete="off"
            rightIcon={<CalendarIcon size={24} />}
            onRightIconClick={() => !disabled && setOpen(true)}
            reserveLabelSpace={reserveLabelSpace}
            required={required}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto border-0 bg-transparent p-0 shadow-none"
        align="start"
        sideOffset={4}
        avoidCollisions={false}
        onPointerDownOutside={(e) => {
          if (selectionStartedRef.current && (!value?.from || !value?.to)) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
          if (selectionStartedRef.current && (!value?.from || !value?.to)) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (selectionStartedRef.current && (!value?.from || !value?.to)) {
            e.preventDefault();
          }
        }}
      >
        <div className="overflow-hidden rounded-[5px] border border-slate-100 bg-white/95 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-slate-600 dark:bg-slate-800/95">
          <div className="flex divide-x divide-slate-100 dark:divide-slate-600">
            {/* 왼쪽: from */}
            <div className="w-[260px]">
              <Calendar
                mode="single"
                selected={value?.from}
                onSelect={handleFromSelect}
                month={fromMonth}
                onMonthChange={setFromMonth}
                disabled={fromDisabled}
                unstyled
                className="w-full p-3"
              />
              <div className="flex items-center justify-center px-3 pb-3 pt-1">
                <TimeSpinner
                  value={fromHours}
                  onChange={(v) => handleFromTimeChange("h", v)}
                  max={23}
                  disabled={disabled}
                />
                <span className="flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300">
                  :
                </span>
                <TimeSpinner
                  value={fromMins}
                  onChange={(v) => handleFromTimeChange("m", v)}
                  max={59}
                  disabled={disabled}
                />
                <span className="flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300">
                  :
                </span>
                <TimeSpinner
                  value={fromSecs}
                  onChange={(v) => handleFromTimeChange("s", v)}
                  max={59}
                  disabled={disabled}
                />
              </div>
            </div>
            {/* 오른쪽: to */}
            <div className="w-[260px]">
              <Calendar
                mode="single"
                selected={value?.to}
                onSelect={handleToSelect}
                month={toMonth}
                onMonthChange={setToMonth}
                disabled={toDisabled}
                unstyled
                className="w-full p-3"
              />
              <div className="flex items-center justify-center px-3 pb-3 pt-1">
                <TimeSpinner
                  value={toHours}
                  onChange={(v) => handleToTimeChange("h", v)}
                  max={23}
                  disabled={disabled}
                />
                <span className="flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300">
                  :
                </span>
                <TimeSpinner
                  value={toMins}
                  onChange={(v) => handleToTimeChange("m", v)}
                  max={59}
                  disabled={disabled}
                />
                <span className="flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300">
                  :
                </span>
                <TimeSpinner
                  value={toSecs}
                  onChange={(v) => handleToTimeChange("s", v)}
                  max={59}
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { DateTimeRangePicker };
