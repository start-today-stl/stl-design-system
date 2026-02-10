import * as React from "react"

import { cn } from "@/lib/utils"

export interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 아이콘 */
  icon?: React.ReactNode
  /** 제목 */
  title?: string
  /** 설명 */
  description?: string
}

const Notice = React.forwardRef<HTMLDivElement, NoticeProps>(
  ({ className, icon, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-[276px] p-2.5 bg-slate-50 dark:bg-slate-800 rounded-[10px]",
          className
        )}
        {...props}
      >
        {/* 아이콘 */}
        {icon && (
          <div className="mb-2.5 w-6 h-6 flex items-center justify-center text-slate-500 dark:text-slate-400">
            {icon}
          </div>
        )}

        {/* 제목 */}
        {title && (
          <p className="mb-1 text-xs font-semibold text-slate-700 dark:text-slate-200 leading-[1.5] tracking-[-0.12px]">
            {title}
          </p>
        )}

        {/* 설명 */}
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-[1.5] tracking-[-0.12px]">
            {description}
          </p>
        )}

        {/* 커스텀 콘텐츠 */}
        {children}
      </div>
    )
  }
)
Notice.displayName = "Notice"

export { Notice }
