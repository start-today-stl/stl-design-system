import type { IconProps } from './types'

export function RowDeleteIcon({ size = 24, className, ...props }: IconProps) {
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
      <path
        d="M12.9385 0.808594C19.6376 0.808594 25.0683 6.23935 25.0684 12.9385C25.0684 19.6377 19.6377 25.0684 12.9385 25.0684C6.23935 25.0683 0.808594 19.6376 0.808594 12.9385C0.808676 6.2394 6.2394 0.808676 12.9385 0.808594Z"
        fill="#E15252"
        fillOpacity="0.2"
      />
      <path
        d="M12.9385 0.808594C19.6376 0.808594 25.0683 6.23935 25.0684 12.9385C25.0684 19.6377 19.6377 25.0684 12.9385 25.0684C6.23935 25.0683 0.808594 19.6376 0.808594 12.9385C0.808676 6.2394 6.2394 0.808676 12.9385 0.808594Z"
        stroke="#E15252"
        strokeWidth="1.61733"
      />
      <path
        d="M19.4077 13.7476H6.46924V12.1304H19.4077V13.7476Z"
        fill="#E15252"
      />
    </svg>
  )
}
