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
      <path d="M10.42 10.2599L7.04005 19.3599L19.2 7.19995H4.80005L10.42 10.2599Z" fill="currentColor"/>
    </svg>
  )
}
