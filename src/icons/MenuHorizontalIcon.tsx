import type { IconProps } from './types'

export function MenuHorizontalIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M12 10.5996H0V9.59961H12V10.5996ZM12 5.7998H0V4.7998H12V5.7998ZM12 1H0V0H12V1Z"
        fill="currentColor"
        transform="translate(6.00, 6.70)"
      />
    </svg>
  )
}
