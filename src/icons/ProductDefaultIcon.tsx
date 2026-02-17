import type { IconProps } from './types'

export function ProductDefaultIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M1 12.0098H12V4.10938H13V12.5098L12.5 13.0098H0.5L0 12.5098V4.10938H1V12.0098ZM8.89941 4.60938H4.09961V3.60938H8.89941V4.60938ZM13 0.5V2.90039H12V1H1V2.90039H0V0.5L0.5 0H12.5L13 0.5Z"
        fill="currentColor"
        transform="translate(5.50, 5.50)"
      />
    </svg>
  )
}
