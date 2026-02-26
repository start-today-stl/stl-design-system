import type { IconProps } from './types'

export function ToastOIcon({ size = 26, className, ...props }: IconProps) {
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
      <rect width="26" height="26" rx="13" fill="#1776FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9988 6.80054C16.4223 6.80064 19.198 9.5762 19.198 12.9998C19.1976 16.423 16.4221 19.1989 12.9988 19.199C9.57543 19.1989 6.79991 16.423 6.79956 12.9998C6.79956 9.57617 9.57521 6.8006 12.9988 6.80054ZM12.9988 8.80054C10.6798 8.8006 8.79956 10.6807 8.79956 12.9998C8.79991 15.3185 10.68 17.1989 12.9988 17.199C15.3175 17.1989 17.1976 15.3184 17.198 12.9998C17.198 10.6808 15.3177 8.80064 12.9988 8.80054Z"
        fill="#C4E2FA"
      />
    </svg>
  )
}
