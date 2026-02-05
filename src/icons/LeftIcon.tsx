import type { IconProps } from './types'

export function LeftIcon({ size = 24, className, ...props }: IconProps) {
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
        <path fillRule="evenodd" clipRule="evenodd" d="M14.75 7.5498L10.2998 12L14.75 16.4502L14.04 17.1504L8.88965 12L14.04 6.84961L14.75 7.5498Z" fill="currentColor"/>
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
      <path d="M19.5537 9.9541L13.5078 16.001L19.5537 22.0469L18.8467 22.7539L12.0928 16L12.4463 15.6465L18.8467 9.24707L19.5537 9.9541Z" fill="currentColor"/>
    </svg>
  )
}
