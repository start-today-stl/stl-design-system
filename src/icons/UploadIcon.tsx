import type { IconProps } from './types'

export function UploadIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M1 11.8535H12V8.75391H13V12.3535L12.5 12.8535H0.5L0 12.3535V8.75391H1V11.8535ZM10.4541 3.59961L9.74707 4.30664L7 1.55957V9.95312H6V1.55957L3.25391 4.30664L2.54688 3.59961L6.14648 0H6.85352L10.4541 3.59961Z"
        fill="currentColor"
        transform="translate(5.50, 5.57)"
      />
    </svg>
  )
}
