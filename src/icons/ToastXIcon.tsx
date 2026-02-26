import type { IconProps } from './types'

export function ToastXIcon({ size = 26, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="26" height="26" rx="13" fill="#E15252" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.907 8.50659L14.4138 12.9998L18.907 17.4929L17.4929 18.907L12.9998 14.4138L8.50659 18.907L7.09253 17.4929L11.5857 12.9998L7.09253 8.50659L8.50659 7.09253L12.9998 11.5857L17.4929 7.09253L18.907 8.50659Z"
        fill="#FBE0DD"
      />
    </svg>
  )
}
