import type { IconProps } from './types'

export function ProductUpIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M1 12H12V4.09961H13V12.5L12.5 13H0.5L0 12.5V4.09961H1V12ZM8.55371 4.23633L7.84668 4.94336L7 4.09668V10.1006H6V4.09668L5.15332 4.94336L4.44629 4.23633L6.14648 2.53613H6.85352L8.55371 4.23633ZM13 0.5V2.90039H12V1H1V2.90039H0V0.5L0.5 0H12.5L13 0.5Z"
        fill="currentColor"
        transform="translate(5.50, 5.50)"
      />
    </svg>
  )
}
