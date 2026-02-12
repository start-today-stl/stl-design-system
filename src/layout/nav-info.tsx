import * as React from "react"

import { cn } from "@/lib/utils"

export interface NavInfoItemProps {
  /** 아이콘 (선택사항) */
  icon?: React.ReactNode
  /** 텍스트 */
  text: string
  /** 링크 (선택사항) */
  href?: string
}

export interface NavInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 정보 항목 목록 */
  items?: NavInfoItemProps[]
}

const NavInfoItem = ({ icon, text, href }: NavInfoItemProps) => {
  const content = (
    <>
      {icon && (
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-slate-500">
          {icon}
        </span>
      )}
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-[1.5] tracking-[-0.14px]">
        {text}
      </span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className="flex items-start gap-[7px] hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    )
  }

  return <div className="flex items-start gap-[7px]">{content}</div>
}

const NavInfo = React.forwardRef<HTMLDivElement, NavInfoProps>(
  ({ className, items = [], children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-[10px]",
          className
        )}
        {...props}
      >
        {items.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {items.map((item, index) => (
              <NavInfoItem key={index} {...item} />
            ))}
          </div>
        ) : (
          children
        )}
      </div>
    )
  }
)
NavInfo.displayName = "NavInfo"

export { NavInfo, NavInfoItem }
