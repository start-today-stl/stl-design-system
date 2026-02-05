import type { IconProps } from './types'

export function IsolationModeIcon({ size = 24, className, ...props }: IconProps) {
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
      <path d="M7.22211 6.02765V17.9723" stroke="currentColor" strokeLinejoin="bevel"/>
      <path d="M12 6.02765V17.9723" stroke="currentColor" strokeLinejoin="bevel"/>
      <path d="M16.7779 6.02765V17.9723" stroke="currentColor" strokeLinejoin="bevel"/>
    </svg>
  )
}
