import type { IconProps } from './types'

export function NaviStockIcon({ size = 24, className, ...props }: IconProps) {
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
        d="M13.6699 0L14.1699 0.5V7.2002H17.2402L17.7402 7.7002V14.9004L17.2402 15.4004H0.5L0 14.9004V7.7002L0.5 7.2002H3.57031V0.5L4.07031 0H13.6699ZM3.00977 9.60059V10.6006H6.36035V9.60059H3.00977ZM11.3799 9.60059V10.6006H14.7305V9.60059H11.3799ZM6.46973 2.40039V3.40039H11.2705V2.40039H6.46973Z"
        fill="currentColor"
        transform="translate(3.13, 4.30)"
      />
    </svg>
  )
}
