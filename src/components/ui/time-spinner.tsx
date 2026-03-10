"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { UpIcon, DownIcon } from "@/icons";

/** 시간 스피너 컴포넌트 */
export interface TimeSpinnerProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  disabled?: boolean;
}

const TimeSpinner = ({ value, onChange, max, disabled }: TimeSpinnerProps) => {
  const [inputValue, setInputValue] = React.useState(value.toString().padStart(2, "0"));
  const inputRef = React.useRef<HTMLInputElement>(null);

  // value prop 변경 시 동기화
  React.useEffect(() => {
    setInputValue(value.toString().padStart(2, "0"));
  }, [value]);

  const increment = () => {
    onChange(value >= max ? 0 : value + 1);
  };

  const decrement = () => {
    onChange(value <= 0 ? max : value - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, "").slice(0, 2);
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num >= 0 && num <= max) {
      onChange(num);
      setInputValue(num.toString().padStart(2, "0"));
    } else {
      setInputValue(value.toString().padStart(2, "0"));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      increment();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrement();
    }
  };

  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        type="button"
        onClick={increment}
        disabled={disabled}
        className="flex size-5 cursor-pointer items-center justify-center text-slate-400 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <UpIcon size={20} />
      </button>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        onFocus={(e) => e.target.select()}
        disabled={disabled}
        className={cn(
          "h-[23px] w-[34px] rounded-[2px] border-0 bg-transparent p-[5px] text-center",
          "text-xs font-normal tabular-nums text-slate-500 tracking-[-0.18px] dark:text-slate-300",
          "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-slate-50 dark:focus:bg-slate-700",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
      <button
        type="button"
        onClick={decrement}
        disabled={disabled}
        className="flex size-5 cursor-pointer items-center justify-center text-slate-400 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <DownIcon size={20} />
      </button>
    </div>
  );
};

export { TimeSpinner };
