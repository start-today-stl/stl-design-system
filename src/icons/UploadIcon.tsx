import type { IconProps } from './types'

export function UploadIcon({ size = 24, className, ...props }: IconProps) {
  // 24 이하: 24x24 아이콘 사용, 24 초과: 32x32 아이콘 사용
  const useSmall = size <= 24

  if (useSmall) {
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
        <path fillRule="evenodd" clipRule="evenodd" d="M6.4502 14.4004V17.5596H17.5498V14.4004H18.4502V18L18 18.4502H6L5.5498 18V14.4004H6.4502ZM12.3604 5.64941L15.96 9.25L15.25 9.95996L12.5 7.20996V15.5996H11.5V7.20996L8.75977 9.95996L8.0498 9.25L11.6504 5.64941H12.3604Z" fill="currentColor"/>
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M8.50098 23.502H23.499V12.8008H24.499V24.002L23.999 24.502H8.00098L7.50098 24.002V12.8008H8.50098V23.502ZM18.6162 13.1084L18.2627 13.4629L17.9102 13.8164L16.498 12.4053V20.8008H15.498V12.4082L14.0908 13.8164L13.3838 13.1094L15.6455 10.8477H16.3516L18.6162 13.1084ZM24.499 8.00098V11.2021H23.499V8.50098H8.50098V11.2021H7.50098V8.00098L8.00098 7.50098H23.999L24.499 8.00098Z" fill="currentColor"/>
    </svg>
  )
}
