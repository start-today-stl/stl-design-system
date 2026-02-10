import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-100 dark:data-[state=unchecked]:bg-dark-300",
  {
    variants: {
      size: {
        default: "h-8 w-16 p-[3px]", // 32x64px, 3px 내부 패딩
        sm: "h-4 w-8 p-[2px]", // 16x32px, 2px 내부 패딩
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        default: "h-[26px] w-[26px] data-[state=checked]:translate-x-8", // 26px, move 32px
        sm: "h-3 w-3 data-[state=checked]:translate-x-4", // 12px, move 16px
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  /** 라벨 텍스트 */
  label?: string
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, label, ...props }, ref) => {
  const switchElement = (
    <SwitchPrimitives.Root
      className={cn(switchVariants({ size }), className)}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className={cn(thumbVariants({ size }))} />
    </SwitchPrimitives.Root>
  )

  if (label) {
    return (
      <div className="inline-flex items-center gap-2">
        {switchElement}
        <span className="text-xs text-gray-500 dark:text-gray-300">{label}</span>
      </div>
    )
  }

  return switchElement
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch, switchVariants }
