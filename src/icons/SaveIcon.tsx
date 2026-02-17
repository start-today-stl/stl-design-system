import type { IconProps } from './types'

export function SaveIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M10.5996 0.5V13.8203L9.78516 14.208L5.2998 10.5635L0.81543 14.208L0 13.8203V0.5L0.5 0H10.0996L10.5996 0.5ZM1 12.7686L4.98438 9.53223H5.61523L9.59961 12.7686V1H1V12.7686Z"
        fill="currentColor"
        transform="translate(6.70, 4.90)"
      />
    </svg>
  )
}
