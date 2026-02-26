import type { IconProps } from './types'

export function MinusIcon({ size = 24, className, ...props }: IconProps) {
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
      <path
        d="M18 12.5H6V11.5H18V12.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
