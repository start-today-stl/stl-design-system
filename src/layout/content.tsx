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
          "min-h-full",
          padded && "px-4 pt-2 pb-4",
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
