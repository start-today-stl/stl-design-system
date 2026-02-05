import type { IconProps } from './types'

export function UpIcon({ size = 24, className, ...props }: IconProps) {
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
        <path fillRule="evenodd" clipRule="evenodd" d="M17.1504 14.0498L16.4502 14.75L12 10.3105L7.55957 14.75L6.84961 14.0498L12 8.88965L17.1504 14.0498Z" fill="currentColor"/>
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
      <path d="M16.3535 12.4463L22.7529 18.8467L22.0459 19.5537L15.999 13.5078L9.95312 19.5537L9.24609 18.8467L16 12.0928L16.3535 12.4463Z" fill="currentColor"/>
    </svg>
  )
}
