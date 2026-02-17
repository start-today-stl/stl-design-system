import type { IconProps } from './types'

export function LeftIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M5.86035 0.707031L1.41406 5.15332L5.86035 9.59961L5.15332 10.3066L0 5.15332L5.15332 0L5.86035 0.707031Z"
        fill="currentColor"
        transform="translate(9.07, 6.85)"
      />
    </svg>
  )
}
