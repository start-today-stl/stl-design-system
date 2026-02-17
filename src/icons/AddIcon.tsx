import type { IconProps } from './types'

export function AddIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M13 0.5V12.5L12.5 13H0.5L0 12.5V0.5L0.5 0H12.5L13 0.5ZM1 12H12V1H1V12ZM7.00977 6H10.1104V7H7.00977V10.1006H6.00977V7H2.91016V6H6.00977V2.90039H7.00977V6Z"
        fill="currentColor"
        transform="translate(5.50, 5.50)"
      />
    </svg>
  )
}
