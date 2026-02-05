import type { IconProps } from './types'

export function RightIcon({ size = 24, className, ...props }: IconProps) {
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
        <path fillRule="evenodd" clipRule="evenodd" d="M15.0996 12L9.9502 17.1504L9.24023 16.4502L13.6904 12L9.24023 7.5498L9.9502 6.84961L15.0996 12Z" fill="currentColor"/>
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
      <path d="M19.9072 16L19.5537 16.3535L13.1533 22.7529L12.4463 22.0459L18.4922 15.999L12.4463 9.95312L13.1533 9.24609L19.9072 16Z" fill="currentColor"/>
    </svg>
  )
}
