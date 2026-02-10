import * as React from "react"

import { cn } from "@/lib/utils"
import { XIcon } from "@/icons"

export interface VisitTagProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 태그 라벨 */
  label: string
  /** 클릭 시 이동할 경로 또는 핸들러 */
  href?: string
  /** 클릭 핸들러 */
  onNavigate?: () => void
  /** 삭제 핸들러 */
  onRemove?: () => void
}

const VisitTag = React.forwardRef<HTMLDivElement, VisitTagProps>(
  ({ className, label, href, onNavigate, onRemove, ...props }, ref) => {
    const handleClick = () => {
      if (href) {
        window.location.href = href
      } else if (onNavigate) {
        onNavigate()
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex h-9 items-center justify-center gap-0.5 p-2 rounded-[5px] whitespace-nowrap flex-shrink-0",
          "border-[0.75px] border-slate-100 dark:border-slate-700",
          "bg-white dark:bg-slate-900",
          "text-xs text-slate-700 dark:text-slate-300 tracking-[-0.12px]",
          "hover:border-slate-200 dark:hover:border-slate-600 transition-colors",
          className
        )}
        {...props}
      >
        {/* 라벨 (클릭하면 이동) */}
        <button
          type="button"
          onClick={handleClick}
          className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          {label}
        </button>

        {/* X 버튼 (삭제) */}
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="flex-shrink-0 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            aria-label={`${label} 삭제`}
          >
            <XIcon size={20} />
          </button>
        )}
      </div>
    )
  }
)
VisitTag.displayName = "VisitTag"

export { VisitTag }
