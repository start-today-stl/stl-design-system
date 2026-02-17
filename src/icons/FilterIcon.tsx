import type { IconProps } from './types'

export function FilterIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M10.11 16.1V7.7L14.91 5.3V0.5H0.5V5.3L5.3 7.7V13.7"
        stroke="currentColor"
        strokeLinejoin="bevel"
        transform="translate(4.30, 3.95)"
      />
    </svg>
  )
}
