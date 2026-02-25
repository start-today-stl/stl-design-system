import * as React from "react"
import { cn } from "@/lib/utils"

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** 필수 입력 표시 */
  required?: boolean
  /** 라벨 숨김 (공간은 유지) */
  invisible?: boolean
  children: React.ReactNode
}

/**
 * 커스텀 레이아웃에서 사용하는 폼 라벨 컴포넌트
 * InputField, Select 등의 내부 라벨과 동일한 스타일
 */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, invisible, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50",
          invisible && "invisible",
          className
        )}
        {...props}
      >
        {required && (
          <span className="size-2 rounded-full bg-stone-400" aria-hidden="true" />
        )}
        {children}
      </label>
    )
  }
)

FormLabel.displayName = "FormLabel"
