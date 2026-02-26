import type { IconProps } from './types'

export function PlusIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M12.5 11.5H18V12.5H12.5V18H11.5V12.5H6V11.5H11.5V6H12.5V11.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
