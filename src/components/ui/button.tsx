import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** 버튼용 스피너 (흰색) */
function ButtonSpinner({ size }: { size: "default" | "sm" }) {
  const gradientId = React.useId()
  const isSmall = size === "sm"

  return (
    <svg
      className={cn("animate-spin", isSmall ? "size-3" : "size-6")}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-0.5 whitespace-nowrap font-normal transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Ghost (Slate) - 중립 버튼 (Figma: ButtonGhost)
        ghost:
          "bg-slate-50 border-[0.75px] border-slate-200 text-slate-600 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-600 dark:active:bg-slate-500",
        // Ghost Outline (Slate) - 중립 버튼 아웃라인
        "ghost-outline":
          "border-[0.75px] border-slate-500 text-slate-500 bg-transparent hover:bg-slate-500/50 hover:text-white active:bg-slate-500 active:text-white dark:border-slate-200 dark:text-slate-200 dark:hover:bg-slate-200/50 dark:active:bg-slate-200",
        // Primary (Blue) - 주요 액션 버튼 (Figma: ButtonPrimary)
        primary:
          "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
        // Primary Outline (Blue) - 주요 액션 버튼 아웃라인
        "primary-outline":
          "border-[0.75px] border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500/50 hover:text-white active:bg-blue-500 active:text-white",
        // Danger (Red) - 삭제/경고 버튼 (Figma: ButtonDanger)
        danger:
          "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
        // Danger Outline (Red) - 삭제/경고 버튼 아웃라인
        "danger-outline":
          "border-[0.75px] border-red-500 text-red-500 bg-transparent hover:bg-red-500/50 hover:text-white active:bg-red-500 active:text-white",
        // Success (Green) - 완료/긍정 버튼 (Figma: ButtonPositive)
        success:
          "bg-green-500 text-white hover:bg-green-600 active:bg-green-700",
        // Success Outline (Green) - 완료/긍정 버튼 아웃라인
        "success-outline":
          "border-[0.75px] border-green-500 text-green-500 bg-transparent hover:bg-green-500/50 hover:text-white active:bg-green-500 active:text-white",
        // Text - 텍스트만 있는 버튼 (배경/테두리 없음)
        text: "bg-transparent text-slate-600 hover:text-blue-500 active:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 dark:active:text-blue-500",
      },
      size: {
        // 텍스트 또는 아이콘+텍스트 버튼
        default: "h-9 px-2.5 py-2 rounded text-xs tracking-[-0.12px]",
        sm: "h-6 px-2.5 py-2 rounded text-[10px] tracking-[-0.1px]",
        // 아이콘만 있는 버튼 (정사각형)
        icon: "h-9 w-9 p-2 rounded [&_svg]:ml-0",
        "icon-sm": "h-8 w-8 p-1.5 rounded [&_svg]:ml-0",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** 로딩 상태 (스피너 표시) */
  loading?: boolean
}

/** 아이콘 위치 감지 */
function detectIconPosition(children: React.ReactNode) {
  const childArray = React.Children.toArray(children)
  if (childArray.length === 0) return { hasIconLeft: false, hasIconRight: false, isIconOnly: false }

  const first = childArray[0]
  const last = childArray[childArray.length - 1]

  const isSvgElement = (child: React.ReactNode): boolean => {
    if (!React.isValidElement(child)) return false
    // SVG 요소이거나, 컴포넌트가 svg를 반환하는 경우 (type이 'svg'이거나 displayName에 'Icon' 포함)
    return (
      child.type === "svg" ||
      (typeof child.type === "function" && (child.type as React.FC).displayName?.includes("Icon")) ||
      (typeof child.type === "function" && child.type.name?.includes("Icon"))
    )
  }

  // 아이콘만 있는 경우 (children이 1개이고 그게 아이콘인 경우)
  const isIconOnly = childArray.length === 1 && isSvgElement(first)

  return {
    hasIconLeft: isSvgElement(first) && childArray.length > 1,
    hasIconRight: isSvgElement(last) && childArray.length > 1,
    isIconOnly,
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const spinnerSize = size === "sm" ? "sm" : "default"

    // 아이콘 위치 감지
    const { hasIconLeft, hasIconRight, isIconOnly } = detectIconPosition(children)

    // 아이콘 위치에 따른 패딩 클래스 (Figma 기준: 아이콘쪽 7px, 텍스트쪽 12px, 아이콘만 6px)
    const getPaddingClass = () => {
      if (size === "icon" || size === "icon-sm") return "" // 명시적 아이콘 버튼은 별도 패딩
      if (isIconOnly) return "!px-1.5" // 아이콘만 있는 경우 양쪽 6px
      if (hasIconLeft && hasIconRight) return "!pl-[7px] !pr-[7px]" // 양쪽 아이콘
      if (hasIconLeft) return "!pl-[7px] !pr-3" // 왼쪽 아이콘 (pr-3 = 12px)
      if (hasIconRight) return "!pl-3 !pr-[7px]" // 오른쪽 아이콘
      return "" // 텍스트만 (기본 px-2.5 = 10px)
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), getPaddingClass(), loading && "relative")}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <ButtonSpinner size={spinnerSize} />
          </span>
        )}
        <span className={cn("inline-flex items-center gap-0.5", loading && "invisible")}>{children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
