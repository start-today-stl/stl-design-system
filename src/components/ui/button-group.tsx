import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const childCount = childArray.length

    return (
      <div
        ref={ref}
        className={cn("inline-flex", className)}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child

          const isFirst = index === 0
          const isLast = index === childCount - 1
          const isMiddle = !isFirst && !isLast

          // 버튼 위치에 따른 border-radius 클래스
          // 맞닿는 부분은 직각, 바깥쪽만 둥글게
          let positionClasses = ""
          if (isFirst) {
            positionClasses = "rounded-tr-none rounded-br-none"
          } else if (isLast) {
            positionClasses = "rounded-tl-none rounded-bl-none border-l-0"
          } else if (isMiddle) {
            positionClasses = "rounded-none border-l-0"
          }

          return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: cn(
              (child as React.ReactElement<{ className?: string }>).props.className,
              positionClasses
            ),
          })
        })}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
