import type { IconProps } from './types'

export function HomeIcon({ size = 24, className, ...props }: IconProps) {
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
        <path d="M12.2803 4.37988L19.4805 9.18945L19.71 9.59961V19.2002L19.21 19.7002H15.5996V18.7002H18.71V9.87012L12 5.39941L5.2998 9.87012V18.7002H8.40039V19.7002H4.7998L4.2998 19.2002V9.59961L4.53027 9.18945L11.7305 4.37988H12.2803ZM14.4004 10.2998L14.9004 10.7998V18H13.9004V11.2998H10.1104V18H9.11035V10.7998L9.61035 10.2998H14.4004Z" fill="currentColor"/>
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
      <path d="M25.8779 12.3838L26.1006 12.7998V25.6006L25.6006 26.1006H20.7979V25.1006H25.1006V13.0674L15.998 6.99902L6.89844 13.0664V25.1006H11.1982V26.1006H6.39844L5.89844 25.6006V12.7998L6.12109 12.3838L15.7207 5.98242H16.2754L25.8779 12.3838ZM19.6992 14.3994V23.999H18.6992V14.8994H13.3008V23.999H12.3008V14.3994L12.8008 13.8994H19.1992L19.6992 14.3994Z" fill="currentColor"/>
    </svg>
  )
}
