import type { IconProps } from './types'

export function DownIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M10.3066 0.707031L5.15332 5.86035L0 0.707031L0.707031 0L5.15332 4.44629L9.59961 0L10.3066 0.707031Z"
        fill="currentColor"
        transform="translate(6.85, 9.07)"
      />
    </svg>
  )
}
