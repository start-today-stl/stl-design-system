import type { IconProps } from './types'

export function MenuVerticalIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M1 12H0V0H1V12ZM5.7998 12H4.7998V0H5.7998V12ZM10.5996 12H9.59961V0H10.5996V12Z"
        fill="currentColor"
        transform="translate(6.70, 6.00)"
      />
    </svg>
  )
}
