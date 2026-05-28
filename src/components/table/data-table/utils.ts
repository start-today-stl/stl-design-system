/**
 * 데이터 테이블 순수 헬퍼 함수
 * - 컴포넌트나 hook에서 사용하는 stateless 유틸리티 모음
 */

/** 컬럼 정렬을 Tailwind 클래스로 변환 */
export function getAlignClass(align?: "left" | "center" | "right"): string {
  switch (align) {
    case "center":
      return "text-center"
    case "right":
      return "text-right"
    default:
      return "text-left"
  }
}

/** number | string → px 단위 문자열 */
export function toPxString(value: string | number): string {
  return typeof value === "number" ? `${value}px` : value
}

/** 컬럼 너비를 number로 변환 (width 우선, 없으면 minWidth) */
export function getNumericColumnWidth(col: {
  width?: string | number
  minWidth?: string | number
}): number {
  const w = col.width ?? col.minWidth
  if (typeof w === "number") return w
  const parsed = parseInt(String(w ?? ""), 10)
  return Number.isFinite(parsed) ? parsed : 150
}
