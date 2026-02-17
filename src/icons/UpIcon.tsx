import type { IconProps } from './types'

export function UpIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M10.3066 5.15332L9.59961 5.86035L5.15332 1.41406L0.707031 5.86035L0 5.15332L5.15332 0L10.3066 5.15332Z"
        fill="currentColor"
        transform="translate(6.85, 9.07)"
      />
    </svg>
  )
}
