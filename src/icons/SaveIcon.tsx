import type { IconProps } from './types'

export function SaveIcon({ size = 24, className, ...props }: IconProps) {
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
      <path d="M17.2998 6V19.3203L16.4854 19.708L12 16.0635L7.51562 19.708L6.7002 19.3203V6L7.2002 5.5H16.7998L17.2998 6ZM7.7002 18.2686L11.6846 15.0322H12.3154L16.2998 18.2686V6.5H7.7002V18.2686Z" fill="currentColor"/>
    </svg>
  )
}
