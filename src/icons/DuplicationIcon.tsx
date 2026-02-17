import type { IconProps } from './types'

export function DuplicationIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M11.7998 14.9004L11.2998 15.4004H2.89941V14.4004H10.7998V2.90039H11.7998V14.9004ZM9.40039 0.5V12.5L8.90039 13H0.5L0 12.5V0.5L0.5 0H8.90039L9.40039 0.5ZM1 12H8.40039V1H1V12Z"
        fill="currentColor"
        transform="translate(6.10, 4.30)"
      />
    </svg>
  )
}
