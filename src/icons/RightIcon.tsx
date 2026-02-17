import type { IconProps } from './types'

export function RightIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M5.86035 5.15332L0.707031 10.3066L0 9.59961L4.44629 5.15332L0 0.707031L0.707031 0L5.86035 5.15332Z"
        fill="currentColor"
        transform="translate(9.07, 6.85)"
      />
    </svg>
  )
}
