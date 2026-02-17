import type { IconProps } from './types'

export function STLArrowIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M14.4 0H0L5.62999 3.06L2.25 12.15L14.4 0Z"
        fill="currentColor"
        transform="translate(4.8, 5.93)"
      />
    </svg>
  )
}
