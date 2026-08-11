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
          // min-h-full: 컨텐츠가 짧으면 스크롤 컨테이너(main) 만큼 채우고,
          //             길면 자식 크기에 따라 자연스레 늘어남 → 오버플로우 스크롤 시 pb-4 가 실제 자리를 차지해 최하단 여백 보존
          "min-h-full flex flex-col",
          padded && "px-4 pt-2.5 pb-4",
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
