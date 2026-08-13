import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardActionVariants = cva(
  "h-[18px] px-[5px] rounded-[2px] border text-[10px] tracking-[-0.1px] whitespace-nowrap transition-colors cursor-pointer inline-flex items-center justify-center border-slate-200 text-slate-700 dark:border-slate-600 dark:text-slate-100",
  {
    variants: {
      // 카드 자체도 호버 색이 바뀌므로(StatCard: hover slate-100 / dark slate-700)
      // 액션은 그보다 한 단계 진하게 잡아야 배경에 묻히지 않는다.
      selected: {
        true: "bg-slate-200 dark:bg-slate-500",
        false: "hover:bg-slate-100 dark:hover:bg-slate-600",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

export interface CardActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cardActionVariants> {}

const CardAction = React.forwardRef<HTMLButtonElement, CardActionProps>(
  ({ className, selected, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(cardActionVariants({ selected }), className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
CardAction.displayName = "CardAction"

export { CardAction, cardActionVariants }
