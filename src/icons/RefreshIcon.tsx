import type { IconProps } from './types'

export function RefreshIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M13.894 6.959A7 7 0 1 1 9.394 1.597L9.052 2.537A6 6 0 1 0 12.909 7.133ZM9.976 0L12.324 3.196L8.471 4.134Z"
        fill="currentColor"
        transform="translate(5.05, 4.41)"
      />
    </svg>
  )
}
