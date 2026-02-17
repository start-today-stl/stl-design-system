import type { IconProps } from './types'

export function BoxIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M13 0.5V12.5L12.5 13H0.5L0 12.5V0.5L0.5 0H12.5L13 0.5ZM1 12H12V1H1V12Z"
        fill="currentColor"
        transform="translate(5.50, 5.50)"
      />
    </svg>
  )
}
