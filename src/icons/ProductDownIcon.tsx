import type { IconProps } from './types'

export function ProductDownIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M1 12H12V4.09961H13V12.5L12.5 13H0.5L0 12.5V4.09961H1V12ZM7 8.89355L7.84668 8.04688L8.55371 8.75391L6.85352 10.4541H6.14648L4.44629 8.75391L5.15332 8.04688L6 8.89355V2.90039H7V8.89355ZM13 0.5V2.90039H12V1H1V2.90039H0V0.5L0.5 0H12.5L13 0.5Z"
        fill="currentColor"
        transform="translate(5.50, 5.50)"
      />
    </svg>
  )
}
