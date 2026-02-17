import type { IconProps } from './types'

export function OIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M5.2998 0C8.22583 6.6023e-05 10.5995 2.37379 10.5996 5.2998C10.5994 8.22571 8.22575 10.5995 5.2998 10.5996C2.37389 10.5995 0.000231059 8.22569 0 5.2998C0.000105732 2.37381 2.37381 9.90259e-05 5.2998 0ZM5.2998 1C2.9261 1.0001 1.00011 2.9261 1 5.2998C1.00023 7.67341 2.92618 9.59951 5.2998 9.59961C7.67346 9.59954 9.59938 7.67343 9.59961 5.2998C9.5995 2.92608 7.67354 1.00007 5.2998 1Z"
        fill="currentColor"
        transform="translate(6.70, 6.70)"
      />
    </svg>
  )
}
