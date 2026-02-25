import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardActionVariants = cva(
  "h-[18px] px-[5px] rounded-[2px] border text-[10px] tracking-[-0.1px] transition-colors cursor-pointer inline-flex items-center justify-center border-slate-200 text-slate-700 dark:border-slate-600 dark:text-slate-100",
  {
    variants: {
      selected: {
        true: "bg-slate-100 dark:bg-slate-600",
        false: "hover:bg-slate-50 dark:hover:bg-slate-700",
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
