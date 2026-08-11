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
          // 하단 여백은 AppShell main(스크롤 컨테이너)에 위치시켜
          // 스크롤 오버플로우 페이지에서도 스크롤 최하단에 여백이 유지되도록 함
          padded && "px-4 pt-2.5",
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
