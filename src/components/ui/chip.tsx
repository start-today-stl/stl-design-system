import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { XIcon } from "@/icons";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-all duration-150 select-none",
  {
    variants: {
      variant: {
        // 기본 (필터 칩용)
        default:
          "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
        // 선택됨
        selected:
          "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500",
        // 아웃라인
        outline:
          "border border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
        // 아웃라인 선택됨
        "outline-selected":
          "border border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900",
      },
      size: {
        sm: "h-6 px-2 text-xs rounded-md",
        md: "h-7 px-2.5 text-xs rounded-lg",
        lg: "h-8 px-3 text-sm rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof chipVariants> {
  /** 칩 내용 */
  children: React.ReactNode;
  /** 삭제 가능 여부 (X 버튼 표시) */
  removable?: boolean;
  /** 삭제 버튼 클릭 핸들러 */
  onRemove?: () => void;
  /** 클릭 핸들러 (선택형 칩용) */
  onClick?: () => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 왼쪽 아이콘/요소 */
  leftElement?: React.ReactNode;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      children,
      removable,
      onRemove,
      onClick,
      disabled,
      leftElement,
      ...props
    },
    ref
  ) => {
    const isInteractive = !!onClick;

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    };

    return (
      <div
        ref={ref}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive && !disabled ? 0 : undefined}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={
          isInteractive && !disabled
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          chipVariants({ variant, size }),
          isInteractive && !disabled && "cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {leftElement && (
          <span className="flex items-center justify-center shrink-0">
            {leftElement}
          </span>
        )}
        <span className="truncate">{children}</span>
        {removable && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className={cn(
              "flex items-center justify-center shrink-0 rounded-full transition-colors",
              "hover:bg-black/10 dark:hover:bg-white/10",
              "-mr-0.5 size-5"
            )}
            aria-label="삭제"
          >
            <XIcon size={16} />
          </button>
        )}
      </div>
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
