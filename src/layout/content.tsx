import * as React from "react"

import { cn } from "@/lib/utils"

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 패딩 적용 여부 (기본값: true) */
  padded?: boolean
}

const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ className, padded = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "h-full flex flex-col",
          padded && "px-4 pt-2.5",
          // 스크롤 컨테이너의 padding-bottom 은 오버플로우 시 최하단에 안 나타난다.
          // flex-col 마지막에 shrink-0 ::after spacer 를 두면 실제 아이템으로
          // 계산돼 스크롤 최하단에도 여백이 보장된다.
          padded && "after:content-[''] after:block after:h-4 after:shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Content.displayName = "Content"

export { Content }
