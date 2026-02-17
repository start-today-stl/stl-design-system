import type { IconProps } from './types'

export function NaviHomeIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M7.98047 0L15.1807 4.7998L15.4004 5.21973V14.8203L14.9004 15.3203H10.1006L9.60059 14.8203V6.91992H5.7998V14.8203L5.2998 15.3203H0.5L0 14.8203V5.21973L0.219727 4.7998L7.41992 0H7.98047Z"
        fill="currentColor"
        transform="translate(4.30, 4.34)"
      />
    </svg>
  )
}
