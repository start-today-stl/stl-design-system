import type { IconProps } from './types'

export function DownIcon({ size = 24, className, ...props }: IconProps) {
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
        <path d="M17.1504 9.9502L12 15.1104L6.83984 9.9502L7.5498 9.25L12 13.6904L16.4404 9.25L17.1504 9.9502Z" fill="currentColor"/>
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
      <path d="M22.7539 13.1533L16 19.9072L15.6465 19.5537L9.24707 13.1533L9.9541 12.4463L16.001 18.4922L22.0469 12.4463L22.7539 13.1533Z" fill="currentColor"/>
    </svg>
  )
}
