import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        sm: "size-[18px]",
        default: "size-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, ...props }, ref) => {
    const isSmall = size === "sm"
    const gradientId = React.useId()

    return (
      <svg
        ref={ref}
        className={cn(spinnerVariants({ size, className }))}
        viewBox={isSmall ? "0 0 18 18" : "0 0 32 32"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {isSmall ? (
              <>
                {/* Small: slate-400 → slate-100 */}
                <stop offset="0%" stopColor="#a9b5c6" />
                <stop offset="100%" stopColor="#eaedf1" />
              </>
            ) : (
              <>
                {/* Large: blue-500 → blue-50 */}
                <stop offset="0%" stopColor="#1776ff" />
                <stop offset="100%" stopColor="#e8f1ff" />
              </>
            )}
          </linearGradient>
        </defs>
        {isSmall ? (
          <circle
            cx="9"
            cy="9"
            r="7"
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
        ) : (
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
      </svg>
    )
  }
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }
