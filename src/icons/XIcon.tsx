import type { IconProps } from './types'

export function XIcon({ size = 24, className, ...props }: IconProps) {
  // 24 이하: 작은 아이콘 사용, 24 초과: 큰 아이콘 사용
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
        <path fillRule="evenodd" clipRule="evenodd" d="M17.1504 7.5498L12.71 12L17.1504 16.4404L16.4502 17.1504L12 12.71L7.5498 17.1504L6.84961 16.4404L11.29 12L6.84961 7.5498L7.5498 6.84961L12 11.29L16.4502 6.84961L17.1504 7.5498Z" fill="currentColor"/>
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="8.5 8.5 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M22.7529 9.95312L16.7061 15.999L22.7529 22.0459L22.0459 22.7529L15.999 16.7061L9.95312 22.7529L9.24609 22.0459L15.292 15.999L9.24609 9.95312L9.95312 9.24609L15.999 15.292L22.0459 9.24609L22.7529 9.95312Z" fill="currentColor"/>
    </svg>
  )
}
