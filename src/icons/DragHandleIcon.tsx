import type { IconProps } from './types'

export function DragHandleIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* 2열 3행 점 패턴 (⋮⋮) */}
      <circle cx="9" cy="6" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="6" r="1.5" fill="currentColor"/>
      <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="9" cy="18" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="18" r="1.5" fill="currentColor"/>
    </svg>
  )
}
