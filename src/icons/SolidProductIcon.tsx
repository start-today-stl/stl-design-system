import type { IconProps } from './types'

export function SolidProductIcon({ size = 24, className, ...props }: IconProps) {
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
      <path d="M18 18.5L18.5 18V6L18 5.5H6L5.5 6V18L6 18.5H18ZM14.4 9.1V10.1H9.6V9.1H14.4Z" fill="currentColor"/>
    </svg>
  )
}
