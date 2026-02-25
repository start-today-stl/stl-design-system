"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { InputField, type InputSize } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@/icons";

export interface DateRangePickerProps {
  /** 선택된 날짜 범위 */
  value?: DateRange;
  /** 날짜 범위 변경 핸들러 */
  onChange?: (range: DateRange | undefined) => void;
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

const DateRangePicker = ({
  value,
  onChange,
  label,
  placeholder = "yyyy-mm-dd - yyyy-mm-dd",
  dateFormat = "yyyy-MM-dd",
  error,
  errorMessage,
  size = "lg",
  disabled,
  className,
  reserveLabelSpace,
  required,
}: DateRangePickerProps) => {
  const [open, setOpen] = React.useState(false);
  // 클릭 횟수 추적 (0: 미선택, 1: 첫번째 선택, 2: 완료)
  const clickCountRef = React.useRef(0);
  // 캘린더 내부 선택 상태
  const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(value);

  // value prop 변경 시 동기화 (팝오버 닫혀있을 때만)
  React.useEffect(() => {
    if (!open) {
      setInternalRange(value);
    }
  }, [value, open]);

  // 캘린더 표시 월 상태
  const [month, setMonth] = React.useState<Date>(new Date());

  // 표시용 문자열 생성
  const formatRange = (range: DateRange | undefined): string => {
    if (!range) return "";
    const from = range.from ? format(range.from, dateFormat) : "";
    const to = range.to ? format(range.to, dateFormat) : "";
    if (from && to) return `${from} - ${to}`;
    if (from) return `${from} - `;
    return "";
  };

  const [inputValue, setInputValue] = React.useState(formatRange(value));

  // value prop이 변경되면 동기화
  React.useEffect(() => {
    setInputValue(formatRange(value));
  }, [value, dateFormat]);

  // 직접 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // "yyyy-MM-dd - yyyy-MM-dd" 형식 파싱 시도
    const parts = newValue.split(" - ");
    if (parts.length === 2) {
      const from = parse(parts[0].trim(), dateFormat, new Date());
      const to = parse(parts[1].trim(), dateFormat, new Date());
      if (isValid(from) && isValid(to)) {
        onChange?.({ from, to });
      }
    }
  };

  // 입력 완료 시 유효성 검사
  const handleInputBlur = () => {
    if (!inputValue) {
      onChange?.(undefined);
      return;
    }

    const parts = inputValue.split(" - ");
    if (parts.length === 2) {
      const from = parse(parts[0].trim(), dateFormat, new Date());
      const to = parse(parts[1].trim(), dateFormat, new Date());
      if (isValid(from) && isValid(to)) {
        setInputValue(`${format(from, dateFormat)} - ${format(to, dateFormat)}`);
        onChange?.({ from, to });
        return;
      }
    }

    // 유효하지 않으면 이전 값으로 복원
    setInputValue(formatRange(value));
  };

  // 캘린더에서 날짜 클릭 (onDayClick으로 실제 클릭한 날짜 사용)
  const handleDayClick = (clickedDate: Date) => {
    clickCountRef.current += 1;

    if (clickCountRef.current === 1) {
      // 첫 번째 클릭: 클릭한 날짜를 시작일로 설정
      const newRange = { from: clickedDate, to: undefined };
      setInternalRange(newRange);
      setInputValue(formatRange(newRange));
      onChange?.(newRange);
    } else {
      // 두 번째 클릭: 종료일 설정, 팝오버 닫기
      const firstDate = internalRange?.from || clickedDate;
      const secondDate = clickedDate;

      // 빠른 날짜를 from, 늦은 날짜를 to로 정렬
      const finalRange =
        firstDate.getTime() <= secondDate.getTime()
          ? { from: firstDate, to: secondDate }
          : { from: secondDate, to: firstDate };

      setInternalRange(finalRange);
      setInputValue(formatRange(finalRange));
      onChange?.(finalRange);
      clickCountRef.current = 0;
      setOpen(false);
    }
  };

  // 팝오버 열림/닫힘 처리
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setOpen(true);
      clickCountRef.current = 0; // 새로운 선택 시작
      setInternalRange(value); // 기존 선택 표시 (첫 클릭 시 초기화됨)
      // 선택된 날짜가 있으면 해당 월로 캘린더 이동
      if (value?.from) {
        setMonth(value.from);
      } else {
        setMonth(new Date());
      }
    } else {
      // 선택 중이 아닐 때만 닫기 (외부 클릭 또는 ESC)
      if (clickCountRef.current === 0) {
        setOpen(false);
      }
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
      <PopoverContent
        className="w-auto border-0 bg-transparent p-0 shadow-none"
        align="start"
        onPointerDownOutside={(e) => {
          // 선택 중일 때는 외부 클릭으로 닫히지 않도록 방지
          if (clickCountRef.current > 0) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
          // 선택 중일 때는 외부 클릭으로 닫히지 않도록 방지
          if (clickCountRef.current > 0) {
            e.preventDefault();
          }
        }}
      >
        <Calendar
          mode="range"
          selected={internalRange}
          onSelect={() => {}} // controlled 모드 유지 (실제 처리는 onDayClick에서)
          onDayClick={handleDayClick}
          month={month}
          onMonthChange={setMonth}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DateRangePicker };
export type { DateRange };
