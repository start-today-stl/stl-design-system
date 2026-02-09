import type { IconProps } from './types'

export function DirectionIcon({ size = 10, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M5 10L0.669873 2.5L9.33013 2.5L5 10Z" fill="currentColor"/>
    </svg>
  )
}
